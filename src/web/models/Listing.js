var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var listingSchema = new Schema({
  title: String,
  location: {
    city: String,
    state: String,
    country: String
  },
  type: { type: String, default: "internship" },
  time: { type: Date, default: Date.now },
  reqskills: [String],
  reqedu: [String],
  yearsexp: Number,
  perks: [String],
  description: String,
  field: String,
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  acceptedSearchers: [{type: Schema.Types.ObjectId, ref: "Searcher"}],
  deniedSearcher: [{type: Schema.Types.ObjectId, ref: "Searcher"}]
});

module.exports = mongoose.model("Listing", listingSchema);
