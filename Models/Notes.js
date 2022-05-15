import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    content: {type: String, required: true},
    patientId: {type: String, required: true},
    clinicianId: {type: String, required: true},
    dateTime: { type: Date, required: true, default: Date.now() }
});

export default mongoose.model("Note", noteSchema);