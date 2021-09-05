const path = require('path')

const auth = require('./auth');
const video = require('./video');
const watchingHistory = require('./watching-history');
const popupHistory = require('./popup-history');
const user = require('./user');


function router(app) {
    app.get('/public/*', (req, res) => {
        res.download(path.join(__dirname, '..',req.url));
    });

    app.use('/apis/auth', auth);
    app.use('/apis/videos', video);
    app.use('/apis/watch-histories', watchingHistory);
    app.use('/apis/popup-histories', popupHistory);
    app.use('/apis/users', user);

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
    });
}

module.exports = router