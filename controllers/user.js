const User = require('../models').User;
const BaseController = require('./controller');

class UserController extends BaseController {
    constructor() {
        super(User);
    }

    readAll = (req, res) => {
        let { page, perPage } = req.query;
    
        if (!page) {
            page = 1
        }
        if (!perPage || perPage === 'undefined') {
            perPage = 1000
        }
    
        try {
            User
                .findAll({
                    order: [['updatedAt', 'DESC']],
                    where: {
                        role: 'USER'
                    }
                })
                .then(recodes => {
                    const totalPages = Math.ceil(recodes.length / perPage)
                    let calculatedPage = (page - 1) * perPage;
                    let calculatedPerPage = page * perPage;
                    let users = recodes.slice(calculatedPage, calculatedPerPage);

                    users = users.map((user) =>  {
                        const {id, fullName, email, gender, role, createdAt, updatedAt } = JSON.parse(JSON.stringify(user))
                        return {
                            id, fullName, email, gender, role, createdAt, updatedAt
                        }
                    }),

                    res.json({
                        success: true,
                        users: users,
                        totalPages,
                        totalCount: recodes.length
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        } catch (error) {
            var errorMessage = 'Somthing went wrong' + error + "\n please try after";
            return res.status(500).send({error: errorMessage })
        }
    }

    update = (req, res) => {
        const id = req.params.id;
        const { fullName, gender, email, password } = req.body
        try {
            let data = {};
            if(fullName) {
                data.fullName = fullName
            }
            if(gender) {
                data.gender = gender
            }
            if(email) {
                data.email = email
            }
            if(password) {
                data.password = password
            }
    
            User.update(data, {
                where: {
                    id: id,
                }
            })
                .then(status => {
                    const updatedCount = status[0]
                    if (updatedCount == 0) {
                        return res.status(422).send({error: "Please provide correct Id"})
                    }
                    return res.json({
                        success: true,
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        } catch (error) {
            var errorMessage = 'Somthing went wrong' + error + "\n please try after";
            return res.status(500).send({error: errorMessage })
        }
    }
}

module.exports = new UserController