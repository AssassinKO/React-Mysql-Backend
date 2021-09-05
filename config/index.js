const DBconfig = require('../db/config/config.json')

const auth = {
    jwt: { secret: process.env.JWT_SECRET || '123456' }
};
const env = process.env.NODE_ENV || 'development';

module.exports = {
    auth: auth,
    env: process.env.NODE_ENV || 'development',
    DatabaseConfig: DBconfig[env],
    videoUploadDir: './public/videos',
    SOCKERT_PORT: 3030,
    POPUP_TIME_MIN: 5,
    POPUP_TIME_MAX: 10
}