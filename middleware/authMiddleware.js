import jwt from "jsonwebtoken";
import Users from './../models/userModel.js'








export const auth =  (req,res,next)=>{
    const token = req.cookies.token;
    
    console.log('this is toaaaaaken', token)
try {
  if( token ){
    jwt.verify(token,    process.env.ACCESS_TOKEN_SECRET, async (err,decodedToken)=>{
        if(err){
            res.redirect('/login')
        }else{

            let user = await Users.findById(decodedToken.id);
            req.user = user;
            next();
        }
    })
}else{
    
    res.status(401).json({msg:'You have to be logged in to see this content'})
}
} catch (error) {
  return res.status(401).json({ msg: error });
}

}