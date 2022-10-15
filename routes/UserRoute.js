const express = require('express');
const {Users} = require('../models');
const bcrypt = require('bcrypt');
const route = express.Router();
const dotenv = require('dotenv')
const {sign} = require('jsonwebtoken');


dotenv.config()
const {
    validateToken ,
    verifyTokenAndAdmin,


  } = require("../middlewares/validateAuth.js");
  route.post("/", async (req, res) => {
    const { username, email,password } = req.body;
    const checkifuserexiest = await Users.findOne({where : {username: username, email: email}})
    
    if(checkifuserexiest) 
    {
      res.send({error : "User exiest"})
    }
    else {
      bcrypt.hash(password, 10).then((hash) => {
        Users.create({
          username: username,
          email : email,
          password: hash,
        });
        res.json("SUCCESS");
      
      });
    }
  });


  route.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Users.findOne({ where: { username: username } });
  
    if (!user){ 
      res.json({ error: "الحساب موجود" })
      return;
    };
  
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) {
        res.send({ error: "Wrong Username And Password Combination" })
        return;
      }
      
      else {
        const accessToken = sign(
          { username: user.username, id: user.id , isAdmin : user.isAdmin , isCeo: user.isCeo,image : user.image, isModiratore : user.isModiratore, }, process.env.JWT_TOKEN , {expiresIn : "200d"}
        );
        res.json({ token: accessToken, username: username, id: user.id , isAdmin: user.isAdmin ,image : user.image , isCeo : user.isCeo,isModiratore : user.isModiratore });
      }

    });
  });


route.get('/auth' , validateToken,(req,res) => {
    res.json(req.user)
  })

  route.post('/changeprofileimage',validateToken , async (req,res) => {
    const {image} = req.body;
    const updateImage = await Users.update({image :image }, {where : {username : req.user.username}})
    if(!updateImage) res.json({error : "هنالك خطأ في الرابط المستخدم"})
    res.json("SUCCESS" , updateImage);
  })

  route.post('/changepassword' , validateToken,async (req,res) => {
   const {oldpassword , newpassword} = req.body
   const user = await Users.findOne({ where: { username: req.user.username} });
   bcrypt.compare(oldpassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    bcrypt.hash(newpassword, 10).then((hash) => {
      Users.update({password : hash} , {where : {username : req.user.username}})
      res.json("SUCCESS");
    
    });
   
  });
  })





module.exports =route