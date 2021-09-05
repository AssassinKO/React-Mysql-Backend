const jwt = require('jsonwebtoken');
const { auth } = require('../config/index');
const { validationResult } = require('express-validator');

const User = require('../models').User;

const getExpTime = (timestamp) => {
    return  (24 * 60 * 60 * 1000)  + timestamp
}

const tokenForUser = (user) => {
    const timestamp = new Date().getTime()

    return jwt.sign({sub: user.email, iat: timestamp, id: user.id, exp: getExpTime(timestamp), role: user.role}, auth.jwt.secret)
}

exports.signin = (req, res, next) => {
    let token = tokenForUser(req.user);
    res.send({token})
}

exports.create = (req, res, next) => {

    const errors = validationResult(req);

    console.log("errors", errors);

    if (!errors.isEmpty()) {
        return next({errors: errors.array(), status: 422 });
    }

    const fullName = req.body.fullName
    const email = req.body.email
    let gender = req.body.gender
    gender = gender.toLocaleLowerCase();
    const password = req.body.password
  
    if (!email || !password || !fullName || !gender) {
        return res.status(422).send({error: "You must provide email, gender and password"})
    }
    if(gender != 'male' && gender != 'female' && gender != 'other' ) {
        return res.status(422).send({error: "You must provide correct gender"})
    }
  
    User.findOne({where: {email}}).then(existingUser => {
        if (existingUser) {
          return res.status(422).send({error: 'Login is in use'})
        }
  
        User.create({id: 0, email,password, fullName, gender})
        .then(user => res.json({token: tokenForUser(user)}))
        .catch(e => next(e))
      })
}

exports.getProfile = (req, res, next) => {
    const user = req.user
    return res.send({
        id: user.id,
        fullName: user.fullName,
        gender: user.gender,
        createdAt: user.createdAt,
        email: user.email,
        role: user.role
    })
}
