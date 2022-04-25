import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
const  {Schema} = mongoose;



const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,


    },
    cf_password:{
        type:String,
        required:true,
        
    },
    clearance:{
        type:String,
        enum:['level 1','level 2', 'admin'],
        default:'level 1'
    },
    root:{
        type:Boolean,
        default:false,
        
    },
},{
    timestamps:true
}
)
userSchema.statics.login_check = async function(email,password){
    const user = await this.findOne({email});

    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect password')
    }
    throw Error('Incorrect email')

}

let Dataset = mongoose.models.user || mongoose.model('user',userSchema);
export default Dataset