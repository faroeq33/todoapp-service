import express from "express";

import { verifyToken } from "../middlewares/middlewares";
import { TodoListController } from "../controllers/TodoListController";

const router = express.Router();

const todoListController = new TodoListController();

// router.get("/todo", verifyToken, todoItemController.getAllTodos);
// router.get("/todo/:_id", verifyToken, todoController.getTodoById);
// router.get("/todo/password/:password", todoController.gettodoByPassword);
// router.get("/todo/slug/:slug", todoController.getTodoBySlug);
router.post("/todolist", verifyToken, todoListController.create);
// router.post("/todo", verifyToken, todoItemController.cr);
// router.get('todolist/:_id', verifyToken, todoListController.getTodoLists);
// router.put("/todo/:_id", verifyToken, todoItemController.updateTodo);
// router.delete("/todo/:_id", verifyToken, todoItemController.deleteTodo);

export default router;
