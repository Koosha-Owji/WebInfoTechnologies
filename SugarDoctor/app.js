const mongoose = require('mongoose');
const express = require('express');

const app = express();

const CONNECTION_URL = 'mongodb+srv://WebInfoTech:Webinfotech@cluster0.r8yef.mongodb.net/WebInfoTech?retryWrites=true&w=majority'
const PORT = process.env.PORT|| 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);