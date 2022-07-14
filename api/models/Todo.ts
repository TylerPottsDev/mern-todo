import mongoose from 'mongoose';
import { ITodo } from '../../types/todo';


const Schema = mongoose.Schema;

const TodoSchema = new Schema<ITodo>({
	text: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

export const TodoModel = mongoose.model<ITodo>("Todo", TodoSchema);
