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
exports.Migration20250625091046 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20250625091046 extends migrations_1.Migration {
    up() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql(`alter table "request_log" drop column "request_body", drop column "response_body", drop column "status_code";`);
        });
    }
    down() {
        return __awaiter(this, void 0, void 0, function* () {
            this.addSql(`alter table "request_log" add column "request_body" varchar(255) not null, add column "response_body" varchar(255) not null, add column "status_code" int not null;`);
        });
    }
}
exports.Migration20250625091046 = Migration20250625091046;
