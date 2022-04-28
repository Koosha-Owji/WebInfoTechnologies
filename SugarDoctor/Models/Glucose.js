import mongoose from "mongoose";

const glucoseSchema = mongoose.Schema({
  patient_id: {type: String, required: true , default: '123'},
  glucoseLevel: { type: Number, required: true },
  glucoseUpper: { type: Number, required: true , default: '150' },
  glucoseLower: { type: Number, required: true , default: '50'},
  glucoseComment: { type: String, required: false}
});

export default mongoose.model("Glucose", glucoseSchema);