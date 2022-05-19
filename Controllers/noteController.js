import noteModel from "../models/Notes.js";
import userModel from '../Models/User.js';

export const writeNote = async (req, res) => {
    var {username, clinicianId, content} = req.body;
    try {
        username = username.slice(0, -1);
          const date = new Date().toISOString().slice(0, 10);
          const newNote = await noteModel.create({username, clinicianId, content, date});
          (await newNote)
            .save()
            .catch((err) => res.status(400).json(err));
            return res.redirect('back');
           
    } catch (error) {
        res.status(500).json({ message: "Note creation failed!" });
    }
}; 
export const viewNotes = async (req, res) => {
    try {
        // Find and sort all the medical data by the date
        // Instead of adding the mostRecent field, can just check if data has been added today.
        // If data has not been added, Can just render it something such as data enterted firstname secondname
        // Need to make sure that the user cannot enter multiple data
        //const noteData = await noteModel.find({"$and": [{clinicianId:req.user._id}]}).sort({dateTime: -1}).lean();
        const noteData = await noteModel.find({"$and": [{clinicianId: req.user._id}]}).sort({dateTime: -1}).lean();
        // Find all patients of the Dr
        const drPatients = await userModel.find({"$and": [{clinicianId: req.user._id}, {role: "Patient"}]}).lean();
        return res.render('viewNotes.hbs',{user: req.user, patients: drPatients, notePost: noteData});
  
    } catch (err) {
        res.status(500).json({ message: "Dashboard rendering failed!" });
    }
  };