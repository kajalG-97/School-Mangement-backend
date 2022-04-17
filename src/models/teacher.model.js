const mongoose = require('mongoose');

const teacherSchemas = new mongoose.Schema({
    teacher_name: { type: String, required: true },
    img_url: { type: String, required: false},
    age: { type: Number, required: true },
    gender: { type: String, required: false ,default: 'female' },
    classes_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "classes" }]
},
    {
        versionKey: false,
        timestamps: true,
    }
);

const Teacher = mongoose.model("teacher", teacherSchemas);
module.exports = Teacher;