import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String , 
        required : true
    },
    password : {
        type : String ,
        required : true,
        minlength : 6,
    },
    image : {
        type : String ,
        default : ""
    },
    searchHistory : {
        type : Array ,
        default : []
    }
})

const usersModel = mongoose.models.user || mongoose.model('user', schema)
export default usersModel;