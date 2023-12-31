const express=require('express');
const path = require('path');
const port=8000;

const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('./assets'));


//middleware1
//app.use(function(req,res,next)
//{console.log('middleware 1 called');
//next();
//});
//middleware2
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
   },{name:"Puneet",phone:"56565656"}
]

app.get('/', (req, res) => {
   // ...
   Contact.find({})
     .catch(err => {
       console.log('Error in fetching the contactList:', err);
       return;
     })
     .then(contactList => {
       return res.render('home', { title: "My contact list", contact_list: contactList });
     });
 });

app.get('/practice',function(req,res){
   return res.render('practice',{
      title:"Let us play with ejs"
   });
});

 app.post('/create-contact',function(req,res){
   //contactList.push(
   //   {
   //      name:req,body.name,
   //      phone:req.body.phone
   //   }); 
   Contact.create({
      name:req.body.name,
      phone:req.body.phone
   })
      .then((newContact)=>{  console.log("*****",newContact);return res.redirect('back')})
      .catch((err)=>{console.log("error",err)})
   });


//app.get('/delete-contact/:phone',function(req,res){
  // console.log(req.params);
   //let phone=req.params.phone;

//});
// app.get('/delete-contact',function(req,res){
//    //get the id from query in the url
//    let id= req.query.id;
//    //find the contact in the database using id  and delete it
//    Contact.findByIdAndDelete(id,function(err){
//       if(err){
//          console.log('error in deleting an object from database');
//           return;       
//    }
//    return res.redirect('back');
// });
// });
app.get('/delete-contact/:id',function(req,res){
   let id= req.params.id;
   Contact.findByIdAndDelete(id)
   .then(id => {
      return res.redirect('back');
    })
    .catch(err => {
      console.log('Error in deleting an object from the database:', err);
      return;
    })

});

 app.listen(port,function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('Yup!My Express server is running on Port:',port);
 });