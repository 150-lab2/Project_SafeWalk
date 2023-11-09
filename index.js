const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const {Filter, Where} = require('firebase-admin/firestore');
const db = require("./config.js")
const users = db.collection('users_test');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(cors({ origin: '*' }));


app.get('/', (req, res) => {
    res.send('hello world')
});




app.post('/signup', async(req, res) =>{
    var msg = '';
    const username = req.body.username;
    const email =  req.body.email;
    const password = req.body.password;
    let orFilter = Filter.or(Filter.where('username', '==', username), Filter.where('email', '==', email));
    
    await users.where(orFilter).get().then((snap) =>{
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
    console.log("what");
    var msg = ''
    const email = req.body.emaill;
    const password = req.body.password;
    var data;
    console.log({email, password});
    var access = {access: false};
    
    
    await users.where('email', '==', email).where('password', '==', password).get().then((snap) =>{
        
        if(snap.empty){
            msg = 'could not find email and password match';
        }
        else{
            access.access = true;
            data = snap.docs[0].data();
            msg = `you have logged in as ${snap.docs[0].data()['username']}`;
        }
    });
    
    res.send({access, data});

});

//:username, is the main user who we want to add contacts too.
app.post('/addcontact/:username', async(req, res) =>{
    console.log(req.params);

    username = req.params.username;
    //contact name will be set as the contact id.
    contact_name = req.body.name;
    phone = req.body.phone;
    relation = req.body.relation;

    data = {
        contact_name: contact_name,
        phone: phone,
        relation: relation
    }

    const doc = await db.collection('users_test').doc(`${username}`).collection('contacts').doc(`${contact_name}`).set(data);
    res.send(`Contact ${contact_name} has been added to ${username}'s contact list`);
    /*example code
    //const user = db.collection('users_test').doc('alfredo_account');
    //const user = db.doc('users_test/alfredo_account');
    //const doc = await user.get();

    const doc = await db.collection('users_test').doc('alfredo').collection('contacts').doc('dd').get();
    
    retrieves each contact name in the contact list
    doc.forEach(collection => {
        console.log('Found subcollection with id:', collection.id);
      });
      

    console.log(doc.data());
    */
    


});

app.post('/emergency', async(req, res)=>{

    latitude = req.body.latitude;
    longitude = req.body.longitude;

    console.log(`server has recieved latitude:${latitude} and longitude: ${longitude}`);
    res.send({latitude,longitude});
});

app.post('/pushtest', async(req, res)=>{

    const message = {
        notification: {
          title: 'Notification Title',
          body: 'Notification Body',
        },
        token: 'device-token',
      };
      
      admin.messaging().send(message)
        .then((response) => {
          console.log('Successfully sent notification:', response);
        })
        .catch((error) => {
          console.error('Error sending notification:', error);
        });
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











app.get('/test/:token/',(req, res) =>{
    console.log(req.params);
});

*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


