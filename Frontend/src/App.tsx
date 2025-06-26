import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import Editor from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import axios from "axios";
import { toast } from "sonner";

interface HistoryItem {
  method: string;
  url: string;
  time: string;
}

function App() {
  const [url, setUrl] = useState<string>("");
  const [method, setMethod] = useState<string>("GET");
  const [body, setBody] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<number>(0);

  const getLog = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:3000/api/get-log", {
      withCredentials: true,
    });
    if (res.data) {
      setHistory(
        res.data.map((log: any) => ({
          method: log.method,
          url: log.url,
          time: log.createdAt
            ? new Date(log.createdAt).toLocaleTimeString()
            : "",
        }))
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    getLog();
  }, []);

  const handleSend = async () => {
    try {
      const value = {
        method: method,
        url: url,
        requestBody: body,
      };
      const res = await axios.post("http://localhost:3000/api/log", value, {
        withCredentials: true,
      });
      setStatus(res.status);
      if (res.status === 201 && res.data) {
        toast("Request successfull...");
        await getLog();
      }

      const fetchOptions: RequestInit = {
        method,
        headers: { "Content-Type": "application/json" },
      };
      if (method !== "GET") {
        fetchOptions.body = body;
      }
      const fetchResponse = await fetch(url, fetchOptions);
      setStatus(fetchResponse.status);
      const data = await fetchResponse.json();
      setResponse(JSON.stringify(data, null, 2));

    } catch (err: any) {
      setStatus(err.response.status);
      setResponse("Request failed: " + err);
      setHistory((prev) => [
        {
          method,
          url,
          time: new Date().toLocaleTimeString(),
        },
        ...prev
      ]);
    }
  };

  return (
    <div className="h-screen bg-gray-200 flex ">
      <div className="bg-white p-6 w-full max-w-2xl flex flex-col items-center rounded-3xl ">
        <div className="flex gap-2 mb-4 w-full">
          <Select value={method} onValueChange={setMethod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <input
            className="flex-1 border rounded px-2 py-1"
            type="text"
            placeholder="Enter request URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
        {method !== "GET" && (
          <div className="mb-4 w-full rounded border shadow">
            <Editor
              height="180px"
              defaultLanguage="json"
              defaultValue={`{}`}
              value={body}
              theme="vs-dark"
              onChange={(value) => setBody(value || "")}
              options={{
                fontSize: 16,
                scrollBeyondLastLine: false,
                wordWrap: "on",
              }}
            />
          </div>
        )}
        <div className="w-full">
          <label className="font-semibold ">Response:</label>
          <div className="m-2">
            <h3>Status: {status}</h3>
          </div>
          <Editor
            className="shadow"
            height="180px"
            theme="vs-dark"
            defaultLanguage="json"
            options={{
              fontSize: 16,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              domReadOnly: true,
              readOnly: true,
            }}
            value={response}
          />
        </div>
      </div>

      <div className="bg-white p-6 w-full max-w-2xl flex flex-col items-center rounded-3xl ml-5">
        <Table>
          <TableCaption>Your request history</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              history.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{item.method}</TableCell>
                  <TableCell className="break-all">{item.url}</TableCell>
                  <TableCell>{item.time}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default App;
