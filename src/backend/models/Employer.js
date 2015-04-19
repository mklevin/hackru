var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employerSchema = new Schema({
  type: { type: String, required: true },
  googleid: { type: String, required: true },
  firstname: String,
  middlename: String,
  lastname: String,
  permissionlevel: String,
  company: { type: Schema.Types.ObjectId, ref: "Company" }
});

module.exports = mongoose.model("Employer", employerSchema);
