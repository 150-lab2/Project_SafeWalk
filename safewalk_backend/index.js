const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const {getFirestore, Filter, Where} = require('firebase-admin/firestore');


const {db, sendFirebaseMessage} = require("./config.js")
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


});


//emergency will grab the location of the user, it will search the contacts of the user and send those users a push notification
app.post('/emergency', async(req, res)=>{

    latitude = req.body.latitude;
    longitude = req.body.longitude;

    const username = req.body.username;

    //all tokens and message data is sent in this json.
    const message = {
        notification: {
            title: 'EMERGENCY',
            body: 'Your friend is in trouble',
        },
        data: {
            longitude: longitude,
            latitude: latitude,
        },
        token: registrationToken,
    };

    sendFirebaseMessage(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
            res.send('Successfully sent message');
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            res.status(500).send('Error sending message');
        });

    

    console.log(`server has recieved latitude:${latitude} and longitude: ${longitude}`);
    res.send({latitude,longitude});
});


//this will take in a token and the username who has that token
//I will insert the token into the the database of the user who logged in.

app.post('/pushToken', async (req, res) => {

    const registrationToken = req.body.token;
    const username = req.body.username;

    //will insert the registratin token to the user.
    
});











app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


