const mongoose = require('mongoose');
const nodemailer = require("nodemailer");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,

    },

});

//post middleware 
userSchema.post("save", async function (doc) {

    // iss doc ke andar sara data pda hua hain 
    console.log(doc);
    try {
        //transporter
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: "muditgoel248@gmail.com",
                pass: "kpvyxepwiitlknpx",
            },
        });
        //send mail

        const info = await transporter.sendMail({
            from: 'codehelp', // sender address
            to: doc.email, // list of receivers
            subject: "Hello ✔", // Subject line
            html: "<b>Hello world?</b>", // html body
        });
        console.log(info);

    }
    catch (error) {
        console.log(error);

    }
})


const userModel = mongoose.model("user", userSchema)

module.exports = userModel;