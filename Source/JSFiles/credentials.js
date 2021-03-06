const mongoose = require('mongoose');

const credentialSchema = mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        firstName: { type: String },
        lastName: { type: String }
    },
    {
        timestamps: true
    }
);

const Credentials = mongoose.model('credentials', credentialSchema);

module.exports = Credentials;




