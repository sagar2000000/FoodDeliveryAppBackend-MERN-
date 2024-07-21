import UserModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'



//login user

const loginUser=async(req,res)=>{



}
const createToken=(id)=>{
return jwt.sign({id},process.env.JWT_SECRET)
}


//register user

const registerUser=async (req,res)=>{
   const {name,password,email}=req.body
try {
    const exists=await UserModel.findOne({email})
    if (exists) {

      return res.json({sucess:false,message:"User with this email already exists"})
      
    } 
    if(!validator.isEmail(email)){
      return res.json({sucess:false,message:"Please enter a valid email"})
    }
    if(password.length<8){
      return res.json({sucess:false ,message:"Please enter a strong password"})
    }

    //hashing user password

    const salt=await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)
     

    const newUser=new UserModel({
      name,
      email,
      password:hashedPassword
    })

    const user=await newUser.save()
    const token=createToken(user._id)
    res.json({sucess:true,token})


} catch (error) {
  console.log(error)
  res.json({sucess:false,message:"Error"})
}
}



export  {loginUser,registerUser}