import { Migration } from '@mikro-orm/migrations';

export class Migration20250625091046 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "request_log" drop column "request_body", drop column "response_body", drop column "status_code";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "request_log" add column "request_body" varchar(255) not null, add column "response_body" varchar(255) not null, add column "status_code" int not null;`);
  }

}
