import TodoItemModel from '../models/TodoItemModel';
import TodoListModel from '../models/TodoListModel';
import { AuthRequest } from '../interfaces/AuthRequest';

export class TodoListController {
  /* get all todolists from user paginated
  // endpoint /todolist/user/:user_id?page=1&limit=10
 */
  async getTodoLists(req: AuthRequest) {
    if (!req.params.todolist_id) {
      throw new Error("Todolist_id is required");
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const todoLists = await TodoListModel.find({ _id: req.params.todolist_id })
      .skip((page - 1) * limit)
      .limit(limit);

    if (!todoLists) {
      throw new Error("No TodoLists found");
    }

    return {
      todoLists,
      totalTodoLists: todoLists.length,
    };
  }

  // get todo by id
  async getTodoById(req: AuthRequest) {
    if (!req.params._id) {
      throw new Error("todo _id is required");
    }
    const todo = await TodoItemModel.findById(req.params._id);
    if (!todo) {
      throw new Error("todo not found");
    }
    return {
      todo,
    };
  }

  // create todo
  async create(req: AuthRequest) {
    if (!req.body.user_id) {
      throw new Error("user id is required");
    }
    if (!req.body.title) {
      throw new Error("title is required");
    }

    const todoList = new TodoListModel({
      user_id: req.body.user_id,
      title: req.body.title,
    });

    // removes the version key from the response, written in the TodoListModel
    await todoList.save();

    return {
      todoList,
      message: "todo created successfully",
    };
  }

  // update todo
  async updateTodoListsFromUser(req: AuthRequest) {
    if (!req.params.user_id) {
      throw new Error("user_id is required");
    }
    if (!req.body.title) {
      throw new Error("title is required");
    }
    const todoList = await TodoListModel.findOneAndUpdate(
      { user_id: req.params.user_id },
      { title: req.body.title },
      { new: true }
    );
    return {
      todoList,
      message: "todo updated successfully",
    };
  }

  // delete todo
  async deleteTodo(req: AuthRequest) {
    if (!req.params._id) {
      throw new Error("todo _id is required");
    }
    await TodoItemModel.findByIdAndDelete(req.params._id);
    return {
      message: "todo deleted successfully",
    };
  }
}
