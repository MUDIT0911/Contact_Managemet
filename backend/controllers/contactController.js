const User = require('../models/userSchema');
const Contact = require('../models/contactSchema');


module.exports.createContact = async (req, res) => {
    try {


        const { first_name, user_id, last_name, email, phoneno, company, job } = req.body;
        if (!user_id || !first_name || !last_name || !email || !phoneno || !company || !job) {
            return res.status(401).send({
                success: "false",
                message: "please fill all fields"
            })

        }

        const contact = new Contact({
            user_id,
            first_name,
            last_name,
            email,
            phoneno,
            company,
            job
        });

        await contact.save();

        return res.status(200).send({
            success: "true",
            message: "contact created successfully",
            contact,

        })

    }
    catch (err) {
        console.log(err);
        return res.status(500).send({
            success: "false",
            message: "server error",
            error: err.message,

        })
    }
}


module.exports.deletecontact = async (req, res) => {

    try {

        const { contact_id } = req.params;
        console.log(contact_id);


        if (!contact_id) {
            return res.status(400).send({
                success: "false",
                message: "contact is required",
            });
        }

        const contact = await Contact.findById(contact_id);
        if (!contact) {
            return res.status(404).send({
                success: "false",
                message: "contact not found",
            });

        }

        await Contact.findByIdAndDelete(contact_id);
        return res.status(200).send({
            success: "true",
            message: "contact delete successfully"
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

module.exports.getallcontact = async (req, res) => {
    try {


        const { user_id } = req.params;
        if (!user_id) {
            return res.status(401).send({
                success: "false",
                message: "please provide user id for all post related to user id"

            })
        }
        const contact = await Contact.find({ user_id });

        return res.status(200).send({
            success: "true",
            message: "get all data of a particular user id",
            contact
        })

    }

    catch (err) {
        console.log(err);
        return res.status(200).send({
            success: "false",
            message: "internal server error",

        })
    }

}

module.exports.updatecontact = async (req, res) => {
    try {
        const { contact_id } = req.params;
        const { user_id, first_name, last_name, email, phoneno, company, job } = req.body;

        if (!contact_id || !user_id || !first_name || !last_name || !email || !phoneno || !company || !job) {
            return res.status(400).send({
                success: "false",
                message: "All fields are required",
            });
        }


        const updatedContact = await Contact.findByIdAndUpdate(
            contact_id,
            { user_id, first_name, last_name, email, phoneno, company, job },
            { new: true }
        );

        if (!updatedContact) {
            return res.status(404).send({
                success: "false",
                message: "Contact not found",
            });
        }

        res.status(200).send({
            success: "true",
            message: "Contact updated successfully",
            data: updatedContact
        });

    } catch (error) {
        res.status(500).send({
            success: "false",
            message: "Server error",
            error: error.message,
        });
    }
}
