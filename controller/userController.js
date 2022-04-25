import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";
import Records from '../models/Records.js'
import Product from '../models/ProductsModels.js'
import valid from "../utility/validate.js";
import Daily from '../models/dailyModel.js';

// Sign In
export const SignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.login_check(email, password);
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        clearance: user.clearance,
        root: user.root,
      },
      id: user._id,
      token: token,
    });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

//Sign Up
export const SignUp = async (req, res) => {
  try {
    const { name, email, password, cf_password } = req.body;
    const errMsg = valid(name, email, password, cf_password);
    if (errMsg) return res.status(400).json({ err: errMsg });
    const user = await Users.findOne({ email: email });
    if (user) return res.status(400).json({ msg: "The email already exist" });
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      name,
      email,
      password: passwordHash,
      cf_password,
    });
    res.status(201).json({ status: "Succeess" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

export const secretContent = async (req, res) => {
  console.log("REQ USER");
  console.log(req.user._id);
  res.status(200).json({ status: "success", message: req.user });
};
// Log Out
export const LogOut = async (req, res, next) => {
  res.cookie("token", "expiredtoken", { httpOnly: true, maxAge: -1 });
  res.status(200).json({ status: "Logged Out" });
};

export const clearanceLevel = (...clearanceLevel) => {
  return (req, res, next) => {
    console.log(req.user.clearance);
    clearanceLevel.includes(req.user.clearance)
      ? next()
      : res.json({
          status: "unaothorize",
          message: "Content not available at your current clearance level",
        });
  };
};

export const getRecords = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if(!token){
      console.log(`there is ${token}`)
      const records = await Records.find({});
      res.json({message:records,token:token});
    }
    else{
      res.json({message:'there is no token'});
    }
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    let users = await Users.findOne({title:'Towels content'});
    res.json({message:users});
  } catch (err) {
    next(err);
  }
};

export const Products = async(req,res,next)=>{
  const hero = req.body;
  const { name } = req.body;
  try {
    const product = await Product.findOne({ name: name });
    if ( product ) return res.status(400).json({ msg: "The products already exist" });
    const newProduct = await Product.create(hero);
    res.status(201).json({ status: "Succeess" });
  } catch (error) {
    
  }
}

export const getProducts = async(req,res,next)=>{
  try {
    let getProd = await Product.find({});
    res.status(200).json({product:getProd});
  } catch (error) {
    
  }
}

export const saveDaily = async(req,res,next)=>{
  const  { product,gram,result} = req.body
  console.log(result)
  
  try {
    const saved = await Daily.create({
      dailyNutritions:result
    });
    res.status(200).json({msg:saved})
  } catch (error) {
    
  }
}

export const getDaily = async(req,res,next)=>{
  try {
    let getDaily = await Daily.find({})
    res.status(200).json({message:getDaily})
  } catch (error) {
    
  }
}