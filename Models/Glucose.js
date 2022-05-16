import mongoose from "mongoose";

const glucoseSchema = mongoose.Schema({
  username: {type: String, required: true , default: '123'},
  clinicianId: {type: String, required: false},
  mostRecent: {type: Boolean, required: true},
  glucoseLevel: { type: Number, required: true },
  glucoseComment: { type: String, required: false},
  medicalData:{type: String, required: true, default: "exercise"},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("Glucose", glucoseSchema);