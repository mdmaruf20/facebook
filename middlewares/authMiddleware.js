const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) throw new Error();

        const userData = await jwt.verify(token, 'SECRET');

        if (!userData) throw new Error();

        req.user = userData;

        next();
    } catch (err) {
        res.redirect('/login');
    }
}