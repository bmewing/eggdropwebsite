import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const loginModel = new Schema({
  user: String,
  pass: String
})

export default mongoose.model('login', loginModel, 'login')