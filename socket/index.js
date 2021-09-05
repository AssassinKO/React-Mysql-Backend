// import controllers and modules
const WatchingHistory = require('../controllers/watching-history')
const PopupCtr = require('../controllers/popup-history')

const { socketPassport } = require('../libs/passport');
const { POPUP_TIME_MAX } = require('../config');
const { VIDEO_START_PLAYING, VIDEO_END_VIDEO, POPUP_DESTROY, POPUP_PUSH, POPUP_NOT_PUSHED } = require('./types');

/**
 * 
 * @param {second} min 
 * @param {second} max 
 * @returns {random secs as milisecs}
 * @description this func is for getting random time by milisecs
 */
function getRndInteger(min, max) {
    return (Math.floor(Math.random() * (max - min) ) + min) * 1000;
}

// send data to popup message to a user
const emitPopupMessage = (socket, watchId) => {
    const delaySec = getRndInteger(12, 15);
    // delay for random time
    setTimeout(()=> {
        if (socket.connected) { // check connection status
            console.log("sending popup..............");
            PopupCtr
                ._createLog(watchId)
                .then((recode) => {
                    console.log("PUSH_POPUP id: ", recode.id)
                    socket.emit(POPUP_PUSH, watchId, recode.id)
                })
                .catch((error) => {
                    console.error("emitPopupMessage error: ", error)
                })
                // .finally(() => {
                //     emitPopupMessage(socket, watchId, count--);
                // })
        }
    }, delaySec);
}

const connection = (app, io) => {
    // socket middle ware to check authorization
    io.use(socketPassport.jwtLogin)

    io.on('connection', function (socket) {
        socket.on('disconnecting', (reason) => {
            console.log(`${socket.request.user.email} is disconnecting`);
        });
        socket.on('disconnect', () => {
            console.log(`${socket.request.user.email} has been disconnected`);
        })

        // watching
        /**
         * @param videoId  @description id of video
         */
        socket.on(VIDEO_START_PLAYING, (videoId) => { // playing video handler
            console.log("PLAYING_VIDEO.....................");

            const {id} = socket.request.user;
            const result = WatchingHistory._createOne(id,videoId); // create watching history
            result
                .then((res) => {
                    const { id } = res.watchingHistory
                    console.log("watchingHistory: ", id);
                    emitPopupMessage(socket, id); // emit popup data to user by this fuc call
                })
                .catch(err => {
                    console.error(err)
                })
        });

        socket.on(VIDEO_END_VIDEO, (watchId) => { // end video event handler
            console.log("VIDEO_END_VIDEO");
            WatchingHistory
                ._makeEnd(watchId)
                .then(result => {
                    console.log('result: ',  result);
                    console.log(`email: ${socket.request.user.email}, user has finished`);
                })
                .catch(err => {
                    console.error(`error email: ${socket.request.user.email} on update video finished \n error: ${err}`);
                })
        });
        socket.on(POPUP_NOT_PUSHED, (popupId) => { // we dont use this for now
            console.log("POPUP_NOT_PUSHED popupId", popupId);

            PopupCtr
                ._removeOne(popupId)
                .then((result) => {
                    console.log("isClicked", result);
                })
                .catch((err) => {
                    console.error("DISTRORY_POPUP error", err);
                })
        })

        socket.on(POPUP_DESTROY, (watchid, popupId, isClicked) => { // event handler to get clicked status
            console.log("DISTRORY_POPUP...")
            if (isClicked) { // if user clicked button, update as clicked
                PopupCtr
                    ._makeClicked(popupId)
                    .then((result) => {
                        console.log("isClicked", result); // just for logging.
                    })
                    .catch((err) => {
                        console.error("DISTRORY_POPUP error", err); // just for logging.
                    })
            } else {
                console.error(`email: ${socket.request.user.email} didnt click button`); // just for logging.
            }
            emitPopupMessage(socket, watchid) // send popup event again
        })
    })
}

module.exports = connection
