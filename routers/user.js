const express = require('express');
// const { check, query, body, param } = require('express-validator');
const router = express.Router();
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session : false })
const requireSignin = passport.authenticate('local', { session : false })

const User = require('../controllers/user');
const Auth = require('../controllers/auth');

router.post(
    '/',
    requireAuth,
    Auth.create
)

router.put(
    '/:id/update',
    requireAuth,
    User.update
)

router.delete(
    '/:id',
    requireAuth,
    User.delete
)

router.get(
    '/',
    User.readAll
)

router.get(
    '/:id',
    User.readOne
)

module.exports = router;
