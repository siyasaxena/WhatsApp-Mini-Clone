const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./Models/chat.js");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");


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
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
};
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
app.get("/chats",asyncWrap(async (req,res,next)=>{
    //let chats = await Chat.find(); //this find() fn will brinf data from database, and it is asynchronous fn
    // console.log(chats);
    // res.render("index.ejs",{chats});
    
    let chats = await Chat.find({});
    res.render("index.ejs",{chats});
    
}))
app.get("/", (req, res) => {
  res.send("Route is working");
});

//new route
app.get("/chats/new",(req,res)=>{
    //throw new ExpressError(404,"Page not found"); 
    res.render("new.ejs");
})
//create route
app.post("/chats",asyncWrap(async (req,res,next)=>{
    
    let {from , to ,msg} = req.body;
    let newChat = new Chat({
        from:from,
        to: to,
        msg: msg,
        created_at: new Date(),
    });
    await newChat.save();
    console.log("chat was saved");
    res.redirect("/chats");// after creating a new chat, we will redirect to index page to see the list of all chats, including the newly created one
        
   
    
}));
    

function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
}

//NEW - Show Route
app.get("/chats/:id",asyncWrap( async(req,res,next)=>{
   
        let{id}=req.params;
        let chat = await Chat.findById(id);
        if(!chat){
            return next(new ExpressError(404,"Chat not found!!!!!!"));
        }
        res.render("edit.ejs",{chat});
     
}));

//edit route
app.get("/chats/:id/edit",asyncWrap(async(req,res,next)=>{
  
    let{id}=req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
        return next(new ExpressError(404, "Chat not found for editing!"));
    }
    res.render("edit.ejs",{chat});
    
}));

//update route
app.put("/chats/:id",asyncWrap(async (req,res,next)=>{
    
    let{id} = req.params;
    let {msg : newMsg} = req.body;
    
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg: newMsg, updated_at:new Date()},{runValidators:true,new: true});
    
    console.log("Updated Chat:",updatedChat);
    res.redirect("/chats");
    
}))

//destroy route
app.delete("/chats/:id",asyncWrap(async (req,res,next)=>{
    
    let {id} = req.params;
    let deleted_chat = await Chat.findByIdAndDelete(id);
    console.log(deleted_chat);
    res.redirect("/chats");
    
}));

//if we want some to do work before getting err
const handleValidationErr = (err)=>{
    console.log("this was a validation error, please follow rules");
    console.log(err.message);
    return err;
}

//to find error name, another mw fn
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name=="ValidationError"){
        err = handleValidationErr(err);
    }
    next(err);
})

//error handling middleware
app.use((err,req,res,next )=>{
    let{status=500,message="Some error occurred"} = err;
    res.status(status).send(message);
})

app.listen(8080, () => {
  console.log("server is listening on port 8080");
});
