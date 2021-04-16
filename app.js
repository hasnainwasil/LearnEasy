const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
//const Datastore=require('nedb');//database
const Register = require("./js/registers");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/StarAgile');
var db=mongoose.connection;

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/email",function(req, res){

		let transporter = nodemailer.createTransport({
				    host: "smtp.gmail.com",
				    port: 587,
				    secure: false, // true for 465, false for other ports
				    auth: {
				      user: 'ayushsinghgaurav8@gmail.com', // generated ethereal user
				      pass: 'Ayushsingh987', // generated ethereal password
				    },
				  });

		const output = `
			
			<h4>Hello ${req.body.name},</h4>
			<br>
			<body>We appreciate your time, our technical team will contact you soon.</body>
			<br>
			<body>StarAgile</body>

			`; //changed
			// <li>Email: ${req.body.email}</li>
			// <li>Body: ${req.body.message}</li>

				  // send mail with defined transport object
				  let info = transporter.sendMail({
				    from: '"STARAGILE" <ayushsinghgaurav8@gmail.com>', // sender address
				    to: `${req.body.email}`, // list of receivers
				    subject: "No Reply || StarAgile", // Subject line
				    text: "Hello world?", // plain text body
				    html: output // html body
				  });

				  console.log("Message sent: %s", info.messageId);

				  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

				res.render("index");
				console.log(" Email Sent ");
});

app.get("/",function(req,res){
	res.render("index");
});

app.get("/signup",function(req,res){
	res.render("signup")
});

app.post("/login", async(req,res)=>{
	// try{
	// 	var email= req.body.email;
	// 	var password= req.body.password;

	// 	console.log(`${email} and ${password}`);

	// 	const username = db.collection('StarAgile').findOne({email});
	// 	console.log(username);
	// 	if(username.password === password){
	// 		res.render("index");
	// 		console.login("SUCESSFUL LOGIN")
	// 	}else{
	// 		res.send("Password Incorrect");
	// 	}

	// } catch (error) {
	// 	res.status(400).send("Invalid Email")
	// }

	// const {username, password} = req.body;
	// const user = await User.findOne({username , password}).lean();
	// if(password === user.password){
		console.log("SUCESSFUL LOGIN");
	// }
});

app.post("/register", async(req,res)=>{
	var name=req.body.name;
	var email=req.body.email;
	var password=req.body.password;

	var data = {
		"name" : name,
		"email" : email,
		"password" : password
	}

	db.collection('users').insertOne(data,(err,collection)=>{
		if(err){
			throw err;

		} 
		console.log("Record Inserted SUCESSFUL");
	});

	return res.render('index');
})

var PORT = process.env.PORT || 5000;

app.listen(PORT, function(){
	console.log("Server Has Started");
});