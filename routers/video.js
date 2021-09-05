const express = require('express');
const { check, query, body, param } = require('express-validator');
const multer = require('multer');
const crypto = require('crypto');
const router = express.Router();
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', { session : false })
const requireSignin = passport.authenticate('local', { session : false })

const Video = require('../controllers/video');
const { videoUploadDir } = require('../config/index');

var storage = multer.diskStorage({
    destination: videoUploadDir,
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return cb(err);
            const ext = file.mimetype ? ('.' + file.mimetype.split('/')[1]) : "underfind"
            cb(null, raw.toString('hex') + ext);
        })
    }
})

var upload = multer({ storage: storage });

router.post(
    '/',
    function (req, res, next) {
        next()
    }, 
    upload.array('file') ,
    requireAuth,
    Video.create
)

router.put(
    '/:id/update',
    function (req, res, next) {
        next()
    }, 
    upload.array('file'),
    requireAuth,
    Video.update
)

router.delete(
    '/:id',
    requireAuth,
    Video.delete
)

router.delete(
    '/:id/video',
    requireAuth,
    Video.removeVideo
)

router.get(
    '/',
    Video.readAll
)

router.get(
    '/:id',
    Video.readOne
)

module.exports = router;
