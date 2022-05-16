import userModel from '../Models/User.js';
import glucoseModel from '../Models/Glucose.js';
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {firstName, lastName, username, password , clinicianId } = req.body;
  
    try {
      const oldUser = await userModel.findOne({ username });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await userModel.create({firstName, lastName, username, password: hashedPassword, clinicianId });  
      res.render('clinicianFunctionality.hbs', {user: req.user});
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };
  export const update_password = async (req,res)=>{
    try {
      const oldUser = await userModel.findOne({ _id: req.user_id });
      if (!oldUser)
      return res.status(400).json({ message: "User doesn't exist" });
      const isPasswordCorrect = await bcrypt.compare(req.body.current_password, oldUser.password);
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
      const hashedPassword = await bcrypt.hash(req.body.new_password, 12);
  
      await userModel
      .findByIdAndUpdate(req.user_id, {
        password: hashedPassword
      })
      .exec();
  
      return res.json({message: "Password Changed Successfully!"});      
    } catch (error) {
      res.status(500).json({ message: "Password did not change!" });
    }
  };

  
export const getUserByUsername = async (req, res) => {
  try {
    const user = await userModel.findOne({username: "BobCat"}).lean();
    if (!user) return res.json("No user found");
    return res.render('patientHome.hbs',{data: user});
  } catch (err) {
    res.status(500).json({ message: "Glucose retrieval failed!" });
  }
};


export const getAllPatientsData = async (req, res) => {
  try {
      // Find and sort all the medical data by the date
      const glucoseData = await glucoseModel.find({"$and": [{mostRecent: true},{medicalData:"glucose"}]}).sort({dateTime: -1}).lean();

      // For some reason exercise is not being found
      // const exerciseData = await exerciseModel.find({"$and": [{mostRecent: true},{medicalData:"exercise"}]}).sort({dateTime: -1}).lean();
      const exerciseData = await glucoseModel.find({"$and": [{mostRecent: true},{medicalData:"exercise"}]}).sort({dateTime: -1}).lean();
      
      

      // Find all users
      const drPatients = await userModel.find({"$and": [{clinicianId: "627705c57364463ce0ff58fa"}, {role: "Patient"}]}).lean();
      
      return res.render('drHome.hbs',{exercisePost: exerciseData, glucosePost: glucoseData, users: drPatients});

  } catch (err) {
      res.status(500).json({ message: "weight retrieval failed!" });
  }
};