const { JWT_SECRET } = require("../config");
const  { Account, User } =require( "../DB/user");
const { authMiddleware } =require( "../middleware");
const jwt=require("jsonwebtoken")
const zod=require("zod");

const express=require("express")

const router = express.Router();

const signupSchema=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    userName:zod.string(),
    password:zod.string()
})
const signinSchema=zod.object({
    userName:zod.string(),
    password:zod.string()
})

const inputMiddleware=(req,res,next)=>{
    const body=req.body
    const {success}=signupSchema.safeParse(body)
    if(!success){
        return res.json({
            message: "wrong inputs"
        })
    }
    next()
}

const DBcheckMiddleware=async(req,res,next)=>{
    const name=req.body.userName
    const user=await User.findOne({
        userName:name
    })
    if(user){
        return res.json({
            message: "Email already taken/ wrong inputs"
        })
    }
    next()
}

router.post("/signup",inputMiddleware,DBcheckMiddleware,async (req,res)=>{
    const body=req.body
    const DBuser=await User.create(body)
    const DBuserId=DBuser._id
    await Account.create({
        userId: DBuserId,
        balance: (1+Math.random()*10000)
    })
    const token=jwt.sign({
        userId: DBuser._id
    },JWT_SECRET)
    res.json({
        message: "User Created Succesfully",
        token:token
    })
})
const signIninputMiddleware=async (req,res,next)=>{
    const body=req.body
    const {success}= signinSchema.safeParse(body)
    if(!success){
        return res.json({
            message: "wrong inputs"
        })
    }
    next()
}
const signInDBcheckMiddleware=async (req,res,next)=>{
    const name=req.body.userName
    const user=await User.findOne({
        userName:name
    })
    if(!user._id){
        return res.json({
            message: "User not found"
        })
    }
    const pass=req.body.password

    if(user.password!=pass){
        return res.json({
            message: "Wrong password"
        })
    }
    next()
}
router.post("/signin",signIninputMiddleware,signInDBcheckMiddleware,async (req,res)=>{
    const body=req.body
    const DBuser=await User.findOne({
        userName:body.userName
    })
    const token=jwt.sign({
        userId: DBuser._id
    },JWT_SECRET)
    res.json({
        message: "User log in Succesfully",
        token:token
    })
})




router.put('/update-info',authMiddleware,async(req,res)=>{
    const user=req.body.userName
    const updates=req.body.updates
    
    try{
        const DBuser=await User.findOne({userName:user})
        if (!DBuser) return res.status(404).json({ message: "User not found" });
        if(updates.firstName){
            DBuser.firstName=updates.firstName
        }
        if(updates.password){
            DBuser.password=updates.password
        }
        if(updates.lastName){
            DBuser.lastName=updates.lastName
        }
        
        const updated=await DBuser.save()
        if(updated){
            return res.json({
                message:"user updated succesfully"
            })
        }
    }catch(err){
        return res.json({
            message:"failed to save"
        })
    }
})


router.get('/bulk',authMiddleware,async(req,res)=>{
    searchName=req.query.filter||""
    const names=await User.find({
        $or: [{
            firstName:{
                "$regex": searchName
            }
        },{
            lastName:{
                "$regex":searchName
            }
        }]
    })
    
    res.json({
        user:names.map(user=>({
            userName:user.userName,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })

    
    
})











module.exports=router