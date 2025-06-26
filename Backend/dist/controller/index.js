"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLogs = exports.BrowserRequest = void 0;
const db_1 = require("../db");
const requestlog_1 = require("../utils/requestlog");
const BrowserRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orm = (0, db_1.getORM)();
    const em = orm.em.fork();
    const { method, url } = req.body;
    try {
        const newLog = em.create(requestlog_1.RequestLog, {
            method,
            url,
            createdAt: new Date(),
        });
        yield em.persistAndFlush(newLog);
        console.log("new Log :", newLog);
        res.status(201).json(newLog);
        return;
    }
    catch (error) {
        console.log("BrowserRequest error :", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.BrowserRequest = BrowserRequest;
const GetLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orm = (0, db_1.getORM)();
        const em = orm.em.fork();
        const logs = yield em.find(requestlog_1.RequestLog, {});
        res.status(200).json(logs);
        return;
    }
    catch (error) {
        console.log("GetLogs Error :", error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.GetLogs = GetLogs;
