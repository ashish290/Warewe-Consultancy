"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.frontend_URI,
    credentials: true,
}));
app.use("/api", routes_1.mainRouter);
(0, db_1.initORM)()
    .then(() => {
    app.listen(PORT, () => {
        console.log("Express is running on :", PORT);
    });
})
    .catch((error) => {
    console.log("ORM initialization error:", error);
});
