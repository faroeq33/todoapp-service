import { Schema, model } from 'mongoose';

interface TodoItem {
	id: string;
	todo_list_id: string;
	description: string;// How are descriptions named in my frontend?
	is_completed: boolean;// Would status be a better name?
	due_date: Date;// is describing due date important for now?
	created_at: Date;// is created_at important for the interface since mongoose will automatically add this?
	updated_at: Date;// is created_at important for the interface since mongoose will automatically add this?
}

const todoItemSchema = new Schema<TodoItem>({
	id: { type: String, required: true },
	todo_list_id: { type: String, required: true, ref: 'TodoList' },
	description: { type: String, required: true },
	is_completed: { type: Boolean, required: true },
	due_date: { type: Date, required: true },
	created_at: { type: Date, required: true, default: Date.now },
	updated_at: { type: Date, required: true, default: Date.now },
});

const TodoItemModel = model<TodoItem>('TodoItem', todoItemSchema);
export default TodoItemModel;
