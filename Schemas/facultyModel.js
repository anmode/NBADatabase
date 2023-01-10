var mongoose  =  require('mongoose');  
   
var facultiesSchema = new mongoose.Schema({
    srNum : Number,
    name :String,
    empID : String,
    PAN : String,
    adhaarNum : Number,
    highestDegree : String,
    degreeDate : String,
    specialization: String,
    currentDesignation : String,
    dateOfDesignationAsProff : String,
    dateOfJoining : String

  }); 
   
module.exports = mongoose.model('facultyINFO', facultiesSchema);