const express=require('express');
const path = require('path');
const port=7000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('./assets'));

//app.use(function(req,res,next){console.log('middleware 1 called');
//next();});
//app.use(function(req,res,next){console.log('middleware2 called');
//next();});
var contactList=[
   {
      name:"Akshay",
      phone:"1234567809"
   },{
      name:"Chirag",
      phone:"2121212121"
   },{
      name:"Rahul",
      phone:"2154879865"
   }
]
app.get('/',function(req,res){
   //console.log(__dirname);
   Contact.find({},function(err,contacts){
      if(err){
         console.log('error in fetching contacts');
         return;
      }
      return res.render('home',{title:"My contact list",
    contact_list:contacts
   });
    
   
   });
 });

 //app.get('/practice',function(req,res){return res.render('practice',{title:"Let us play with ejs"});});

 app.post('/create-contact',function(req,res){
    Contact.create({
      name:req.body.name,phone:req.body.phone})
      .then((newContact)=>{  console.log("*****",newContact);return res.redirect('back')}).catch((err)=>{console.log("error",err)})
   });


//app.get('/delete-contact/:phone',function(req,res){
  // console.log(req.params);
   //let phone=req.params.phone;

//});
app.get('/delete-contact',function(req,res){
   let phone= req.query.phone;
   let contactIndex=contactList.findIndex(contact=>contact.phone==phone);
   if(contactIndex!=-1)
   {
      contactList.splice(contactIndex,1);
   }
   return res.redirect('back');
});

 app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('Yup!My Express server is running on Port:',port);
 });