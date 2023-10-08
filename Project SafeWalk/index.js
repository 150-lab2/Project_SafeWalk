const express = require('express');
const app = express();
const port = 3000;
//const db = require('./config.js');
app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname, 'dist/my-angular-app')));


app.get('/', (req, res) => {
    res.send('hello world')
});

app.post('/adduser', async(req, res) =>{


    const username = req.body.name;
    const password = req.body.password;
    res.send(`The password is ${username} and ${password}`);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


