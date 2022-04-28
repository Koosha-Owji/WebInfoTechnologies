import glucoseModel from "../Models/Glucose.js";

export const create_glucose = async (req, res) => {
    try {
        if (req.body){
            const newGlucose = glucoseModel.create({ ...req.body});
          (await newGlucose)
            .save()
            .then((newGlucose) => res.json(newGlucose))
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
      const glucose = await glucoseModel.findOne({patient_id: req.body.patient_id});
      if (!glucose) return res.json("Patient has not enter data!");
      return res.json(glucose);
    } catch (err) {
      res.status(500).json({ message: "Glucose retrieval failed!" });
    }
  };

  export const getPatientHome = (req, res) => {
    res.render('patient-home.hbs',{data: get_one_glucose})
}