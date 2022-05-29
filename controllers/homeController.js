const Client = require('../model/Client');
const User = require('../model/User');

class HomeController {
    async homeView(req, res) {
        const { id } = req.user;

        let user;

        try {
            user = await User.findById(id);
        } catch (err) {
            console.log(err);
        }

        let clients;

        if (user.role === 'admin') {
            clients = await Client.find();
        } else {
            clients = await Client.find({ userId: user.id });
        }

        res.render('index', {
            clients,
            user
        });
    }

    async detailsView(req, res) {
        const { id } = req.params;

        try {
            const client = await Client.find({ _id: id });

            res.render('details', { r_client: client[0] });
        } catch (err) {
            res.redirect('/');
        }
    }

    async submit(req, res) {
        const { id } = req.params;
        const { name, username, password } = req.body;

        try {
            const client = await Client.findOneAndUpdate({ _id: id }, { name, username, password }, { new: true });

            if (client) {
                res.redirect(`/details/${id}`);
            }
        } catch (err) {
            console.log(err);
            res.redirect(`/details/${id}`);
        }
    }
}

module.exports = new HomeController();