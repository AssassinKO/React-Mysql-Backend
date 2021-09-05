const express = require('express');
const { check, query, body, param } = require('express-validator');
const router = express.Router();
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session : false })
const requireSignin = passport.authenticate('local', { session : false })

const Auth = require('../controllers/auth');

// Auth--------------------------------------------
router.post(
	'/login', 
	[
		check('email').optional({nullable : false}).normalizeEmail({
				gmail_remove_dots: false,
				gmail_convert_googlemaildotcom: false,
				yahoo_remove_subaddress: false
			}).isEmail().isLength({min:0, max: 40}),
		check('password').isLength({ min: 5 })
	],
	requireSignin,
	Auth.signin
)

router.post('/register',  [
	body('fullName').isString().optional({nullable: false}).isLength({min:3, max: 50}),
	body('password').optional({nullable : false}).isLength({min:5, max: 40}),
	body('gender').optional({nullable : false}).isString().isLength({min: 4, max: 10}),
	body('email').optional({nullable : false, checkFalsy: false}).normalizeEmail({
		gmail_remove_dots: false,
		gmail_convert_googlemaildotcom: false,
		yahoo_remove_subaddress: false,
		gmail_lowercase: true,
	}).isEmail().isLength({min:0, max: 40})
], Auth.create);

router.get('/profile', requireAuth, Auth.getProfile)

module.exports = router;
