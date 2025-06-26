import { MikroORM } from '@mikro-orm/core';
import mikroConfig from './utils/mikro-orm.config';

let orm: MikroORM;

export const initORM = async () => {
  orm = await MikroORM.init(mikroConfig);
  return orm;
};

export const getORM = () => orm;
