import mongoose from "mongoose";

const glucoseSchema = mongoose.Schema({
  patient_id: {type: String, required: true},
  glucoseLevel: { type: Number, required: true },
  glucoseUpper: { type: Number, required: true },
  glucoseLower: { type: Number, required: true },
  glucoseComment: { type: String, required: false}
});

const Glucose = mongoose.model("Glucose", glucoseSchema);
export default Glucose