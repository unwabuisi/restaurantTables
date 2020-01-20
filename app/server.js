// Dependencies
const express = require("express");
const http = require('http');
const path = require('path');

// Set up Express App
var app = express();
const PORT = process.env.PORT || 3000;

// Set up Express app to handle data parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// Users at table
var users = [];
var waitinglist = [];


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
    var userToDelete = req.body;
    users.splice(userToDelete, 1);
    if (users.length < 5 && waitinglist.length != 0) {
        users.push(waitinglist[0]);
        waitinglist.splice(0,1);
    }
    res.redirect('back');
});























// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});