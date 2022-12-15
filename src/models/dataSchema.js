const mongoose = require('mongoose');
const userSchema = require('./userSchema');

const dataSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    mes: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    produto: {
        type: String,
        required: true
    },
    entrada: {
        type: String,
        required: false
    },
    saida: {
        type: String,
        required: false
    }
}, {timestamps : true });

module.exports = mongoose.model('dados', dataSchema);
