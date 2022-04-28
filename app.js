const express = require ('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('main');
});

app.listen(port, () => {
    console.log(`App is listening to ${port}`);
});