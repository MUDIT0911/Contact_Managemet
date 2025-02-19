const mongoose = require('mongoose');


const contactSchema = new mongoose.Schema({
    user_id: { //ye user ki id hain
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,

    },

    first_name: {
        type: String,
        required: true,

    },
    last_name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    phoneno: {
        type: Number,
        required: true,

    },
    company: {
        type: String,
        required: true,

    },

    job: {
        type: String,
        required: true,

    },

});

const contactModel = mongoose.model("Contact", contactSchema)

module.exports = contactModel;