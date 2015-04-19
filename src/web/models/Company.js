var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: { type: String, required: true },
  website: String,
  location: {
    city: String,
    state: String,
    country: String
  },
  type: String,
  employers: [{type: Schema.Types.ObjectId, ref: "Employer"}],
  listings: [{type: Schema.Types.ObjectId, ref: "Listing"}]
});

module.exports = mongoose.model("Company", companySchema);
