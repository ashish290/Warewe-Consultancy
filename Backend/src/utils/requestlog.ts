import { Property, Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class RequestLog {
  @PrimaryKey()
  id!: number;

  @Property() 
  method!: string;

  @Property()
  url!: string;

  @Property({ onCreate: () => new Date() }) 
  createdAt!: Date;
}