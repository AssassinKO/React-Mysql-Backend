const express = require('express');
const { check, query, body, param } = require('express-validator');
const router = express.Router();
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session : false })

const popupHistory = require('../controllers/popup-history');

router.delete(
    '/:id',
    requireAuth,
    popupHistory.delete
)

router.get(
    '/:watchId',
    popupHistory.readByWatchId
)

module.exports = router;
