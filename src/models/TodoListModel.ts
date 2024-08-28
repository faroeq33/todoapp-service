import { Schema, model } from 'mongoose';

type TodoList = {
	id: string;
	user_id: string;
	title: string;
	created_at: Date;
	updated_at: Date;
}

const todoListSchema = new Schema<TodoList>({
	// id: { type: String, required: true },
	user_id: { type: String, required: true, ref: 'User' },
	title: { type: String, required: true },
	created_at: { type: Date, required: false, default: Date.now },
	updated_at: { type: Date, required: false, default: Date.now },
});

todoListSchema.methods.toJSON = function removeVersionKey() {
	var obj = this.toObject();
	delete obj.__v;
	return obj;
}

const TodoListModel = model<TodoList>('TodoList', todoListSchema);
export default TodoListModel;


// Why make id instead of _id? What are possible implications of this?
// Why ref and type in the TodoList schema?