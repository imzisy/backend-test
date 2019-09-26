import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status : { type: String, required: false , default: 'created'},
});

export interface Order extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  status: string;
}
