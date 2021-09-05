const Video = require('../models').Video;
const { getFileName } = require('../libs/helpers/files');
const BaseController = require('./controller');

class VideoController extends BaseController {
    constructor() {
        super(Video);
    }
    create = (req, res, next) => {
        let files = req.files;
        let fileName, filePath;
        const title = req.body.title

        try {
            fileName = files[0].filename;
            filePath = files[0].path;

            Video.findOne({where: {title}}).then(existingData => {
                if (existingData) {
                return res.status(422).send({error: 'Same title is in use'})
                }
                Video.create({
                    title,
                    videoId: getFileName(fileName),
                    src: filePath
                })
                    .then(video => res.json({
                        success: true,
                        video: video
                    }))
                    .catch(err => {
                        console.error(err);
                    })
            })
        } catch (error) {
            var errorMessage = 'Somthing went wrong' + error + "\n please try after";
            return res.status(500).send({error: errorMessage })
        }
    }

    update = (req, res, next) => {
        let files = req.files;
        let  fileName, filePath;
        const title = req.body.title;
        const id = req.params.id;
    
        try {
            let data = {};
            data.title = title;
            if(files && files[0]) {
                fileName = files[0].filename;
                filePath = files[0].path;
                data.videoId = getFileName(fileName)
                data.src = filePath
            }
    
            Video.update(data, {
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

    readAll = (req, res) => {
        let { page, perPage } = req.query;
    
        if (!page) {
            page = 1
        }
        if (!perPage || perPage === 'undefined') {
            perPage = 1000
        }
    
        try {
            Video
                .findAll({
                    order: [['updatedAt', 'DESC']],
                })
                .then(videos => {
                    const totalPages = Math.ceil(videos.length / perPage)
                    let calculatedPage = (page - 1) * perPage;
                    let calculatedPerPage = page * perPage;
    
                    res.json({
                        success: true,
                        videos: videos.slice(calculatedPage, calculatedPerPage),
                        totalPages,
                        totalCount: videos.length
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

    removeVideo = (req, res, next) => {
        // video is removed by cron job
        const id = req.params.id;
        if(isNaN(id)) {
            res.status(422).send({error: 'Id is wrong type'})
        }
        Video
            .update({ videoId: '',src: ''}, {
                where: {
                    id: id,
                }
            })
            .then(status => {
                const updatedCount = status[0]
    
                if (updatedCount == 0) {
                    return res.status(422).send({error: "Please provide correct Id"})
                }
    
                res.json({
                    success: true,
                })
            })
            .catch(e => {
                res.status(422).send({error: "Wrong id or try after"})
            })
        // 
    }
}

module.exports = new VideoController()
