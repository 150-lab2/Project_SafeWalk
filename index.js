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




app.post('/signup', async(req, res) =>{
    
    //needs an email, password(not safe, do not use a real pass), username.
    

    const username = req.body.username;
    const email =  req.body.email;
    const password = req.body.password;

    const data = {
        username: username,
        email: email,
        password: password
    }

    const useraccounts = await db.collection('users_test').doc(`${username}`).set(data);
    

});

app.post('/addcontact', async(req, res)=>{

    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;

    

    const data = {
        name: name,
        phone_number: phoneNumber,
        email: email
    }
    const userinfo = {
        contacts: data
    }

    const useraccounts = await db.collection('users_test').doc('jeff').set(userinfo);
    res.send('sent');
});
















//TEST CODE

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

    //const user = db.collection('users_test').doc('alfredo_account');
    const user = db.doc('users_test/alfredo_account');
    const doc = await user.get();

    res.send(doc.data());
});



app.get('/test/:token/:id',(req, res) =>{
    console.log(req.params);
});

//signup
/*
app.post('/signup/', async (req, res)=>{



});
*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


