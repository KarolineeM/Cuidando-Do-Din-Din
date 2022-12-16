const mongoose = require('mongoose');
const userSchema = require('./userSchema');

const dataSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
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
    entradas: {
        type: Number,
        required: false
    },
    saidas: {
        type: Number,
        required: false
    }
}, {timestamps : true });

module.exports = mongoose.model('dados', dataSchema);
