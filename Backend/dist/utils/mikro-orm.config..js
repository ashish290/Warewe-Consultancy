"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresql_1 = require("@mikro-orm/postgresql");
const requestlog_1 = require("./requestlog");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mikroConfig = (0, postgresql_1.defineConfig)({
    entities: [requestlog_1.RequestLog],
    clientUrl: process.env.Database,
    debug: true,
    driverOptions: {
        connection: {
            ssl: true,
        },
    },
});
exports.default = mikroConfig;
