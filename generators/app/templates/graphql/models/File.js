const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    filename: String,
    mimetype: String,
    encoding: String
});

module.exports = model('File', userSchema);