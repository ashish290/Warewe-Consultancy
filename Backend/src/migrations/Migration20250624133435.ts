import { Migration } from '@mikro-orm/migrations';

export class Migration20250624133435 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "request_log" ("id" serial primary key, "method" varchar(255) not null, "url" varchar(255) not null, "request_body" varchar(255) not null, "response_body" varchar(255) not null, "status_code" int not null, "created_at" timestamptz not null);`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "request_log" cascade;`);
  }

}
