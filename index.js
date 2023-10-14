const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require("./config.js")
const users = db.collection('users_test');

//this will create a user "alfredo_account", it is not added till /adduser.
//collection 'users_test' is where i am holding user accounts to test out.
//feel free to make your own collection.


//const user = db.collection('users_test').doc('alfredo_account');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



app.get('/', (req, res) => {
    res.send('hello world')
});




app.post('/signup', async(req, res) =>{
    var msg = '';
    const username = req.body.username;
    const email =  req.body.email;
    const password = req.body.password;

    await users.where('username', '==', username).where('email', '==', email).get().then((snap) =>{
        if(snap.empty){
            const data = {
                username: username,
                email: email,
                password: password
            }
            db.doc(`users_test/${username}`).set(data);
            msg = 'user has signed up';

        }
        else{

            msg = 'username or email already taken';
        }
    });
    
    
    res.send({msg});


});

app.post('/login', async(req, res)=>{
    
    var msg = ''
    const email = req.body.email;
    const password = req.body.password;
    var data;
    console.log({email, password});
    
    
    await users.where('email', '==', email).where('password', '==', password).get().then((snap) =>{
        
        if(snap.empty){
            console.log('1');
            msg = 'could not find email and password match';
        }
        else{
            console.log('2');
            data = snap.docs[0].data();
            msg = `you have logged in as ${snap.docs[0].data()['username']}`;
        }
    });
    res.send({msg, data});

});





/*


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

    const useraccounts = await db.collection('users_test').doc('jeff').update(userinfo);
    res.send('sent');
});
















//TEST CODE

app.post('/adduser', async(req, res) =>{
//I will add user account from post.
    //console.log(res.body);


    const username = req.body.name;
    const password = req.body.password;


//this adds the user 'alredo_account'
    await user.set({
        username: username,
        password: password 
    });
    

    res.send(`The username ${username} and ${password} are saved into the firebase db`);
    //res.send("wheefefe");
});








app.get('/getusers', async(req, res) => {

    //const user = db.collection('users_test').doc('alfredo_account');
    const user = db.doc('users_test/alfredo_account');
    const doc = await user.get();
    
    res.send(doc.data());
    //res.send("hello");

});











app.get('/test/:token/:id',(req, res) =>{
    console.log(req.params);
});

*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


