const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const db = knex({
  client: 'pg', 
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'kbosedbl',
    database : 'mycompilerusers'
  }
});
db.select('*').from('mycompilerusers');
router.post(('/') , (req , res) => {
	const {email,password,firstName,lastName} = req. body;
	const hash = bcrypt.hashSync(password);
	db('users')
		.returning('*')
		.insert({
			email: email,
			firstname: firstName,
			password: hash,
			lastname: lastName
		})
		.then(user => {
			console.log('Successfull registration');
			res.json("Registered Successfully");
		})
		.catch(err => {
			console.log(err);
			res.json("Registration failed");
		})
});


module.exports = router;
