const express = require('express');
const Classes = require("../models/class.model");
const router = express.Router();

router.get("", async (req, res) => {
    try {
        let classes = await Classes.find().lean().exec();
        return res.status(200).send(classes);
    } catch (error) {
        return res.status(500).send(error.message)
    }
});



router.get("/:_id", async (req, res) => {
    try {
        let classes = await Classes.findById(req.params._id);
        return res.status(200).send(classes);
    } catch (error) {
        return res.status(500).send(error.message)
    }
});

router.post("", async (req, res) => {
    try {
        const classes = await Classes.create(req.body);
        res.send(classes);

    }
    catch (err) {
        res.send(err.message);
    }
});

module.exports = router;