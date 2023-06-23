// require the library
const mongoose = require("mongoose");
const url="mongodb://127.0.0.1:27017/contacts_list_db";
// connect to the database
//mongoose.connect("mongodb://127.0.0.1:27017/contacts_list_db");
// acquire the connection(to check if it is successful)
//const db = mongoose.connection;
// error handling
//db.on("error", function (error) {
  //console.log(error.message);
//});
// up and running and print successfully connected
//db.once("open", function () {
  //console.log("Successfully connected to the database");
//});
async function mongo(){await mongoose.connect(url);}
mongo().then(()=>{console.log("Successfully connected to the database");
}).catch(error=>{console.log("connection to databse failed",error);})