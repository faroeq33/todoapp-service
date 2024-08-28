import { Response } from 'express-serve-static-core';
import TodoItemModel from '../models/TodoItemModel';
import TodoListModel from '../models/TodoListModel';
import { AuthRequest } from '../interfaces/AuthRequest';
import { JwtPayload } from 'jsonwebtoken';

export class TodoListController {
  /* get all todolists from user paginated
  // endpoint /todolist/user/:user_id?page=1&limit=10
 */
  async getTodoLists(req: AuthRequest, res: Response) {
    try {
      if (!req.params.todolist_id) {
        return res.status(400).json({
          message: "Todolist_id is required",
        });
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const todoLists = await TodoListModel.find({ _id: req.params.todolist_id })
        .skip((page - 1) * limit)
        .limit(limit);

      if (!todoLists) {
        return res.status(404).json({
          message: "No TodoLists found",
        });
      }

      return res.status(200).json({
        todoLists,
        totalTodoLists: todoLists.length,
      });
    } catch (err: unknown) {
      const error = err as Error;
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // get todo by id
  async getTodoById(req: AuthRequest, res: Response) {
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
  async getTodoBySlug(req: AuthRequest, res: Response) {
    // try {
    //   if (!req.params.slug) {
    //     return res.status(400).json({
    //       message: "todo slug is required",
    //     });
    //   }
    //   const todo = await TodoItemModel.find({ slug: req.params.slug });
    //   if (!todo) {
    //     return res.status(404).json({
    //       message: "todo not found",
    //     });
    //   }
    //   return res.status(200).json({
    //     todo,
    //   });
    // } catch (err: unknown) {
    //   const error = err as Error;
    //   return res.status(500).json({
    //     error: error.message,
    //   });
    // }
  }

  // create todo
  async create(req: AuthRequest, res: Response) {
    try {
      if (!req.body.user_id) {
        return res.status(400).json({
          message: "user_id is required",
        });
      }
      if (!req.body.title) {
        return res.status(400).json({
          message: "title is required",
        });
      }

      const todoList = new TodoListModel({
        user_id: req.body.user_id,
        title: req.body.title,
      });

      // removes the version key from the response, written in the TodoListModel
      (await todoList.save()).toJSON();

      return res.status(201).json({
        todoList,
        message: "todo created successfully",
      });
    }
    catch (err: unknown) {
      const error = err as Error;
      return res.status(500).json({
        error: error.message,
      });
    }
  }

  // update todo
  async updateTodoListsFromUser(req: AuthRequest, res: Response) {
    try {
      if (!req.params.user_id) {
        return res.status(400).json({
          message: "user_id is required",
        });
      }
      if (!req.body.title) {
        return res.status(400).json({
          message: "title is required",
        });
      }
      const todoList = await TodoListModel.findOneAndUpdate(
        { user_id: req.params.user_id },
        { title: req.body.title },
        { new: true }
      );
      return res.status(200).json({
        todoList,
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
  async deleteTodo(req: AuthRequest, res: Response) {
    //   try {
    //     if (!req.params._id) {
    //       return res.status(400).json({
    //         message: "todo _id is required",
    //       });
    //     }
    //     await TodoItemModel.findByIdAndDelete(req.params._id);
    //     return res.status(200).json({
    //       message: "todo deleted successfully",
    //     });
    //   } catch (err: unknown) {
    //     const error = err as Error;
    //     return res.status(500).json({
    //       error: error.message,
    //     });
    //   }
    // }
  }
}
