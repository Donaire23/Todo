const express = require('express');
const router = express.Router();
const Register = require("../Model/RegistrationModel");
const bcrypt = require("bcryptjs")

router.post('/', async(req, res ) => {

    const {name, emailAddress, password} = req.body;

    try {
        const saltRounds = 10; 
        const hash = await bcrypt.hash(password, saltRounds);
        const Registers = new Register({
            full_name: name,
            email_address: emailAddress,
            password: hash
        });

        Registers.save();
        res.status(200).json({ message: "add success"})
    } catch(error) {

        res.status(500)
    }
})

module.exports = router;