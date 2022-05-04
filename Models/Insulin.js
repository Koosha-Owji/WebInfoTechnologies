import mongoose from "mongoose";

const insulinSchema = mongoose.Schema({
  patientId: {type: String, required: true , default: '123'},
  insulinLevel: { type: Number, required: true },
  insulinComment: { type: String, required: false},
  dateTime: { type: Date, required: true, default: Date.now() }
})

export default mongoose.model("insulin", insulinSchema);