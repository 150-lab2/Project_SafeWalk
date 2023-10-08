const express = require('express');
const app = express();
const port = 3000;

const db = require("./config.js");

//this will create a user "alfredo_account", it is not added till /adduser.
//collection 'users_test' is where i am holding user accounts to test out.
//feel free to make your own collection.


const user = db.collection('users_test').doc('alfredo_account');
app.use(express.json());




app.get('/', (req, res) => {
    res.send('hello world')
});


app.post('/adduser', async(req, res) =>{
//I will add user account from post.
    const username = req.body.name;
    const password = req.body.password;


//this adds the user 'alredo_account'
    await user.set({
        username: username,
        password: password 
    });
    

    res.send(`The username ${username} and ${password} are saved into the firebase db`);
});

app.get('/getusers', async(req, res) => {

    const user = db.collection('users').doc('alovelace');
    const doc = await user.get();

    res.send(doc.data());
});



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


