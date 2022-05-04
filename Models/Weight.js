import mongoose from "mongoose";

const weightSchema = mongoose.Schema({
  patientId: {type: String, required: true , default: '123'},
  weightLevel: { type: Number, required: true },
  weightComment: { type: String, required: false},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("weight", weightSchema);