const express = require("express");
const bodyParser = require('body-parser');
const passport = require("passport");
const user = require("../models/users");


const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));


router.get('/', (req, res, next)=>{
	res.redirect("/");
})

router.post('/login', passport.authenticate("local"), (req, res, next)=>{
	// res.statusCode = 302;
	res.redirect("/");
})

router.get('/logout', (req, res) => {
	if (req.session) {
	  req.session.destroy();
	  res.clearCookie('session-id');
	  res.redirect('/');
	}
	else {
	  var err = new Error('You are not logged in!');
	  err.status = 403;
	  res.json({"Error": "You are not logged in"});
	}
 });


//  router.post('/signup', (req, res, next) => {
// 	user.register(new user({username: req.body.username, admin: false}), 
// 	  req.body.password, (err, user) => {
// 	  if(err) {
// 		 res.statusCode = 500;
// 		 res.setHeader('Content-Type', 'application/json');
// 		 res.json({err: err});
// 	  }
// 	  else {
// 		 passport.authenticate('local')(req, res, () => {
// 			res.statusCode = 200;
// 			res.setHeader('Content-Type', 'application/json');
// 			res.json({success: true, status: 'Registration Successful!'});
// 		 });
// 	  }
// 	});
//  });


module.exports = router;