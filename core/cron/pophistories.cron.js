const CronJob = require('cron').CronJob;

const PopupHistory = require('../../models').PopupHistory;

const deleteNotPusedHistory = () => {
    
    // cron job per hour
    // let job = new CronJob('* 1 * * * *', async function () {
    //     console.log("running deleteVideoFiles cron job");
    //     try {
    //         PopupHistory
    //             .destroy({
    //                 where: {
    //                     isNotPused: 0
    //                 }
    //             })
    //             .then((result) => {
    //                 console.log("removed not pused popups", result);
    //             })
    //             .catch((err) => {
    //                 console.error("removing not pused popups error: ", err);
    //             })

    //     } catch (err) {
    //         console.log(err);
    //     };
    // }, null, true, 'America/Los_Angeles');

    // job.start();
};

module.exports = deleteNotPusedHistory;