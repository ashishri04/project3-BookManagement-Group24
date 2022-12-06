const express = require('express');
const route = require('./routes/route')
const mongoose = require('mongoose')
const multer= require("multer");
const app = express();

//const { AppConfig } = require('aws-sdk');

app.use( multer().any())

app.use(express.json())

mongoose.connect("mongodb+srv://chanda:QYho3EZNKLny4znA@cluster0.gkrjc46.mongodb.net/group24Database",{useNewUrlParser:true})

.then(()=>console.log("mongodb connected"))
.catch(err => console.log(err))

app.use('/',route)



app.listen(process.env.PORT || 3000,function(){
    console.log('express app running on port '+ (process.env.PORT || 3000))
})

