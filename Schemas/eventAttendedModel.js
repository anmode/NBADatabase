var mongoose  =  require('mongoose');  
   
var eventAttendedSchema = new mongoose.Schema({  
    srNum : Number,
    event_participated: { 
      type :String,
      //required :[true, "Event name is required"]
    },
    
    session : { 
      type :String,
      //required :[true, "required"]
    },
   
    no_of_participants : Number,
    name_of_students : String,
    
    date_of_event: String,
   
});  
   
module.exports = mongoose.model('eventAttendedModel', eventAttendedSchema);