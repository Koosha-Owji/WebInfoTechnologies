import noteModel from "../models/note.js";
import userModel from "../models/user.js";

export const writeNote = async (req, res) => {
    const {patientId, clinicianId, note} = req.body;
    try {
          const date = new Date().toISOString().slice(0, 10);
          //const dataContentType = new("note");
          const newNote = await glucoseModel.create({patientId, clinicianId, note});
          (await newNote)
            .save()
            .catch((err) => res.status(400).json(err));
            return res.redirect('/');
           
    } catch (error) {
        res.status(500).json({ message: "Note creation failed!" });
    }
};