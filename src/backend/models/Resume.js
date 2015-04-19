var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var resumeSchema = new Schema({
  seracher: Schema.ObjectId,
  education: [{
    level: String,
    major: String,
    school: String
  }],
  experience: [String],
  contactemail: String,
  phone: {
    country: Number,
    areacode: Number,
    number: Number
  },
  website: String
});

module.exports = mongoose.model("Resume", resumeSchema);
