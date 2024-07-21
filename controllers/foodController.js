import foodModel from "../models/foodModel.js";

import fs from 'fs'


// add the food items

const addFood = async (req,res)=>{
  
  let image_filename=`${req.file.filename}`
  const food = new foodModel({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    category:req.body.category,
    image:image_filename

  })
  try {
    console.log("hello ")
    await food.save();
    res.json({sucess:"true",message:"food added"})
  } catch (error) {
    console.log(err)
    res.json({sucess:false,message:"Error"})
    
  }
}

//all foodlist 
const listFood=async(req,res)=>{
  try {
    const foods=await foodModel.find({});
      res.json({Sucess:true,data:foods})
    
    
  } catch (error) {
     console.log(error)
     res.json({sucess:false,message:"error"})
  }
}

//Remove food items
const removeFood=async(req,res)=>{
  try {
    const food=await foodModel.findById(req.body.id)
    fs.unlink(`uploads/${food.image}`,()=>{})
    await foodModel.findByIdAndDelete(req.body.id)
    res.json({Sucess:true,message:"Food Removed"})
    
  } catch (error) {
    console.log(error)
    res.json({sucess:false,message:"error"})
    
  }

}
export {addFood,listFood,removeFood}
