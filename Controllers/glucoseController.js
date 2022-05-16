import glucoseModel from "../Models/Glucose.js";

export const create_glucose = async (req, res) => {
    try {
        if (req.body){
          const date = new Date().toISOString().slice(0, 10);
          const newGlucose = glucoseModel.create({ ...req.body, dateTime:date});
          (await newGlucose)
            .save()
            //.then((newGlucose) => res.json(newGlucose))
            .catch((err) => res.status(400).json(err));
            return res.redirect('/getOne');
          } else {
            return res.status(200).json({ message: "Wrong content sent!" });
          }
    } catch (error) {
        res.status(500).json({ message: "Glucose creation failed!" });
    }
};
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
  };

  export const writeNote = async (req, res) => {
    const {patientId, clinicianId, note, dataType} = req.body;
    try {
        
          const date = new Date().toISOString().slice(0, 10);
          let dataTypeContent = "note";
          //const dataContentType = new("note");
          const newNote = await glucoseModel.create({patientId, clinicianId, note,dataType});
          (await newNote)
            .save()
            //.then((newGlucose) => res.json(newGlucose))
            .catch((err) => res.status(400).json(err));
            return res.redirect('/hard_data');
           
    } catch (error) {
        res.status(500).json({ message: "Glucose creation failed!" });
    }
};

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