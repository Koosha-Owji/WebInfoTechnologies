import mongoose from "mongoose";

const glucoseSchema = mongoose.Schema({
  username: {type: String, required: true , default: '123'},
  clinicianId: {type: String, required: true},
  mostRecent: {type: Boolean, required: true},
  glucoseLevel: { type: Number, required: false },
  glucoseComment: { type: String, required: false},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("Glucose", glucoseSchema);