var mongoose  =  require('mongoose');  
   
var workshopSchema = new mongoose.Schema({  
    srNum : Number,
    name: { 
      type :String,
      //required :[true, "Name is required"]
    },
    enrollment : { 
      type :String,
      //required :[true, "Faculty No. is required"]
    },
    faculty_no : { 
      type :String,
      //required :[true, "required"]
    },
    batch : Number,
    workshop : String,
    duration : String,
    

});  
   
module.exports = mongoose.model('workshopModel', workshopSchema);