import mongoose from "mongoose";

const glucoseSchema = mongoose.Schema({
  username: {type: String, required: true , default: '123'},
  clinicianId: {type: String, required: false},
  firstName: {type: String, required: false},
  lastName: {type: String, required: false},
  mostRecent: {type: Boolean, required: false},
  glucoseLevel: { type: Number, required: false },
  glucoseUpper: { type: Number, required: false },
  glucoseLower: { type: Number, required: false },
  glucoseComment: { type: String, required: false},
  note: { type: String, required: false},
  dataType: { type: String, required: false},
  isNote: { type: Boolean, required: false},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("Glucose", glucoseSchema);