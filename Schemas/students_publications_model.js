var mongoose  =  require('mongoose');  
   
var publicationSchema = new mongoose.Schema({  
    srNum : Number,
    title_of_the_paper: { 
      type :String,
      //required :[true, "title is required"]
    },
    
    

});  
   
module.exports = mongoose.model('students_publications_model', publicationSchema);