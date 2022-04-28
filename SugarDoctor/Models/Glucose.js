import mongoose from "mongoose";

const glucoseSchema = mongoose.Schema({
  patient_id: {type: String, required: false},
  glucoseLevel: { type: Number, required: true },
  glucoseUpper: { type: Number, required: false },
  glucoseLower: { type: Number, required: false },
  glucoseComment: { type: String, required: false}
});

export default mongoose.model("Glucose", glucoseSchema);