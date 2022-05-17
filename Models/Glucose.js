import mongoose from "mongoose";

const glucoseSchema = mongoose.Schema({
  patientId: {type: String, required: true , default: '123'},
  glucoseLevel: { type: Number, required: true },
  glucoseComment: { type: String, required: false},
  dataType: { type: String, required: false},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("Glucose", glucoseSchema);