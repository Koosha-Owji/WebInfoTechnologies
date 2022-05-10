
import userModel from "../models/User.js";

export const create_supmsg = async (req, res) => {
    try {
        if (req.body){
          const date = new Date().toISOString().slice(0, 10);
          const newSupMsg = userModel.create({ ...req.body, dateTime:date});
          (await newSupMsg)
            .save()
            .catch((err) => res.status(400).json(err));
            return res.redirect('/getOne');
          } else {
            return res.status(200).json({ message: "Wrong content sent!" });
          }
    } catch (error) {
        res.status(500).json({ message: "Support Message Update failed!" });
    }
};

export const get_one_supmsg = async (req, res) => {
    try {
      const supportMessage = await userModel.find({patient_id: "123"}).sort({$natural:-1}).lean();
      if (!supportMessage) return res.json("Patient has not enter data!");
      return res.render('patientData.hbs',{data: insulin});
    } catch (err) {
      res.status(500).json({ message: "insulin retrieval failed!" });
    }
  };


  //patient side
export const getOne = async (req, res) => {
    try {
      const insulin = await insulinModel.find({patient_id: "123"}).sort({$natural:-1}).lean();
      if (!insulin) return res.json("Patient has no data!");
      return res.render('getOne.hbs',{data: insulin});
    } catch (err) {
      res.status(500).json({ message: "insulin retrieval failed!" });
    }
  };