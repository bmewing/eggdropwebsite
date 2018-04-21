import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dropstageModel = new Schema({
  year: String,
  stage: Number
})

export default mongoose.model('stage', dropstageModel, 'stage')