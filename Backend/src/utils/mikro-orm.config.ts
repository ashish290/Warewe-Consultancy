import { defineConfig } from "@mikro-orm/postgresql";
import { RequestLog } from "./requestlog";
import dotenv from "dotenv";

dotenv.config();

const mikroConfig = defineConfig({
  entities: [RequestLog],
  clientUrl: process.env.Database!,
  debug: true,
  driverOptions: {
    connection: {
      ssl: true,
    },
  },
});

export default mikroConfig;
