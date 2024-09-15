import express from 'express';
import prisma from '../prisma';

const router = express.Router();


// GETリクエスト
router.get('/', async(req: express.Request, res: express.Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// POSTリクエスト
router.post('/', (req: express.Request, res: express.Response) => {
  try {
    res.status(200).json({ message: "登録しました" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;