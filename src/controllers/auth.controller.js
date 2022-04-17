require("dotenv").config();
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const Admin = require("../models/admin.model");

const newToken = (admin) => {
    return jwt.sign({ admin }, `${process.env.JWT_SECRET_KEY}`);
};

const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let newErrors;
            newErrors = errors.array().map((err) => {
                console.log("err", err);
                return { key: err.param, message: err.msg };
            });
            return res.status(400).send({ errors: newErrors });
        }
        let admin = await Admin.findOne({ email: req.body.email }).lean().exec();

        if (admin)
            return res.status(400).send({ message: "Please try another email" });

        admin = await Admin.create(req.body);


        const token = newToken(admin);


        res.send({ admin, token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let newErrors;
            newErrors = errors.array().map((err) => {
                console.log("err", err);
                return { key: err.param, message: err.msg };
            });
            return res.status(400).send({ errors: newErrors });
        }
        const admin = await Admin.findOne({ email: req.body.email });

        if (!admin)
            return res
                .status(400)
                .send({ message: "Please try another email or password" });

        const match = admin.checkPassword(req.body.password);

        if (!match)
            return res
                .status(400)
                .send({ message: "Please try another email or password" });

        const token = newToken(admin);

        res.send({ admin, token });
    } catch (err) {
        res.status(500).send(err.message);
    }
};


module.exports = { register, login };