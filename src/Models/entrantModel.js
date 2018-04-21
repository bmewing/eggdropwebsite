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

const entrantModel = new Schema({
  fname: String,
  lname: String,
  team: String,
  category: String,
  year: Number,
  drop: [dropModel]
})

export default mongoose.model('eggdrop2018', entrantModel)