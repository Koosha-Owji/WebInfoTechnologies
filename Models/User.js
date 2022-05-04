import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    clinicianId: {type: String, required: false },
    glucoseUpper: { type: Number, required: false },
    glucoseLower: { type: Number, required: false },
    weightUpper: { type: Number, required: false },
    weightLower: { type: Number, required: false },
    insulinUpper: { type: Number, required: false },
    insulinLower: { type: Number, required: false },
    exerciseUpper: { type: Number, required: false },
    exerciseLower: { type: Number, required: false },
    firstName : { type: String, required: true },
    lastName : { type: String, required: true },
    username : { type: String, required: true },
    password : { type: String, required: true },
    role: {type: String , required: true},
    supportMessage: { type: String, required: false }
  })
  
  export default mongoose.model("User", UserSchema);