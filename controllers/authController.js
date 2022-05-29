const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthController {
    registerView(req, res) {
        res.render('register');
    }

    async register(req, res) {
        const { name, email, password, repassword } = req.body;

        if (!name || !email || !password || !repassword) {
            return res.render('register', { error: 'All Fields are Required!' });
        }

        if (password !== repassword) {
            return res.render('register', { error: 'Password Does not Match!' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({ name, password: hashedPassword, email });

            if (user) {
                return res.redirect('/login');
            }

            res.render('register', { error: 'Registration Failed!' });
        } catch (err) {
            console.log(err);
        }
    }

    loginView(req, res) {
        res.render('login');
    }

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('all fields are required!');
            return res.render('login', { error: 'All Fields are Required!' });
        }

        try {
            const user = await User.findOne({ email });

            if (!user) {
                console.log('user not found!');
                return res.render('login', { error: 'Email or Password Does not Match!' });
            }

            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        const token = jwt.sign({
                            id: user._id,
                            email: user.email,
                            role: user.role,
                        }, 'SECRET', { expiresIn: '1y' });

                        res.cookie('token', token, {
                            maxAge: 1000 * 60 * 60 * 24 * 30,
                            httpOnly: true
                        });

                        return res.redirect('/');
                    }

                    console.log('Password does not match!');
                    return res.render('login', { error: 'Email or Password Wrong!' });
                })
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new AuthController();