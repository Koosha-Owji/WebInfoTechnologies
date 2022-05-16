import userModel from '../Models/User.js';
import exerciseModel from '../Models/Exercise.js';
import glucoseModel from '../Models/Glucose.js';
import insulinModel from '../Models/Insulin.js';
import weightModel from '../Models/Weight.js';
import noteModel from '../Models/Notes.js';

import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {firstName, lastName, username, password , clinicianId } = req.body;
  
    try {
      const oldUser = await userModel.findOne({ username });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
      
      const result = await userModel.create({firstName, lastName, username, password: hashedPassword, clinicianId: clinicianId});  
      res.status(201).json({ result });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      res.status(500).json({ message: result });
      
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

  export const getAllPatientsDataOG = async (req, res) => {
    try {
        //const weight = await userModel.find({clinicianId: "hardCodedId"}).lean();
        //db.coll.distinct("_id", {clinicianId: "hardCodedId"})
        //const weight = await userModel.distinct("_id", {clinicianId: "hardCodedId"}).lean();
        // This returns each unique id_client which the Dr has.
        // Change clinicianId to be a bit more generic
        // Currently have the unique id for every patient of the doctor
        // const weight = await userModel.distinct("patientId", {clinicianId: "hardCodedId"}).lean();

        
        // For most recent data for every patient which belongs to the doctor
        // Currently have the unique id for every patient of the doctor
        const weight = await glucoseModel.find({"$and": [{clinicianId: "hardCodedId"}, {mostRecent: true}]}).lean();
        

        
        return res.render('allData.hbs',{data: weight});
    } catch (err) {
        res.status(500).json({ message: "weight retrieval failed!" });
    }
};

export const getAllPatientsData = async (req, res) => {
  try {
      // Find and sort all the medical data by the date
      const glucoseData = await glucoseModel.find({mostRecent: true}).sort({dateTime: -1}).lean();
      const exerciseData = await exerciseModel.find({mostRecent: true}).sort({dateTime: -1}).lean();

      // Find all users
      const drPatients = await userModel.find({"$and": [{clinicianId: "627705c57364463ce0ff58fa"}, {role: "Patient"}]}).lean();
      
      return res.render('oneData.hbs',{exercisePost: exerciseData, glucosePost: glucoseData, users: drPatients});

  } catch (err) {
      res.status(500).json({ message: "weight retrieval failed!" });
  }
};


// handle request to get one data instance OG code
export const getDataByIdOG = (req, res) => {
  // search the database by ID
  const data = peopleData.find((data) => data.id === req.params.id)

  // return data if this ID exists
  if (data) {
      res.render('oneData', { oneItem: data })
  } else {
      // You can decide what to do if the data is not found.
      // Currently, an empty list will be returned.
      res.sendStatus(404)
  }
};


export const getDataByIdOg = async (req, res) => {
  try {
    // const data = await glucoseModel.find((data) => data.id === req.params.id).lean();
    //const data = glucoseModel.find((data) => data.patientId === req.params.patientId).lean();
    //const patientInfo = await glucoseModel.find(req.params.patientId).lean();
    const patientInfo = await glucoseModel.find({_id: req.params.patientId}).lean();
    //console.log(`Mongo connection started on ${req.params.patientId}`)
    if (!patientInfo) {
      // no patient found in database
      return res.sendStatus(404)
    }
    // found the author
    return res.render('oneData', {oneItem: patientInfo})
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(err);
  }
};


export const getDataById = async (req, res) => {
  try {
    // Get all of the medical data placed by the user displays most recent date is shown first
      const patientPostInfo = await glucoseModel.find({"$and": [{patientId: "firstId"}, {dataType: "userInput"}]}).sort({dateTime: -1}).lean();
      //const patientNotes = await noteModel.find({"$and": [{patientId: "firstId"}, {dataType: "note"}]}).sort({dateTime: -1}).lean();
      const patientNotes = await glucoseModel.find({"$and": [{patientId: "firstId"}, {dataType: "note"}]}).sort({dateTime: -1}).lean();
      return res.render('oneData.hbs',{data: patientPostInfo, note: patientNotes});
  } catch (err) {
      res.status(500).json({ message: "weight retrieval failed!" });
  }
};