import express from 'express';
import {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller'; // Import the user controller functions

const router = express.Router();

// Define user routes
router.get('/users', getAllUsers);
router.get('/user/:id', getOneUser);
router.post('/user/create', createUser);
router.put('/user/update/:id', updateUser);
router.delete('/user/delete/:id', deleteUser);

export default router;
