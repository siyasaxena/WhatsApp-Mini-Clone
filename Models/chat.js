const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxLength: 100, 
    required: true,
  },
},// <--- Close the fields object and add a comma
  { timestamps: true },// <--- This is the 2nd argument (the options object)
);

const Chat = mongoose.model("Chat", chatSchema);
// now exports chat model
module.exports = Chat;
