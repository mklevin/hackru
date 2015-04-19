var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var listingSchema = new Schema({
  location: {
    city: String,
    state: String,
    country: String
  },
  type: { type: String, required: true, default: "internship" },
  time: String,
  reqskills: [String],
  reqedu: [String],
  reqexp: [String],
  perks: [String],
  description: { type: String, required: true },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  acceptedSearchers: [{type: Schema.Types.ObjectId, ref: "Searcher"}],
  deniedSearcher: [{type: Schema.Types.ObjectId, ref: "Searcher"}]
});

module.exports = mongoose.model("Listing", listingSchema);
