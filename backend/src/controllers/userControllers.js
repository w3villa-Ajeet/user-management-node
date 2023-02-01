const User = require("../models/userModels");
require('../db/config')
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;



exports.signUp = async (req, res) => {
  const { name, email, password } = req.body;

    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send("Something went wrong");
      }
      res.send({ result, auth: token });
    });
};

exports.login = async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        
        res.send({ user, auth: token});
        if (err) {
          res.send("Something went wrong");
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "No User found" });
    }
  } else {
    res.send({ result: "No User Found" });
  }
};


exports.getAll = async(req,res)=> {
  try {
      let users = await User.find();
      res.status(200).json({
          success : true,
          message : "Users found successfully",
          data : users
      })  
  } catch (error) {
      console.log("error :", error);
      res.status(500).send("Server Error!");
  }
}



exports.search = async (req, resp) => {
  let result = await User.find({
      "$or": [
          {
              name: { $regex: req.params.key }  
          },
          {
              email: { $regex: req.params.key }
          }
      ]
  });
  resp.send(result);
}

exports.getPost = (req, res) => {
  res.send("i am ajeet singh rajput");
};
