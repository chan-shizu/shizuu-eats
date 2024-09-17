import express, { response } from "express";
import prisma from "../prisma";

const router = express.Router();

// GETリクエスト
router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const body = req.body;

    const newOrder = await prisma.order.create({ data: body });

    console.log(newOrder);
    res.status(200).json({ id: newOrder.id });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
