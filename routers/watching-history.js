const express = require('express');
const { check, query, body, param } = require('express-validator');
const router = express.Router();
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session : false })
const requireSignin = passport.authenticate('local', { session : false })

const WatchingHistory = require('../controllers/watching-history');

// router.put(
//     '/:id/update',
//     WatchingHistory.update
// )

router.delete(
    '/:id',
    requireAuth,
    WatchingHistory.delete
)

router.get(
    '/',
    WatchingHistory.readAll
)

router.get(
    '/:id',
    WatchingHistory.readOne
)

module.exports = router;
