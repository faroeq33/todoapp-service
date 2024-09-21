import TodoItemModel from "../models/TodoItemModel";
import TodoListModel from "../models/TodoListModel";

export class TodoItemController {
  // get all todos
  async getAllTodos() {
    const todos = await TodoItemModel.find();
    if (!todos) {
      throw new Error("No Todos found");
    }
    return {
      todos,
      totaltodos: todos.length,
    };
  }

  // get todo by id
  async getTodoById(id: string) {
    if (!id) {
      throw new Error("todo _id is required");
    }
    const todo = await TodoItemModel.findById(id);
    if (!todo) {
      throw new Error("todo not found");
    }
    return {
      todo,
    };
  }

  // create todo
  async createTodo(data: {
    title: string;
    password: string;
    questions: any;
    totalQuestions: number;
  }) {
    const { title, password, questions, totalQuestions } = data;

    if (!title || !password || !questions || !totalQuestions) {
      throw new Error("All fields are required");
    }

    const todo = new TodoListModel(data);

    try {
      await todo.save();
    } catch (error: any) {
      throw new Error(error);
    }

    return {
      todo,
      message: "todo created successfully",
    };
  }

  // update todo
  async updateTodo(
    id: string,
    data: {
      slug: string;
      title: string;
      password: string;
      questions: any;
      totalQuestions: number;
    }
  ) {
    const { slug, title, password, questions, totalQuestions } = data;

    if (!id) {
      throw new Error("todo _id is required");
    }

    if (!title || !password || !questions || !totalQuestions) {
      throw new Error("All fields are required");
    }

    const todo = await TodoItemModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return {
      todo,
      message: "todo updated successfully",
    };
  }

  // delete todo
  async deleteTodo(id: string) {
    if (!id) {
      throw new Error("todo _id is required");
    }
    await TodoItemModel.findByIdAndDelete(id);
    return {
      message: "todo deleted successfully",
    };
  }
}
