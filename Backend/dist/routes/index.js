"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const controller_1 = require("../controller");
const router = (0, express_1.Router)();
exports.mainRouter = router;
router.post('/log', controller_1.BrowserRequest);
router.get('/get-log', controller_1.GetLogs);
