import userModel from '../Models/User.js';
import glucoseModel from '../Models/Glucose.js';
import noteModel from "../models/Notes.js";
import bcrypt from "bcryptjs";

export const signupOG = async (req, res) => {
  const {firstName, lastName, username, password , clinicianId, exerciseLower } = req.body;

  try {
    const oldUser = await userModel.findOne({ username });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await userModel.create({firstName, lastName, username, password: hashedPassword, clinicianId,exerciseLower });  
    res.render('clinicianFunctionality.hbs', {user: req.user});
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};


export const signup = async (req, res) => {
    const {firstName, lastName, username, password , clinicianId,
      glucoseUpper,
      glucoseLower,
      weightUpper,
      weightLower,
      insulinUpper,
      insulinLower,
      exerciseUpper,
      exerciseLower,
      glucoseRequired,
      insulinRequired,
      exerciseRequired,
      weightRequired} = req.body;
  
    try {
      const oldUser = await userModel.findOne({ username });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);

      const result = await userModel.create({firstName, lastName, username, password: hashedPassword, clinicianId,glucoseUpper,
        glucoseLower,
        weightUpper,
        weightLower,
        insulinUpper,
        insulinLower,
        exerciseUpper,
        exerciseLower,
        glucoseRequired,
        insulinRequired,
        exerciseRequired,
        weightRequired});  
      res.render('clinicianFunctionality.hbs', {user: req.user});
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
      console.log(error);
    }
  };
  export const update_password = async (req,res)=>{
    try {
      const oldUser = await userModel.findOne({ username: req.body.username });
      if (!oldUser)
      return res.status(400).json({ message: "User doesn't exist" });
      const isPasswordCorrect = await bcrypt.compare(req.body.current_password, oldUser.password);
      if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
      const hashedPassword = await bcrypt.hash(req.body.new_password, 12);
  
      await userModel
      .findByIdAndUpdate(oldUser._id, {
        password: hashedPassword
      })
      .exec();
  
      return res.redirect('/');     
    } catch (error) {
      res.status(500).json({ message: "Password did not change!" });
    }
  };

  
export const getUserByUsername = async (req, res) => {
  try {
    const thisUser = await userModel.findOne({username: req.user.username }).lean();
    const thisGlucose = await glucoseModel.find({patientId: req.user._id, dataType: 'glucose' }).sort({$natural:-1}).lean().limit(1);
    const thisInsulin = await glucoseModel.find({patientId: req.user._id, dataType: 'insulin' }).sort({$natural:-1}).lean().limit(1);
    const thisExercise = await glucoseModel.find({patientId: req.user._id, dataType: 'exercise' }).sort({$natural:-1}).lean().limit(1);
    const thisWeight = await glucoseModel.find({patientId: req.user._id, dataType: 'weight' }).sort({$natural:-1}).lean().limit(1);

    return res.render('patient-home.hbs', {user: thisUser, glucose: thisGlucose, insulin: thisInsulin, exercise: thisExercise, weight: thisWeight} );
    
    //return res.render('patientHome.hbs',{data: user});
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

      // Find all patients of the Dr
      const drPatients = await userModel.find({"$and": [{clinicianId: req.user._id}, {role: "Patient"}]}).lean();
      
      return res.render('drHome.hbs',{user: req.user, patients: drPatients, exercisePost: exerciseData, glucosePost: glucoseData, insulinPost: insulinData, weightPost: weightData});

  } catch (err) {
      res.status(500).json({ message: "Dashboard rendering failed!" });
  }
};


export const writeSupportMessage = async (req, res) => {
  try {
      // Find all patients of the Dr
      const drPatients = await userModel.find({"$and": [{clinicianId: req.user._id}, {role: "Patient"}]}).lean();
      
      return res.render('writeSupportMessage.hbs',{user: req.user, patients: drPatients});

  } catch (err) {
      res.status(500).json({ message: "Dashboard rendering failed!" });
  }
};
export const submitSupportMessage = async (req, res) => {
  var {supportMessage, username}= req.body;
  try {
      username = username.slice(0, -1);
      const oldUser = await userModel.findOne({username: username, role: "Patient"});
      if (!oldUser)
      return res.status(400).json({ message: "User doesn't exist" });
      await userModel
    .findByIdAndUpdate(oldUser._id, {
      supportMessage
    })
    .exec();
    return res.redirect('back');      
  } catch (error) {
    res.status(500).json({ message: "Reguirements did not change!" });
  }
};


export const getDataById =  async (req, res) => {
	try {
    // Information about the medical data posted by the patient
		const patientPostInfo = await glucoseModel.find({username: req.params._id} ).sort({dateTime: -1}).lean();
    // Information about the user data of the patient
    const patientUserInfo = await userModel.find({"$and": [{username: req.params.username}, {role: "Patient"}]}).lean();
    const noteData = await noteModel.find({"$and": [{username: req.params.username}]}).lean();
		res.render('showOnePatient', {user: req.user,medicalData: patientPostInfo, patients: patientUserInfo, notePost: noteData})	
	} catch (err) {
		console.log(err)
	}
}

export const viewComments = async (req, res) => {
  try {
      // Making sure that the data is not a note
      const commentData = await glucoseModel.find( { dataType: { $ne: "note" } } ).sort({dateTime: -1}).lean();
      //const commentData = await glucoseModel.find().sort({dateTime: -1}).lean();

      // Find all patients of the Dr
      const drPatients = await userModel.find({"$and": [{clinicianId: req.user._id}, {role: "Patient"}]}).lean();
      
      return res.render('viewComments.hbs',{user: req.user, patients: drPatients, commentPost: commentData});

  } catch (err) {
      res.status(500).json({ message: "Dashboard rendering failed!" });
  }
};

export const updatePatientRequirements = async (req,res)=>{
  var {glucoseUpper,
    glucoseLower,
    weightUpper,
    weightLower,
    insulinUpper,
    insulinLower,
    exerciseUpper,
    exerciseLower,
    glucoseRequired,
    insulinRequired,
    exerciseRequired,
    weightRequired} = req.body;
  try {
    if(Array.isArray(glucoseRequired)==true)
    {
      glucoseRequired = glucoseRequired[1];
    }
    if(Array.isArray(exerciseRequired)==true)
    {
      exerciseRequired = exerciseRequired[1];
    }
    if(Array.isArray(insulinRequired)==true)
    {
      insulinRequired = insulinRequired[1];
    }
    if(Array.isArray(weightRequired)==true)
    {
      weightRequired = weightRequired[1];
    }
    const oldUser = await userModel.findOne({"$and": [{username: req.body.username}, {role: "Patient"}]});
    if (!oldUser)
    return res.status(400).json({ message: "User doesn't exist" });
    await userModel
    .findByIdAndUpdate(oldUser._id, {
      glucoseUpper,
        glucoseLower,
        weightUpper,
        weightLower,
        insulinUpper,
        insulinLower,
        exerciseUpper,
        exerciseLower,
        glucoseRequired,
        insulinRequired,
        exerciseRequired,
        weightRequired
    })
    .exec();

    return res.redirect('back');      
  } catch (error) {
    res.status(500).json({ message: "Reguirements did not change!" });
  }
};
export const engagementRate = async (req,res) => {
  try {
    const users = await userModel.find().lean()


    return res.render('leaderboard.hbs', {/*layout: 'patientMain.hbs',*/ data: users } );


  } catch (err) {
    res.status(500).json({ message: "Could not get engagement rate!" });
  }
};
export const getProfile = async (req, res) => {
  try {
    const thisUser = await userModel.findOne({username: req.user.username }).lean();
    return res.render('Profile.hbs', {user: thisUser} );
    
    //return res.render('patientHome.hbs',{data: user});
  } catch (err) {
    res.status(500).json({ message: "Glucose retrieval failed!" });
  }
};


export const getPatientHistory =  async (req, res) => {
	try {
    // Information about the medical data posted by the patient
    const thisUser = await userModel.findOne({username: req.user.username }).lean();
    const data = await glucoseModel.find({patientId: req.user._id} ).sort({dateTime: -1}).lean();

		res.render('patientHistory.hbs', {user: thisUser,medicalData: data })	
	} catch (err) {
		console.log(err)
	}
}
