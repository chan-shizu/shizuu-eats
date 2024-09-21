import express, { response } from "express";
import prisma from "../prisma";

const router = express.Router();

router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const password = req.query.password;
    if (password !== process.env.ADMIN_PASSWORD) throw Error;

    const orders = await prisma.order.findMany();

    res.status(200).json(orders);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
  try {
    const orderId = req.params.id;
    if (!orderId) throw Error;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order) throw Error;

    const orderResponse = {
      id: order.id,
      orderName: order.orderName,
      orderRemark: order.orderRemark,
      orderBudget: order.orderBudget,
      customInfoConfirm: order.customInfoConfirm,
      status: order.status,
      comment: order.comment,
      estimatedArrivalTime: order.estimatedArrivalTime,
      createdAt: order.createdAt,
    };

    res.status(200).json(orderResponse);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const body = req.body;

    const newOrder = await prisma.order.create({ data: body });

    await fetch("https://notify-api.line.me/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${process.env.LINE_NOTIFY_ACCESS_TOKEN}`,
      },
      body: `message=${encodeURIComponent(JSON.stringify(newOrder, null, 2))}`,
    });

    res.status(200).json({ id: newOrder.id });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.put("/", async (req: express.Request, res: express.Response) => {
  try {
    const body = req.body;
    const newOrder = await prisma.order.update({ where: { id: body.id }, data: body });

    res.status(200).json({ id: newOrder.id });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

export default router;
