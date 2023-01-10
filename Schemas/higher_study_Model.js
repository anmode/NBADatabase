var mongoose  =  require('mongoose');  
   
var higher_study_Schema = new mongoose.Schema({  
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
    institute_name : String,
    course_of_study : String,
    

});  
   
module.exports = mongoose.model('higher_study_Model', higher_study_Schema);