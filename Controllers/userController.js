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
      // Instead of adding the mostRecent field, can just check if data has been added today.
      // If data has not been added, Can just render it something such as data enterted firstname secondname
      // Need to make sure that the user cannot enter multiple data
      const date = new Date().toISOString().slice(0, 10);
      const exerciseData = await glucoseModel.find({"$and": [{dateTime: date},{dataType:"exercise"}]}).sort({dateTime: -1}).lean();
      const glucoseData = await glucoseModel.find({"$and": [{dateTime: date},{dataType:"glucose"}]}).sort({dateTime: -1}).lean();
      const insulinData = await glucoseModel.find({"$and": [{dateTime: date},{dataType:"insulin"}]}).sort({dateTime: -1}).lean();
      const weightData = await glucoseModel.find({"$and": [{dateTime: date},{dataType:"weight"}]}).sort({dateTime: -1}).lean();

      // Find all users
      const drPatients = await userModel.find({"$and": [{clinicianId: req.user._id}, {role: "Patient"}]}).lean();
      
      return res.render('drHome.hbs',{user: req.user, patients: drPatients, exercisePost: exerciseData, glucosePost: glucoseData, insulinPost: insulinData, weightPost: weightData});

  } catch (err) {
      res.status(500).json({ message: "Dashboard rendering failed!" });
  }
};


export const getDataById =  async (req, res) => {
	try {
    // Information about the medical data posted by the patient
		const patientPostInfo = await glucoseModel.find({username: req.params.username} ).sort({dateTime: -1}).lean();
    // Information about the user data of the patient
    const patientUserInfo = await userModel.find({"$and": [{username: req.params.username}, {role: "Patient"}]}).lean();
		res.render('showOnePatient', {user: req.user,medicalData: patientPostInfo, patientData: patientUserInfo})	
	} catch (err) {
		console.log(err)
	}
}

export const updatePatientRequirements = async (req,res)=>{
  const {firstName, lastName, username, password , clinicianId } = req.body;
  try {
    const oldUser = await userModel.findOne({"$and": [{username: req.params.username}, {role: "Patient"}]});
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