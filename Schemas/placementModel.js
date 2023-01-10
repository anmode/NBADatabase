var mongoose  =  require('mongoose');  
   
var placementSchema = new mongoose.Schema({  
    srNum : Number,
    name: { 
      type :String,
      //required :[true, "Name is required"]
    },
    enrollment : { 
      type :String,
      //required :[true, "Faculty No. is required"]
    },
    branch : { 
      type :String,
      //required :[true, "required"]
    },
    batch : Number,
    employer_name : String,
    appointment_no : String,
    

});  
   
module.exports = mongoose.model('placementModel', placementSchema);