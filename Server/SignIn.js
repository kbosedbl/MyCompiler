const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const jwt = require('jsonwebtoken');
const configs = require('./configs/default');
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
router.post('/' , (req, res) =>{
	db.select('email','password').from('users')
		.where('email' , '=' , req.body.email)
		.then(data => {
			const isValid = bcrypt.compareSync(req.body.password , data[0].password);
			console.log(isValid);
			if(isValid){
				return db.select('*').from('users')
					.where('email','=',req.body.email)
					.then(user => {
						console.log(user[0]);
						const token = jwt.sign({
							id: user[0].id,
							firstname: user[0].firstname,
							lastname: user[0].lastname,
							email: user[0].email							
						} , 
						configs.secret,
						{
							expiresIn: '3h'
						});						
						return res.status(200).json({
							message: 'Auth Successful',
							token: token
						});
					})
					.catch(err =>{ 
						res.status(500).json('Incorrect');
						console.log(err);
					});
			}
			else{
				res.status(400).json('Wrong Information');
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json('Incorrect');
		});
})

module.exports = router;