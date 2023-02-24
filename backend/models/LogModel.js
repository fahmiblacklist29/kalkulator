import mongo from "mongoose";
 
const Log = mongo.Schema({
    name:{
        type: String,
        required: true
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
 
export default mongo.model('Logs', Log);