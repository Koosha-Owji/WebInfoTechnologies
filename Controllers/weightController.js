import weightModel from "../Models/weight.js";
import userModel from "../models/user.js";

export const create_weight = async (req, res) => {
    try {
        if (req.body){
          const date = new Date().toISOString().slice(0, 10);
          const newWeight = weightModel.create({ ...req.body, dateTime:date});
          (await newWeight)
            .save()
            //.then((newweight) => res.json(newweight))
            .catch((err) => res.status(400).json(err));
            return res.redirect('/getOne');
          } else {
            return res.status(200).json({ message: "Wrong content sent!" });
          }
    } catch (error) {
        res.status(500).json({ message: "weight creation failed!" });
    }
};
export const get_one_weight = async (req, res) => {
    try {
      const weight = await weightModel.find({patient_id: "123"}).sort({$natural:-1}).lean();
      if (!weight) return res.json("Patient has not enter data!");
      return res.render('patientData.hbs',{data: weight});
    } catch (err) {
      res.status(500).json({ message: "weight retrieval failed!" });
    }
  };

export const getOne = async (req, res) => {
    try {
      const weight = await weightModel.find({patient_id: "123"}).sort({$natural:-1}).lean();
      if (!weight) return res.json("Patient has no data!");
      return res.render('getOne.hbs',{data: weight});
    } catch (err) {
      res.status(500).json({ message: "weight retrieval failed!" });
    }
  };