var mongoose  =  require('mongoose');  
   
var hall_magazine_Schema = new mongoose.Schema({  
    srNum : Number,
    magazine_name: { 
      type :String,
      //required :[true, "Name is required"]
    },
    date : { 
      type :String,
      //required :[true, "Faculty No. is required"]
    },
    participants : { 
      type :String,
      //required :[true, "required"]
    },
   
    

});  
   
module.exports = mongoose.model('hall_magazine', hall_magazine_Schema);