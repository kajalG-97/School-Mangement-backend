const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

adminSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();

    var hash = bcrypt.hashSync(this.password, 8);
    this.password = hash;
    return next();
});

adminSchema.methods.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;