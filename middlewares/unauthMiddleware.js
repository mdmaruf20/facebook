const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        console.log(token);

        if (!token) throw new Error();

        const userData = await jwt.verify(token, 'SECRET');

        if (!userData) throw new Error();

        if (userData) {
            return res.redirect('/');
        }
    } catch (err) {
        next();
    }
}