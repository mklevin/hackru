var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var searcherSchema = new Schema({
  type: { type: String, required: true },
  googleid: { type: String, required: true },
  username: { type: String, required: true },
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  middlename: String,
  searchPrefs: {
    type: { type: String },
    field: { type:String },
    yearsexp: { type: Number, default: 0 },
    starttime: { type: Date, default: Date.now },
    locradius: { type: Number, default: 100 },
    recentEdu: {
      level: String,
      major: String,
      school: String
    }
  },
  resume: {
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
  }
});

module.exports = mongoose.model("Searcher", searcherSchema);
