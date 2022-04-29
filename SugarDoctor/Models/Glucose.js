import mongoose from "mongoose";

const glucoseSchema = mongoose.Schema({
  patient_id: {type: String, required: true , default: '123'},
  glucoseLevel: { type: Number, required: true },
  glucoseUpper: { type: Number, required: true , default: '150' },
  glucoseLower: { type: Number, required: true , default: '50'},
  glucoseComment: { type: String, required: false},
  first_name : { type: String, required: true, default: 'Liam'},
  last_name : { type: String, required: true, default: 'Pattison'},
  glucose_today: { type: Boolean, required: true, default: 'true'}
})

export default mongoose.model("Glucose", glucoseSchema);