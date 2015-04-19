var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var employerSchema = new Schema({
  googleid: { type: String, required: true },
  firstname: String,
  middlename: String,
  lastname: String,
  permissionlevel: String,
  company: Schema.ObjectId
});

module.exports = mongoose.model("Employer", employerSchema);
