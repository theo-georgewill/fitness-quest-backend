import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.ts';
import { createUser, getUsers } from '../controllers/userController.ts';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);

router.get('/profile', authMiddleware, async(req, res) => {
  res.json({ message: 'This is protected', user: req.user });
})

export default router;
