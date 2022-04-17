const express = require("express");

const Teacher = require("../models/teacher.model");

const router = express.Router();

router.get("/search", async (req, res) => {
    try {
        const query = req.query.search;
        const teacher = await Teacher.find({ teacher_name: { $regex: query, $options: 'i' } });
        console.log({ query });
        return res.status(200).send(teacher);
    } catch (err) {
        res.status(501).send(err.message);
    }
});

module.exports = router;