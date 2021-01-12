const mongoose = require("mongoose");

class DataBase{
    constructor(){
        this.connect();
    }
    
    connect(){
        mongoose.connect(`mongodb+srv://admin:admin@twitterclonecluster.a2qd4.mongodb.net/TwitterClondDB?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useUnifiedTopology:true})
        .then(()=>{
            console.log("FIIINE");
        })
        .catch((err)=>{
            console.log("error "+err);
        })
    }
}
module.exports = new DataBase();