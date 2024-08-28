import express from "express";

import { TodoController } from "../controllers/TodoController";
import { verifyToken } from "../middlewares/middlewares";

const router = express.Router();

const todoController = new TodoController();

router.get("/todo", verifyToken, todoController.getAllTodos);
// router.get("/todo/:_id", verifyToken, todoController.getTodoById);
// router.get("/todo/password/:password", todoController.gettodoByPassword);
// router.get("/todo/slug/:slug", todoController.getTodoBySlug);
router.post("/todo", verifyToken, todoController.createTodo);
router.put("/todo/:_id", verifyToken, todoController.updateTodo);
router.delete("/todo/:_id", verifyToken, todoController.deleteTodo);

export default router;
