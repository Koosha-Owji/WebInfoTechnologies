import mongoose from "mongoose";

const weightSchema = mongoose.Schema({
  username: {type: String, required: true , default: '123'},
  mostRecent: {type: Boolean, required: true},
  weightLevel: { type: Number, required: false },
  weightComment: { type: String, required: false},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("weight", weightSchema);