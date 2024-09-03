const mongoose = require("mongoose");

const chatroomSchema=new mongoose.Schema({
name: {
    type:String,
    required:' Your good name please'
},
});
module.exports=mongoose.model('Chatroom', chatroomSchema);