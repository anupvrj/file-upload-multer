const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const filename=(file.originalname).replace(" ","-");
    //  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })
 

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.get("/",(req,res)=>{
res.render('home',{name:"Anup"});
});
app.post("/submit",upload.single('resume'),(req,res)=>{
    var name =req.body.name;
    var email =req.body.email;
    var experience = req.body.experience;
    var technology = req.body.technology;
    // console.log(name,email,experience,technology);
    console.log(req.file.originalname, req.body)

    res.render('home',{name:name, email:email,experience:experience,technology:technology});

})

app.listen(5000,()=>console.log("Server is Running"));