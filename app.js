const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const Datastore=require('nedb');//database

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));


app.get("/",function(req,res){
	res.render("index");
})

app.listen(5000, function(){
	console.log("Server Has Started");
});