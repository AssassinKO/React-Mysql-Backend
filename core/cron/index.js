const videoDeleteCrone = require('./delete-static-assets/deleteVideos')
const pophistoriesDeleteCrone = require('./pophistories.cron')

function cronJobStart() {

    videoDeleteCrone();
    pophistoriesDeleteCrone()
}

module.exports = cronJobStart;