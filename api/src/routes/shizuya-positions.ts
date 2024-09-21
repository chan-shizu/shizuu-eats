import express, { response } from "express";
import prisma from "../prisma";

const router = express.Router();

// GETリクエスト
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const latestShizuyaPosition = await prisma.shizuyaPosition.findMany({
      orderBy: {
        createdAt: "desc", // 'desc' によって降順（最新順）に並べる
      },
      take: 1, // 最新の1件のみ取得
    });

    const apiResponse = {
      lat: latestShizuyaPosition[0].latitude,
      lng: latestShizuyaPosition[0].longitude,
      cretedAt: latestShizuyaPosition[0].createdAt,
    };
    res.status(200).json(apiResponse);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const body = req.body;

    await prisma.shizuyaPosition.create({ data: body });

    res.status(200).json();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
