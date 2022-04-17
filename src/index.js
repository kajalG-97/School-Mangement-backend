const express = require('express');

const connect = require('./configs/db');

const adminController = require("./controllers/admin.controller");

const { register, login } = require("./controllers/auth.controller");

const passport = require("./configs/google.auth");

const cors = require('cors');

const port = process.env.PORT || 6060;

const teacherController = require("./controllers/teacher.controller");

const schoolController = require("./controllers/school.controller");

const classController = require("./controllers/classes.controller");

const teacher_search = require("./controllers/teacherSearch.controller");

const app = express();

app.use(cors());

app.use(express.json());


app.use("/school", schoolController);

app.use("/class", classController);

app.use("/teacher", teacherController);

app.use("/teacher_name", teacher_search);

app.use("/admins", adminController);

app.post("/register", register);

app.post("/login", login);

// google auth routes

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));


app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: 'https://grubhub-clone-project.vercel.app/home',
        failureRedirect: '/auth/google/failure'
    }));


app.get("/auth/google/success", (req, res) => {

    return res.send({ message: "logged in" })

});


passport.serializeUser(function (user, done) {
    return done(null, user)
});


passport.deserializeUser(function (user, done) {
    return done(null, user)
});


app.get("", async (req, res) => {
    try {
        return res.send("Server is live now")
    } catch (error) {
        return res.send(error.message)
    }
});


app.listen(port, async () => {
    try {
        await connect();
        console.log(`running on port ${port}`);

    } catch (err) {
        console.log('err', err.massage);

    }
});