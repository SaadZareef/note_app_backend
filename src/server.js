const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Note = require('./models/Note');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://Saad_Zarif:ittifaaq@cluster0.6uidllg.mongodb.net/notesdb").then(function () {
    app.get('/', function (req,res) {
        res.send("This is the Home Page.");
        
    });
    // app.get("/notes/list/:userid",async function(req,res){
    //     var notes =await Note.find({userid:req.params.userid});

    //     res.json(notes);
    // });    
    app.post("/notes/list",async function(req,res){
        var notes =await Note.find({userid:req.body.userid});

        res.json(notes);
    });    
    // app.get('/notes/add',async function (req,res) {
    //     var newnote = new Note({
    //         id:"001",
    //         userid:"saad.zareef1212@gmail.com",
    //         title:"My first note",
    //         content:"This is content"
    //     });
    //     await newnote.save();
    //     const response = {message:"New Note Created"};
    //     res.json(response);
    // });
    app.post('/notes/add',async function (req,res) {
       await Note.deleteOne({id:req.body.id});
             const newnote = new Note({
            id:req.body.id,
            userid:req.body.userid,
            title:req.body.title,
            content:req.body.content
        });
        await newnote.save();
        const response = {message:"New Note Created"};
        res.json(response);
    });
    app.post('/notes/delete',async function(req,res){
        await Note.deleteOne({id:req.body.id});
        const response = {message:"Note Deleted "+`id: ${req.body.id}`};
        res.json(response);
    });
});
const PORT = process.env.PORT||5000;
app.listen(PORT,function () {
    console.log("Server Started at PORT"+PORT);
});