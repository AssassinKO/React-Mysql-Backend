const CronJob = require('cron').CronJob;
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const { videoUploadDir } = require('../../../config');
const { getFileName } = require('../../../libs/helpers/files');
const VideoModel = require('../../../models').Video;


const readFileAsync = promisify(fs.readdir);
const deleteFileAsync = promisify(fs.unlink);

const deleteVideoFiles = () => {
    
    // cron job per hour
    let job = new CronJob('* * * 7 * *', async function () {
        console.log("running deleteVideoFiles cron job");
        try {
            const files = await readFileAsync(videoUploadDir);

            const promise = files.map(async (file) => {
                const existOnVideo = await VideoModel.findOne({
                    where: {
                        videoId: getFileName(file)
                    },
                    raw: true
                });

                const filePath = path.join(videoUploadDir, file)
                if (!existOnVideo) {
                    if (fs.existsSync(filePath)) {
                        await deleteFileAsync(filePath);
                    }
                    console.log(`${filePath} has been deleted.`);
                } else {
                    console.log(`${filePath} is being used.`);
                };
            });

            const resolve = await Promise.all(promise);

        } catch (err) {
            console.log(err);
        };
    }, null, true, 'America/Los_Angeles');

    job.start();
};

module.exports = deleteVideoFiles;