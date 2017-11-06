const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FundsSchema = new Schema({
    id: {
        type: String,
        trim: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    bonds: {
        type: [Number],
        required: true,
    },
    stocks: {
        type: [Number],
        required: true,
    },
});

module.exports = mongoose.model('fund', FundsSchema);
