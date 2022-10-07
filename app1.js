const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8089;
const myObj=require('./users');

const bodyParser = require('body-parser');
const { urlencoded } = require('express');

app.use(express.static(__dirname + '/Demo1'));

app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>');
})


//Pattern Matching
app.get('/ab+de', (req, res) => {
    res.send('<h1>WWE</h1>');
})

app.get('/ab?cd', (req, res) => {
    res.send('<h1>WWE</h1>');
})

app.get(/z/, (req, res) => {
    res.send('<h1>zzzzz</h1>');
})
//

//Multiple Callbacks
app.get('/users/:id/:val', (req, res, next) => {
    res.send('<h1>Welcome</h1>');
    console.log('Welcome');
    console.log(req.params.val);
    next();
},
    (req, res, next) => {
        console.log(`First Callback:${req.params.id}`);
        next();
    },
    (req, res, next) => {
        console.log(`Second Callback:${req.params.val}`);
    })

//Sending File
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
//POST
app.use(bodyParser.urlencoded({ extended: true }))
app.post('/index1', (req, res) => {
    console.log(req.body);
    res.send(`Done User:${req.body.user} Id:${req.body.id}`);
})



//DELETE
app.delete('/users2/:id', (req, res) => {
    const id = req.params.id;
    console.log("deleted:" + id);
    res.send({ status: 'done', id: id });
})
//PUT
app.put('/users2/:id', (req, res) => {
    const id = req.params.id;
    console.log("Updated:" + id);
    res.send({ status: 'done', id: id });
})


app.get('/getUser/:id', (req, res) => {
    const myId=req.params.id;
    let myJson=[];
    if(myObj.user.some((ele)=>ele.id==myId))
    {
        myJson = myObj.user.filter((ele)=>ele.id==myId)
    }
    res.json(myJson);
})



app.listen(port, () => {
    console.log(`Ready to Listen at ${port}`);
})