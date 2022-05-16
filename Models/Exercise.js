import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema({
  username: {type: String, required: true , default: '123'},
  clinicianId: {type: String, required: false},
  mostRecent: {type: Boolean, required: true},
  exerciseLevel: { type: Number, required: true },
  exerciseComment: { type: String, required: false},
  medicalData:{type: String, required: true, default: "exercise"},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("Exercise", exerciseSchema);