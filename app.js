const express = require("express");
const app = express();
const filename = "/public/index.html";
const PORT = 8080;
// const bodyParser = require("body-parser");
const router=express.Router();
var userRouter = require('./routes/user');



//middleware funcitons...
// app.use(bodyParser.urlencoded({ extended: true }));  
app.use(express.json());
app.use(express.urlencoded());
// app.use(bodyParser.json());



app.route('/users')
	.get(userRouter.getUsers)
	.post(userRouter.storeUser)
  .delete(userRouter.deleteUser)
  .put(userRouter.updateUser);
app.route('/user/:name')
	.get(userRouter.getUser)
	
	


app.get("/", (req, res) => {
    res.sendFile(__dirname + filename);
  });
  

  app.listen(PORT, function(error){
    if (error) throw error
    console.log("Server running successfully on PORT : ", PORT)
  })

  module.exports = app;