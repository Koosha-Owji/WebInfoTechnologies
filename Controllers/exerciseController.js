import exerciseModel from "../Models/exercise.js";
import userModel from "../models/user.js";

export const create_exercise = async (req, res) => {
    try {
        if (req.body){
          const date = new Date().toISOString().slice(0, 10);
          const newExercise = exerciseModel.create({ ...req.body, dateTime:date});
          (await newExercise)
            .save()
            //.then((newexercise) => res.json(newexercise))
            .catch((err) => res.status(400).json(err));
            return res.render()
          } else {
            return res.status(200).json({ message: "Wrong content sent!" });
          }
    } catch (error) {
        res.status(500).json({ message: "exercise creation failed!" });
    }
};
export const get_one_exercise = async (req, res) => {
    try {
      const Exercise = await exerciseModel.find({patient_id: "123"}).sort({$natural:-1}).lean();
      if (!Exercise) return res.json("Patient has not enter data!");
      return res.render('patientData.hbs',{data: Exercise});
    } catch (err) {
      res.status(500).json({ message: "exercise retrieval failed!" });
    }
  };

export const getOne = async (req, res) => {
    try {
      const Exercise = await exerciseModel.find({patient_id: "123"}).sort({$natural:-1}).lean();
      if (!Exercise) return res.json("Patient has no data!");
      return res.render('getOne.hbs',{data: Exercise});
    } catch (err) {
      res.status(500).json({ message: "exercise retrieval failed!" });
    }
  };