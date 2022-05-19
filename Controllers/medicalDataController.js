import medicalDataModel from "../Models/MedicalData.js";
//import glucoseModel from "../Models/Glucose.js";

export const createData = async (req, res) => {
    try {
        if (req.body){
          const date = new Date().toISOString().slice(0, 10);
          const newData = medicalDataModel.create({ ...req.body, dateTime:date});
          (await newData)
            .save()
            //.then((newGlucose) => res.json(newGlucose))
            .catch((err) => res.status(400).json(err));
            return res.redirect('/testData', {data: newData} );
          } else {
            return res.status(200).json({ message: "Wrong content sent!" });
          }
    } catch (error) {
        res.status(500).json({ message: "Data creation failed!" });
    }
};
/*
export const get_one_glucose = async (req, res) => {
    try {
      const glucose = await glucoseModel.find({patient_id: "123"}).sort({$natural:-1}).lean();
      if (!glucose) return res.json("Patient has not enter data!");
      return res.render('patientData.hbs',{data: glucose});
    } catch (err) {
      res.status(500).json({ message: "Glucose retrieval failed!" });
    }
  };

export const getOne = async (req, res) => {
    try {
      const glucose = await glucoseModel.find({patient_id: "123"}).sort({$natural:-1}).lean();
      if (!glucose) return res.json("Patient has no data!");
      return res.render('getOne.hbs',{data: glucose});
    } catch (err) {
      res.status(500).json({ message: "Glucose retrieval failed!" });
    }
  };*/