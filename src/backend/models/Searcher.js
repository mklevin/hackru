var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var SearchPrefs = require("./SearchPrefs");

var searcherSchema = new Schema({
  type: { type: String, required: true },
  googleid: { type: String, required: true },
  username: { type: String, required: true },
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  middlename: String,
  searchPreferences: { type: Schema.Types.ObjectId, ref: "SearchPrefs" },
  resume: { type: Schema.Types.ObjectId, ref: "Resume" }
});

module.exports = mongoose.model("Searcher", searcherSchema);
