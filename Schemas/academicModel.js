var mongoose  =  require('mongoose');  
   
var academicSchema = new mongoose.Schema({  
    name: { 
      type :String,
      required :[true, "Name is required"]
    },
    enrollment : { 
      type :String,
      required :[true, "Faculty No. is required"]
    },
    facultyNum : { 
      type :String,
      required :[true, "required"]
    },
    branch_Of_Engg : String,
    subject_code : String,
    hall : String,
    Spi: Number,
    Cpi: Number,
    EC : Number,
    result : String

});  
   
module.exports = mongoose.model('Academic', academicSchema);