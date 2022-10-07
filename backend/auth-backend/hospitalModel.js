const mongoose = require("mongoose");
const HospitalSchema = new mongoose.Schema({
    hospitalName: {
        type: String,
        required: [true, "Plese provide and Hospital Name"],
        unique: [true, "Hospital Name Exists"]
    },
    hospitalId: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
    },
    password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
    }
})

module.exports = mongoose.model.Hospitals || mongoose.model("Hospitals",HospitalSchema);
