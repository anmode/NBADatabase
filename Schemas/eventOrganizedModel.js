var mongoose  =  require('mongoose');  
   
var eventOrganizedSchema = new mongoose.Schema({  
    srNum : Number,
    name_of_event: { 
      type :String,
      //required :[true, "Event name is required"]
    },
    type_of_event : { 
      type :String,
      //required :[true, "Faculty No. is required"]
    },
    session : { 
      type :String,
      //required :[true, "required"]
    },
   
    no_of_participants : Number,
    
    date_of_event: String,
   
});  
   
module.exports = mongoose.model('eventOrganizedModel', eventOrganizedSchema);