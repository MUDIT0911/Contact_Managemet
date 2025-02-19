const express = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');


module.exports.Signup = async (req, res) => {


    try {
        const { name, email, password } = req.body;


        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Required all fields"
            })
        }
        const existinguser = await User.findOne({ email })
        if (existinguser) {
            return res.status(400).send({
                success: false,
                message: 'email already in use'
            })
        }
        const hashedpassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedpassword
        })
        await user.save();
        return res.status(200).send({
            success: true,
            message: "User successfully created",
            user

        })

    }

    catch (err) {
        console.error(err);
        return res.status(500).send({
            err,


        })
    }
}


module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            success: false,
            message: "Required all fields"
        })
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
        return res.status(400).send({
            success: false,

            message: "please Signup first"
        })
    }
    const verifyPassword = await bcrypt.compare(password, existingUser.password);
    if (!verifyPassword) {
        return res.status(400).send({
            success: false,
            message: "Password do not match"
        })
    }
    return res.status(200).send({
        success: "true",
        message: "Login Successfully",
        user_id: existingUser._id
    })

}

module.exports.getAllUser = async (req, res) => {

    const user = await User.find({});
    if (!user) {
        return res.status(401).send({
            success: "false",
            message: "No user found"
        })
    }

    return res.status(200).send({
        success: "true",
        message: "users printed",
        user,
    })
}

module.exports.deleteUser = async (req, res) => {

    try {

        const { user_id } = req.params;

        if (!user_id) {
            return res.status(400).send({
                success: "false",
                message: "User ID is required",
            });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).send({
                success: "false",
                message: "User not found",
            });
        }

        await User.findByIdAndDelete(user_id);
        return res.status(200).send({
            success: "true",
            message: "user delete successfully"
        })

    }


    catch (error) {
        return res.status(500).send({
            success: "false",
            message: "Server error",
            error: error.message,
        });

    }
}



