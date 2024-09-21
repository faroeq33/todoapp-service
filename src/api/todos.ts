import express from "express";

import { verifyToken } from "../middlewares/middlewares";
import { TodoListController } from "../controllers/TodoListController";

const router = express.Router();

const todoListController = new TodoListController();

// router.get("/todo", verifyToken, todoItemController.getAllTodos);
router.get("/todos", verifyToken, todoListController.getTodoLists);
// router.get("/todo/password/:password", todoController.gettodoByPassword);
// router.get("/todo/slug/:slug", todoController.getTodoBySlug);
// router.post("/todo", verifyToken, todoItemController.create);
// router.get('todolist/:_id', verifyToken, todoListController.getTodoLists);
// router.put("/todo/:_id", verifyToken, todoItemController.updateTodo);
// router.delete("/todo/:_id", verifyToken, todoItemController.deleteTodo);

export default router;
