const mongoose = require("mongoose");

const messageSchema=new mongoose.Schema({
chatroom: {
    type:mongoose.Schema.Types.ObjectId,
    required:'Chatroom is required',
    ref: "Chatroom"
},
user: {
    type:mongoose.Schema.Types.ObjectId,
    required:'Chatroom is required',
    ref: "User"
},
message:{
    type:String,
    required:'Utilisation of chat application without a MESSAGE isnt satisfied'
}
});
module.exports=mongoose.model('Message', messageSchema);