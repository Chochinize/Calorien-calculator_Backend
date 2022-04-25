import express from "express";
const router  = express.Router();
import {  SignIn, SignUp ,LogOut, secretContent, clearanceLevel, getRecords, Products, getProducts,saveDaily,getDaily } from '../controller/userController.js'
import { auth } from "../middleware/authMiddleware.js";
import { isAdmin } from '../middleware/isAdmin.js'





router.get('/gProduct',getProducts);
router.post('/daily',saveDaily)
router.get('/getDaily', getDaily)
router.post('/Products',Products);
router.route('/').get(getRecords);
router.post('/login', SignIn)
router.post('/SignUp',  SignUp)
router.get('/LogOut',LogOut)


router.use(auth,clearanceLevel('level 1')); 

router.get('/secretContent',secretContent);








export default router;


















































// router.post('/post',verifyToken,(req,res)=>{
    //     console.log('check request token',req.token)
    //     jwt.verify(req.token, 'secret',(err,authData)=>{
    //         if(err){
    //             res.sendStatus(403);
    //         }else{
    
    //             res.json({
    //                 message:'Post created...',
    //                 authData,
    //             })
    //         }
    //     })
    // })