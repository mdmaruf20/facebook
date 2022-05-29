const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: {
        type: String,
        default: 'No Name'
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String,
    }
}, {
    timestamps: true
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;