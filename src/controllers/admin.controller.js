const express = require('express');
const Admin = require("../models/admin.model");
const router = express.Router();

router.get("", async (req, res) => {
    try {
        let admins = await Admin.find().lean().exec();
        return res.status(200).send(admins);
    } catch (error) {
        return res.status(500).send(error.message)
    }
});


router.post("", async (req, res) => {
    try {
        const admin = await Admin.create(req.body);
        res.send(admin);

    }
    catch (err) {
        res.send(err.message);
    }
});

module.exports = router;