const express = require("express");

const Teacher = require("../models/teacher.model");

const router = express.Router();

// make router for frontend

// posting teacher
router.post("", async (req, res) => {
    try {
        const teacher = await Teacher.create(req.body);
        res.send(teacher);

    }
    catch (err) {
        res.send(err.message);
    }
})

// getting teacher
router.get("", async (req, res) => {
    try {
        const count = req.query.count;
        // console.log('count', count);
        const size = count * 9;
        const teacher = await Teacher.find().populate({path:"classes_ids"}).limit(size).lean().exec();
        return res.send(teacher);
        // res.send(teacher);
    } catch (err) {
        res.status(520).send(err.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body)
        res.send(teacher);
    } catch (err) {
        console.log('err', err);
    }
});

router.get("/:teacher_name", async (req, res) => {
    try {
        const teacher = await Teacher.find({ teacher_name: req.params.teacher_name }).lean().exec();
        return res.send(teacher);
        // res.send(teacher);
    } catch (err) {
        res.status(520).send(err.message);
    }
});



module.exports = router;