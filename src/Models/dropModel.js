import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dropModel = new Schema({
  round: Number,
  score: Number,
  dweight: Number,
  eweight: Number,
  nparts: Number,
  zone: Number,
  cracked: Boolean,
  dt: String
})

export default mongoose.model('dummy', dropModel)