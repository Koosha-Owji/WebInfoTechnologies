import mongoose from "mongoose";

const medicalDataSchema = mongoose.Schema({
  patientId: {type: String, required: true},
  dataLevel: { type: Number, required: true },
  dataComment: { type: String, required: false},
  dataType: { type: String, required: true},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("MedicalData", medicalDataSchema);