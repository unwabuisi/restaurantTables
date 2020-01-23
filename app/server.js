// Dependencies
const express = require("express");
const http = require('http');
const path = require('path');
const nodemailer = require('nodemailer');
const mysql = require('mysql');

// Set up Express App
var app = express();
const PORT = process.env.PORT || 3000;

// Set up Express app to handle data parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// Users at table
var users = [];
var waitinglist = [];

// Functions
function sendEmail (email,name,partySize) {

    // Uses Ethereal Mailer to log messages; emails are not actually delivered
    const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'scottie44@ethereal.email',
        pass: 'xMr6XU6bsatgbxPvfQ'
        }
    });

    var mailOptions = {
      from: 'scottie44@ethereal.email',
      to: email,
      subject: `${name} your table for ${partySize} is ready!`,
      text: `Please come by and see your host!`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
}


// Routes
app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"/../home.html"));
});

app.get("/tables", function(req,res){
    res.sendFile(path.join(__dirname,"/../tables.html"));
});

app.get("/reservations", function(req,res){
    res.sendFile(path.join(__dirname,"/../reservations.html"));
});

app.get("/api/tables", function(req,res){
    res.json(users);
});

app.get("/api/waitlist", function(req,res){
    res.json(waitinglist);
});

app.get("/api/clear", function(req,res){
    users = [];
    for (var i = 0; i < waitinglist.length; i++) {
        users [i] = waitinglist[i];
    }
    waitinglist = [];
    res.sendFile(path.join(__dirname,"/../tables.html"));
});

app.post("/api/new", function(req,res){
    var newUser = req.body;
    newUser.routeName = newUser.name.replace(/\s+/g,"").toLowerCase();
    if (users.length > 4) {
        waitinglist.push(newUser);
    }
    else {
        users.push(newUser);
    }
    res.end();
});

app.post("/api/del", function(req,res){
    var index = req.body.index;
    var list = req.body.list;

    if (list == "t") { // deletes users from the seated tables
        users.splice(index, 1);
        if (users.length < 5 && waitinglist.length != 0) {
            users.push(waitinglist[0]);
            waitinglist.splice(0,1);
        }
        res.redirect('back');
    }
    else if (list == "w") { // deletes uers from the waitlist
        waitinglist.splice(index, 1);
        res.redirect('back');
    }

});

app.post("/api/email", function(req,res){
    var index = req.body.index;
    var emailAddress = waitinglist[index].emailAddress;
    var name = waitinglist[index].name;
    var partySize = waitinglist[index].partysize;

    console.log(`Sending email to ${emailAddress}`);
    sendEmail(emailAddress, name, partySize);
    res.end();
});

app.post("/api/sms", function(req,res){
    var index = req.body.index;
    var emailAddress = users[index].emailAddress;
    var name = users[index].name;
    var partySize = users[index].partysize;

    console.log(`Sending email to ${emailAddress}`);
    sendEmail(emailAddress, name, partySize);
    res.end();
});























// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});