var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var searchPrefSchema = new Schema({
  searcher: { type: Schema.Types.ObjectId, ref: "Searcher" },
  type: { type: String, required: true },
  field: { type:String, required: true },
  yearsexp: { type: Number, required: true, default: 0 },
  starttime: { type: Date, required: true, default: Date.now },
  locradius: { type: Number, required: true, default: 100 },
  recentEdu: {
    level: String,
    major: String,
    school: String
  }
});

module.exports = mongoose.model("SearchPrefs", searchPrefSchema);
