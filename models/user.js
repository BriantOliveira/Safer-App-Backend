const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
// const Autopopulate = require('../utilities/autopopulate');
const findOrCreate = require('mongoose-find-or-create')


const UserSchema = new Schema({
    googleId: { type: String }
});

UserSchema.plugin(findOrCreate)

module.exports = mongoose.model("User", UserSchema);
