var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var searcherSchema = new Schema({
  googleid: { type: String, required: true },
  username: { type: String, required: true },
  firstname: { type: String, required: true},
  lastname: { type: String, required: true},
  middlename: String,
  searchPreferences: Schema.ObjectId,
  resume: Schema.ObjectId
});

module.exports = mongoose.model("Searcher", searcherSchema);
