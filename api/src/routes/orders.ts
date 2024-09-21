import express, { response } from "express";
import prisma from "../prisma";

const router = express.Router();

router.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const body = req.body;
    const newOrder = await prisma.order.create({ data: body });

    res.status(200).json({ id: newOrder.id });
  } catch (error: any) {
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
      createdAt: order.createdAt,
    };

    res.status(200).json(orderResponse);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
