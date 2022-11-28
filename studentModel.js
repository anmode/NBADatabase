var mongoose  =  require('mongoose');  
   
var studentSchema = new mongoose.Schema({  
    srNum : Number,
    name: { 
      type :String,
      //required :[true, "Name is required"]
    },
    enrollment : { 
      type :String,
      //required :[true, "Faculty No. is required"]
    },
    facultyNum : { 
      type :String,
      //required :[true, "required"]
    },
    father : String,
    mother : String,
    addrPermanent : String,
    addrCorresponding: String,
    studNum : Number,
    Email : String,
    fatherNum : Number,
    hall : String,
    dob: String,
    nationality: {
      type : String,
    }

});  
   
module.exports = mongoose.model('studentModel', studentSchema);