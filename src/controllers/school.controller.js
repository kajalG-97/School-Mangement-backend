const express = require("express");

const School = require("../models/school.model");

const router = express.Router();

// make router for frontend

// posting school
router.post("", async (req, res) => {
    try {
        const school = await School.create(req.body);
        res.send(school);

    }
    catch (err) {
        res.send(err.message);
    }
})

// getting school
router.get("", async (req, res) => {
    try {
        
        const school = await School.find().limit(size).lean().exec();
        return res.send(school);
        // res.send(school);
    } catch (err) {
        res.status(520).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const school = await School.findByIdAndUpdate(req.params.id, req.body)
        res.send(school);
    } catch (err) {
        console.log('err', err);
    }
});



router.get("/:_id", async (req, res) => {
    try {
        const school = await School.find({ admin_id: req.params._id }).populate({ path: "admin_id" }).lean().exec();
        return res.send(school);
        // res.send(school);
    } catch (err) {
        res.status(520).send(err.message);
    }
});



module.exports = router;