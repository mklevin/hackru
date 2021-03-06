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
    field: { type: String },
    yearsexp: { type: Number, default: 0 },
    starttime: { type: Date, default: Date.now },
    locradius: { type: Number, default: 100 },
    skills: [String],
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
    website: String,
    acceptedListings: [{type: Schema.Types.ObjectId, ref: "Listing"}],
    deniedListings: [{type: Schema.Types.ObjectId, ref: "Listing"}],
    savedListings: [{type: Schema.Types.ObjectId, ref: "Listing"}]
  }
});

module.exports = mongoose.model("Searcher", searcherSchema);
