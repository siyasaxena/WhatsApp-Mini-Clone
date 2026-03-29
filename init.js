const mongoose = require("mongoose");
const Chat = require("./Models/chat.js");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

const allChats = [
    {
    from: "siya",
    to: "suhani",
    msg: "Hey bro, whats up!!",
    created_at: new Date(),
    },
    {
    from: "suhani",
    to: "siya",
    msg: "I am fine bro, What about you!!",
    created_at: new Date(),
    },
    {
    from: "siya",
    to: "sneha",
    msg: "gumi gumi kar li tune!!",
    created_at: new Date(),
    },
    {
    from: "sneha",
    to: "siya",
    msg: "Haa, yrr karli, bada mazza yaha waha pe sach mein ghumne mein",
    created_at: new Date(),
    },
    {
    from: "siya",
    to: "Banga",
    msg: "Tera aur mera section sam kab hoga, yeh doremon karne hi nahi deti",
    created_at: new Date(),
    },
];
Chat.insertMany(allChats).then((res)=>{
    console.log("Multiple chats saved: ",res);
})
.catch((err) => {
    console.log("Error inserting chats:", err);
});
