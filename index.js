const express = require("express")
//express app
const app = express()

app.use(express.static('public'))
app.set('view engine', "ejs")
app.use(express.urlencoded({ extended: true }));
//this code for making server
app.listen(3000, ()=>{
  console.log("Listening on port 3000")  
})

app.get("/", (req,res)=>{
  res.render("index")
})

//this code for apply leave page
app.post("/", (req,res)=>{
    res.render("admin-page", {title: "usmea"})
})

app.get("/leave/create",(req, res)=>{
  res.render("create",{ title: "creat a leave"});
})

app.post("/", (req,res)=>{
    res.render("admin-page")
})
    
app.post("/", (req,res)=>{
    res.render("admin-page")
    // res.render("index", { error: "Invalid Id or Password"})
})
