const PopupHistory = require('../models').PopupHistory;
const BaseController = require('./controller');


class PopUpHistoryController extends BaseController{
    constructor() {
        super(PopupHistory);
    }

    readByWatchId = function (req, res, next) {
        return {

        }
    }

    _createLog = (watchingId) => {
        if(watchingId) {
            return PopupHistory.create({watchingId: watchingId})
        } else {
            return new Error("invalid watchingId")
        }
    }

    _makeClicked = (id) => {
        return PopupHistory.update({isClicked: 1}, {
            where: {
                id: id
            }
        })
    }

    _removeOne = (id) => {
        return PopupHistory.destroy({
                    where: {
                        id: id
                    }
                })
    }
}

module.exports = new PopUpHistoryController();
