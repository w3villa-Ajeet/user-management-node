const express = require('express')

const userControllers = require('../controllers/userControllers');

const router = express.Router();

const Jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;


router.get("/",userControllers.getPost);

// exports.getPost = (req, res)=>{
//     // res.send("i am ajeet singh rajput and this is me and only me"); 
// }

//User signup 
router.post("/signUp",userControllers.signUp);

//User login
router.post("/login",userControllers.login);

//User List
router.get("/getAll",verifyToken,userControllers.getAll);

//search user
router.get("/search/:key",verifyToken,userControllers.search);





function verifyToken(req, res, next) {
    console.log("middleware called");
    let token = req.headers["authorization"];
    if (token) {
      token = token.split(' ')[1];
      Jwt.verify(token,jwtKey,(err, valid)=>{
        if(err){
          res.status(401).send({result :"please provide valid token"})
        }else {
          next();
        }
      })
    } else {
      res.status(403).send({result :"please add token with header"} )
    }
  }

module.exports = router;   

// module.exports ={
//     getPost
// }