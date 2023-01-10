var mongoose  =  require('mongoose');  
   
var internshipSchema = new mongoose.Schema({  
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
    participating_industry_or_institution : String,
    duration : String,
    

});  
   
module.exports = mongoose.model('internshipModel', internshipSchema);