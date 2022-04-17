const mongoose = require('mongoose');

const classesSchemas = new mongoose.Schema({
    grade: { type: String, required: true },
    section: { type: String, required: true },
    subject: { type: String, required: true },
    
},
    {
        versionKey: false,
        timestamps: true,
    }
);

const Classes = mongoose.model("classes", classesSchemas);
module.exports = Classes;