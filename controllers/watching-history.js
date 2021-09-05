const WatchingHistory = require('../models').WatchingHistory;
const User = require('../models').User;
const Video = require('../models').Video;
const PopupHistory = require('../models').PopupHistory;

const BaseController = require('./controller');

class WatchingHistoryController extends BaseController{
    constructor() {
        super(WatchingHistory);
    }

    create = async (req, res, next) => {
        const userId = req.params.userId;
        const videoId = req.body.videoId;

        try {
            const user = await User.findOne({
                attributes: ['id'],
                where: {
                    id: userId,
                    deletedAt: null
                },
                raw: true
            });
            if(!user) {
                return res.status(422).send({error: "Incorrect User" })
            }
            const video = await Video.findOne({
                attributes: ['id'],
                where: {
                    id: videoId,
                    deletedAt: null
                },
                raw: true
            });
            if(!video) {
                return res.status(422).send({error: "Incorrect Video" })
            }
            
            WatchingHistory
                .create({
                    userId,
                    videoId,
                    isFinished: 0
                })
                .then(watchingHistory => res.json({
                    success: true,
                    watchingHistory: watchingHistory
                }))
                .catch(err => {
                    console.error(err);
                })
        } catch (error) {
            const errorMessage = 'Somthing went wrong' + error + "\n please try after";
            return res.status(500).send({error: errorMessage })
        }
    }
    
    makeFinished = (req, res, next) => {
        const id = req.params.id;
    
        try {
            this._makeEnd(id)
                .then(status => {
                    return res.json({
                        success: true,
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        } catch (error) {
            const errorMessage = 'Somthing went wrong' + error + "\n please try after";
            return res.status(500).send({error: errorMessage })
        }
    }

    readAll = (req, res) => {
        let { page, perPage, userId } = req.query;

        if (!page) {
            page = 1
        }
        if (!perPage || perPage === 'undefined') {
            perPage = 1000
        }

        try {
            let calculatedPage = (page - 1) * perPage;
            let queryOption = {
                attributes: ['id', 'isFinished', 'createdAt',  'updatedAt'],
                include: [
                    { model: User, as: 'user'},
                    { model: Video, as: 'video'},
                    { model: PopupHistory, as: 'popupHistories'}
                ],
                order: [['updatedAt', 'DESC']],
                limit: parseInt(perPage),
                offset: parseInt(calculatedPage)
            }
            let where = {}

            if(userId) {
                where = {
                    userId: userId
                }
            }

            WatchingHistory
                .findAll({
                    ...queryOption,
                    where
                })
                .then(async(histories) => {
                    let count = await this.getCount(where)

                    res.json({
                        success: true,
                        data: histories,
                        totalPages: Math.ceil(count / perPage)
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        } catch (error) {
            const errorMessage = 'Somthing went wrong' + error + "\n please try after";
            return res.status(500).send({error: errorMessage })
        }
    }

    readOne = (req, res) => {
        const id = req.params.id;
        WatchingHistory
                .findOne({
                    where: {
                        id
                    },
                    attributes: ['id', 'isFinished', 'createdAt',  'updatedAt'],
                    include: [
                        { model: User, as: 'user'},
                        { model: Video, as: 'video'},
                        { model: PopupHistory, as: 'popupHistories'},
                    ],
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

    _createOne = async (userId, videoId) => {
        return new Promise(async (resolve, rejected) => {
            try {
                const user = await User.findOne({
                    attributes: ['id'],
                    where: {
                        id: userId,
                        deletedAt: null
                    },
                    raw: true
                });
                if(!user) {
                    return rejected({error: "Incorrect User" })
                }
                const video = await Video.findOne({
                    attributes: ['id'],
                    where: {
                        id: videoId,
                        deletedAt: null
                    },
                    raw: true
                });

                if(!video) {
                    return rejected({error: "Incorrect Video" })
                }
                
                WatchingHistory.create({
                    userId,
                    videoId,
                    isFinished: 0
                })
                    .then(watchingHistory => resolve({
                        success: true,
                        watchingHistory: watchingHistory
                    }))
                    .catch(err => {
                        console.error(err);
                    })
            } catch (error) {
                const errorMessage = 'Somthing went wrong' + error + "\n please try after";
                return rejected({error: errorMessage })
            }
        })
    }
    _makeEnd = (id) => {
        return WatchingHistory
            .update({isFinished: 1}, {
                where: {
                    id
                }
            })
    }
}

module.exports = new WatchingHistoryController();
