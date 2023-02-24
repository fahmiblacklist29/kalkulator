import mongo from "mongoose";
 
const User = mongo.Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    createDate:{
        type: Date,
        required: false
    },
    loginDate:{
        type: Date,
        required: false
    },
    logoutDate:{
        type: Date,
        required: false
    }
});
 
export default mongo.model('Users', User);