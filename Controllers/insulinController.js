import insulinModel from "../Models/insulin.js";
import userModel from "../models/user.js";

export const create_insulin = async (req, res) => {
    try {
        if (req.body){
          const date = new Date().toISOString().slice(0, 10);
          const newInsulin = insulinModel.create({ ...req.body, dateTime:date});
          (await newInsulin)
            .save()
            //.then((newinsulin) => res.json(newinsulin))
            .catch((err) => res.status(400).json(err));
            return res.redirect('/getOne');
          } else {
            return res.status(200).json({ message: "Wrong content sent!" });
          }
    } catch (error) {
        res.status(500).json({ message: "insulin creation failed!" });
    }
};
export const get_one_insulin = async (req, res) => {
    try {
      const insulin = await insulinModel.find({patient_id: "123"}).sort({$natural:-1}).lean();
      if (!insulin) return res.json("Patient has not enter data!");
      return res.render('patientData.hbs',{data: insulin});
    } catch (err) {
      res.status(500).json({ message: "insulin retrieval failed!" });
    }
  };

export const getOne = async (req, res) => {
    try {
      const insulin = await insulinModel.find({patient_id: "123"}).sort({$natural:-1}).lean();
      if (!insulin) return res.json("Patient has no data!");
      return res.render('getOne.hbs',{data: insulin});
    } catch (err) {
      res.status(500).json({ message: "insulin retrieval failed!" });
    }
  };