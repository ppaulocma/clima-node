const services = require('./service');

const getIndex = async (req, res, next) => {
    try {
        res.contentType('text/html')
        res.render('index');
        next();
    } catch(e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

module.exports = {
    getIndex
};