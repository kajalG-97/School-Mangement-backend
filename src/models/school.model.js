const mongoose = require('mongoose');

const schoolSchemas = new mongoose.Schema({
    school_name: { type: String, required: true },
    school_img: { type: String, required: false },
    teacher_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "teacher" }],
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "admin" }
},
    {
        versionKey: false,
        timestamps: true,
    }
);

const School = mongoose.model("schools", schoolSchemas);
module.exports = School;