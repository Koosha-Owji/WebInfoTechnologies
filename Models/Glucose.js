import mongoose from "mongoose";

const glucoseSchema = mongoose.Schema({
  patientId: {type: String, required: true , default: '123'},
  clinicianId: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  mostRecent: {type: Boolean, required: true},
  glucoseLevel: { type: Number, required: true },
  glucoseUpper: { type: Number, required: true },
  glucoseLower: { type: Number, required: true },
  glucoseComment: { type: String, required: false},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("Glucose", glucoseSchema);