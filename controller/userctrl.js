const { generatetoken } = require("../config/jwttoken");
const user = require("../models/usermodel");
const asynchandler = require("express-async-handler");

const createuser = asynchandler(async (req,res)=>{
    const email = req.body.email;
    const finduser=await user.findOne({email:email});
    if(!finduser){
        const newuser = await user.create(req.body);
        res.json(newuser);
    } else{
        throw new Error("User already esists");
    }
});
const loginuserctrl = asynchandler(async (req,res)=>{
    const {email, password} = req.body;
    // check if user exists or not
    const finduser = await user.findOne({email});
    if(finduser && await finduser.ispasswordmatched(password)){
        res.json({
            id: finduser?._id,
            firstname: finduser?.firstname,
            lastname: finduser?.lastname,
            email: finduser?.email,
            mobile: finduser?.mobile,
            token: generatetoken(finduser?._id),
        });
    } else {
        throw new Error("Invalid Credentials");
    }
});

//get all users
const getalluser = asynchandler(async(req,res)=>{
    try{
        const getusers=await user.find();
        res.json(getusers);
    } catch(error){
        throw new Error(error);
    }
});

//get a single user
const getauser = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
      const getauser = await user.findById(id);
      res.json({
        getauser,
      })
    } catch (error){
      throw new Error(error);
    }
});

//update a user
const updateauser = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const updateduser = await user.findByIdAndUpdate(
        id, 
        {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        },
        {
            new: true,
        });
        res.json(updateduser)
    } catch(error){
        throw new Error(error);
    }
});

//delete a single user
const deleteauser = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
      const getauser = await user.findByIdAndDelete(id);
      res.json({
        deleteauser,
      })
    } catch (error){
      throw new Error(error);
    }
});

module.exports={
     createuser, 
     loginuserctrl, 
     getalluser, 
     getauser, 
     deleteauser, 
     updateauser, 

};