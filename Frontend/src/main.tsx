import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
const App = React.lazy(() => import("./App"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen font-semibold">
          Loading....
        </div>
      }
    >
      <App />
      <Toaster />
    </Suspense>
  </StrictMode>
);
