class BaseController{
    Model
    constructor(Model) {
        this.Model = Model;
    }

    create = () => {}

    update = () => {}

    delete = (req, res, next) => {
        const id = req.params.id;
         if(!id || id == 'undefined') {
            return res.status(422).send({error: 'Please provide correct id' })
        }
        this.Model
            .destroy({
                where: {
                    id: id,
                }
            })
                .then(status => {
                    console.log("status", status);
                    return res.json({
                        success: true,
                    })
                })
                .catch(err => {
                    console.error(err);
                    const errorMessage = 'Somthing went wrong' + error + "\n please try after";
                    return res.status(500).send({error: errorMessage })
                })
    }

    readAll = (req, res, next) => {
        this.Model
            .findAll()
            .then(data => {
                return res.json({
                    data: data
                })
            })
            .catch(error => {
                errorMessage = 'Somthing went wrong' + error + "\n please try after";
                return res.status(500).send({error: errorMessage })
            })
    }

    readOne = (req, res, next) => {
        const id = req.params.id;
    
        if(isNaN(id)) {
            res.status(422).send({error: 'Id is wrong type'})
        }
    
        this.Model
            .findOne({
                where: {
                    id: id
                }
            })
            .then(record => {
                res.json({
                    success: true,
                    data: record
                })
            })
            .catch(e => {
                res.status(422).send({error: "Wrong id or try after error: " + e})
            })
    }

    getTotalCount =  async()  => {
        const totalRecodes = await this.Model.findAll();
        return totalRecodes.length;
    }
    getCount = async(where = {}) => {
        const totalRecodes = await this.Model.findAll({where});
        return totalRecodes.length;
    }
}

module.exports = BaseController