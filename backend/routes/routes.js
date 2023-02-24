import express from "express";
import {
  getUsers,
  getUserById,
  getUserByName,
  saveUser,
  updateUser,
  deleteUser,
  login
} from "../controllers/UserController.js";

import {
  saveLog
} from "../controllers/LogController.js";

const router = express.Router();
 
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/users/login/:name&:pass', login);
router.get('/users/name/:name', getUserByName);
router.post('/users', saveUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post('/log', saveLog);
 
export default router;