import { Request, Response } from "express";
import { GetValidation } from "../types/type";
import { getORM } from "../db";
import { RequestLog } from "../utils/requestlog";

export const BrowserRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const orm = getORM();
  const em = orm.em.fork();
  const { method, url } = req.body as GetValidation ;
  try {
    const newLog = em.create(RequestLog, {
      method,
      url,
      createdAt: new Date(),
    });
    await em.persistAndFlush(newLog);
    console.log("new Log :",newLog);
    res.status(201).json(newLog);
    return;
  } catch (error) {
    console.log("BrowserRequest error :", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const GetLogs = async(req : Request, res : Response) => {
  try {
    const orm = getORM();
    const em = orm.em.fork();
    const logs = await em.find(RequestLog, {});
    res.status(200).json(logs);
    return;
  } catch (error) {
    console.log("GetLogs Error :", error);
    res.status(500).json({msg : "Internal server error"});
  }
}