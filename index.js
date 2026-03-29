const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./Models/chat.js");
const methodOverride = require("method-override");


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true})); //to parse data of submitted form
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
// let chat1 = new Chat({
//   from: "siya",
//   to: "disksha",
//   msg: "send me your exam sheet",
//   created_at: new Date(), //method in js to get current date and time
// });
// let chat2 = new Chat({
//   from: "siya",
//   to: "kanan",
//   msg: "How are you!!",
//   created_at: new Date(),
// });
// chat2.save().then((res) => {
//   console.log(res);
// });

//index route
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find(); //this find() fn will brinf data from database, and it is asynchronous fn
    // console.log(chats);
    res.render("index.ejs",{chats});
})
app.get("/", (req, res) => {
  res.send("Route is working");
});

//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
//create route
app.post("/chats",(req,res)=>{
    let {from , to ,msg} = req.body;
    let newChat = new Chat({
        from:from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    newChat.save().then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log("error occurred");
    })

    res.redirect("/chats");// after creating a new chat, we will redirect to index page to see the list of all chats, including the newly created one
})
//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let{id}=req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})

//update route
app.put("/chats/:id",async (req,res)=>{
    let{id} = req.params;
    let {msg : newMsg} = req.body;
    
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg: newMsg, updated_at:new Date()},{runValidators:true,new: true});
    
    console.log("Updated Chat:",updatedChat);
    res.redirect("/chats");
})

//destroy route
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let deleted_chat = await Chat.findByIdAndDelete(id);
    console.log(deleted_chat);
    res.redirect("/chats");
})

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
