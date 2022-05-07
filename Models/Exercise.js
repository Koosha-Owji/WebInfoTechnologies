import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
  patientId: {type: String, required: true , default: '123'},
  exerciseLevel: { type: Number, required: true },
  exerciseComment: { type: String, required: false},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("exercise", exerciseSchema);