import { Request, Response } from 'express-serve-static-core';
import TodoItemModel from '../models/TodoItemModel';
import TodoListModel from '../models/TodoListModel';

export class TodoItemController {
  // get all todos
  async getAllTodos(req: Request, res: Response) {
    try {
      const todos = await TodoItemModel.find();
      if (!todos) {
        return res.status(404).json({
          message: "No Todos found",
        });
      }
      return res.status(200).json({
        todos,
        totaltodos: todos.length,
      });
    } catch (err: unknown) {
      const error = err as Error;
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // get todo by id
  async getTodoById(req: Request, res: Response) {
    try {
      if (!req.params._id) {
        return res.status(400).json({
          message: "todo _id is required",
        });
      }
      const todo = await TodoItemModel.findById(req.params._id);
      if (!todo) {
        return res.status(404).json({
          message: "todo not found",
        });
      }
      return res.status(200).json({
        todo,
      });
    } catch (err: unknown) {
      const error = err as Error;
      return res.status(500).json({
        error: error.message,
      });
    }
  }



  // get todo by slug
  async getTodoBySlug(req: Request, res: Response) {
    try {
      if (!req.params.slug) {
        return res.status(400).json({
          message: "todo slug is required",
        });
      }
      const todo = await TodoItemModel.find({ slug: req.params.slug });
      if (!todo) {
        return res.status(404).json({
          message: "todo not found",
        });
      }
      return res.status(200).json({
        todo,
      });
    } catch (err: unknown) {
      const error = err as Error;
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // create todo
  async createTodo(req: Request, res: Response) {
    try {
      if (
        !req.body.slug ||
        !req.body.title ||
        !req.body.password ||
        !req.body.questions ||
        !req.body.totalQuestions
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      // check if todo with title, slug or password exists
      const todoExists = await TodoItemModel.findOne({
        $or: [
          { title: req.body.title },
          { slug: req.body.slug },
          { password: req.body.password },
        ],
      });

      if (todoExists) {
        return res.status(400).json({
          message: "todo with title, slug or password already exists",
        });
      }

      const todo = new TodoListModel(req.body);
      await todo.save();
      return res.status(201).json({
        todo,
        message: "todo created successfully",
      });
    } catch (err: unknown) {
      const error = err as Error;
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // update todo
  async updateTodo(req: Request, res: Response) {
    try {
      if (!req.params._id) {
        return res.status(400).json({
          message: "todo _id is required",
        });
      }

      if (
        !req.body.slug ||
        !req.body.title ||
        !req.body.password ||
        !req.body.questions ||
        !req.body.totalQuestions
      ) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      // check if todo with title, slug or password exists
      // this excludes the current todo that is being updated
      const todoExists = await TodoItemModel.findOne({
        $and: [
          { _id: { $ne: req.params._id } },
          {
            $or: [
              { title: req.body.title },
              { slug: req.body.slug },
              { password: req.body.password },
            ],
          },
        ],
      });

      if (todoExists) {
        return res.status(400).json({
          message: "todo with title, slug or password already exists",
        });
      }

      const todo = await TodoItemModel.findByIdAndUpdate(req.params._id, req.body, {
        new: true,
      });
      console.log(todo);
      return res.status(200).json({
        todo,
        message: "todo updated successfully",
      });
    } catch (err: unknown) {
      const error = err as Error;
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // delete todo
  async deleteTodo(req: Request, res: Response) {
    try {
      if (!req.params._id) {
        return res.status(400).json({
          message: "todo _id is required",
        });
      }
      await TodoItemModel.findByIdAndDelete(req.params._id);
      return res.status(200).json({
        message: "todo deleted successfully",
      });
    } catch (err: unknown) {
      const error = err as Error;
      return res.status(500).json({
        error: error.message,
      });
    }
  }
}

