import express from "express"
import type { Express, Request, Response } from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response) {
  try {
    res.status(200).json({ userId: "1", userName: "index! please!$$" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/sample', function(req: Request, res: Response) {
  try {
    res.status(200).json({ userId: "test", userName: "sample" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router