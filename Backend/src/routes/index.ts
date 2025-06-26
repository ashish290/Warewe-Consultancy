import { Request, Response, Router } from "express";
import { BrowserRequest, GetLogs } from "../controller";

const router = Router();

router.post('/log', BrowserRequest);
router.get('/get-log', GetLogs); 


export { router as mainRouter };