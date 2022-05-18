export const getAboutDiabetes = async (req, res) => {
  try {
     
      return res.render('AboutDiabetes.hbs',{user: req.user});

  } catch (err) {
      res.status(500).json({ message: "Dashboard rendering failed!" });
  }
};
