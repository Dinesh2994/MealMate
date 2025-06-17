// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  address: { type: String, default: '' },
});

const User = mongoose.model('User', userSchema);

export default User;
