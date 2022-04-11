import mongoose from "mongoose";

const glucoseSchema = mongoose.Schema({
  glucoseLevel: { type: Number, required: true },
  upperGlucoseLevel: {type: Number, required: true},
  lowerGlucoseLevel: { type: Number, required: true},
  glucoseComment: { type: String, required: false}
});

export default mongoose.model("Glucose", glucoseSchema);