const mongoose = require("mongoose");
mongoose.connect('mongoose://localhost/StarAgile');

const StarAgile = new mongoose.Schema({
	name : {
		type: String,
		required:true
	},
	email : {
		type: String,
		required:true,
		unique:true
	},
	password : {
		type: String,
		required:true
	}
})

const Register = new mongoose.model("Register", StarAgile);

module.exports = Register;