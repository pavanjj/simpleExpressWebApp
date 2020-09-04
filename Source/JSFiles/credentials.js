const mongoose = require('mongoose');

const credentialSchema = mongoose.Schema(
    {
        email: { type: String, require: true },
        password: { type: String, require: true }
    },
    {
        timestamps: true
    }
);

const Credentials = mongoose.model('credentials', credentialSchema);

module.exports = Credentials;




