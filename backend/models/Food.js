// models/Food.js
import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['veg', 'non-veg', 'vegan', 'drinks'], required: true },
  type: { type: String, enum:['indian','chinese','gym'], required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
});

const Food = mongoose.model('FoodItem', foodItemSchema);
export default Food;
