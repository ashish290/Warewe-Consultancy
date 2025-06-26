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
exports.Migration20250624133435 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250624133435 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql(`create table "request_log" ("id" serial primary key, "method" varchar(255) not null, "url" varchar(255) not null, "request_body" varchar(255) not null, "response_body" varchar(255) not null, "status_code" int not null, "created_at" timestamptz not null);`);
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql(`drop table if exists "request_log" cascade;`);
        });
    }
}
exports.Migration20250624133435 = Migration20250624133435;
