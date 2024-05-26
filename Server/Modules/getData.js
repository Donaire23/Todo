const express = require('express');
const router = express.Router();
const Register = require("../Model/RegistrationModel");
const crypto = require('crypto');


router.get("/getUser", async (req, res) => {
    try {
        const id = req.query.userId; 
        const user = await Register.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ name: user.full_name });
    } catch(error) {
        res.status(500).json({ message: 'Error retrieving user data', error: error.message });
    }
});


module.exports = router;
