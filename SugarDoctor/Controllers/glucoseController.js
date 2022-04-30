import glucoseModel from "../Models/Glucose.js";

export const create_glucose = async (req, res) => {
    try {
        if (req.body){
          const date = new Date().toISOString().slice(0, 10);
            const newGlucose = glucoseModel.create({ ...req.body, dateTime:date});
          (await newGlucose)
            .save()
            //.then((newGlucose) => res.json(newGlucose))
            //.then((newGlucose) => res.render('getOne.hbs'))
            return res.redirect('/getOne')
          

            .catch((err) => res.status(400).json(err));
          } else {
            return res.status(200).json({ message: "Wrong content sent!" });
          }
    } catch (error) {
        res.status(500).json({ message: "Glucose creation failed!" });
    }
};

export const get_one_glucose = async (req, res) => {
    try {
      const date = new Date().toISOString().slice(0, 10);
      let glucose = await glucoseModel.find({dateTime: date}).lean();
      if (!glucose) return res.json("Patient has no data!");
      return res.render('patientData.hbs',{data: glucose});
    } catch (err) {
      res.status(500).json({ message: "Glucose retrieval failed!" });
    }
  };

// to get data for the patient UI
export const getOne = async (req, res) => {
    try {
      const date = new Date().toISOString().slice(0, 10);
      let glucose = await glucoseModel.find({dateTime: date}).lean();
      if (!glucose) return res.json("Patient has no data!");
      return res.render('getOne.hbs',{data: glucose});
    } catch (err) {
      res.status(500).json({ message: "Glucose retrieval failed!" });
    }
  };
  /*
  export const getPatientHome = (req, res) => {
    res.render('patient-home.hbs',{data: get_one_glucose})
}*/
