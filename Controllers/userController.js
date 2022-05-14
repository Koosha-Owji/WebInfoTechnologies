import userModel from '../Models/User.js';
import glucoseModel from '../Models/Glucose.js';
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const {firstName, lastName, username, password , clinicianId } = req.body;
  
    try {
      const oldUser = await userModel.findOne({ username });
  
      if (oldUser) return res.status(400).json({ message: "User already exists" });
  
      const hashedPassword = await bcrypt.hash(password, 12);
  
      const result = await userModel.create({firstName, lastName, username, password: hashedPassword, clinicianId: clinicianId });  
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

  export const getAllPatientsData = async (req, res) => {
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


export const getDataById = async (req, res) => {
  try {
    // const data = await glucoseModel.find((data) => data.id === req.params.id).lean();
    //const data = glucoseModel.find((data) => data.patientId === req.params.patientId).lean();
    const patientInfo = await glucoseModel.findById(req.params.patientId).lean()
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