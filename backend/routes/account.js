const express=require("express")
const { authMiddleware } = require("../middleware")
const { User, Account } = require("../DB/user")
const { default: mongoose } = require("mongoose")
const router=express.Router()

router.get('/balance',authMiddleware,async(req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account.balance  
    })
})

router.post('/transfer',authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession()
    
    session.startTransaction()
    const {amount,to}=req.body;
    const account=await Account.findOne({
        userId:req.userId 
    })
    if(!account||account.balance<amount){
        await session.abortTransaction()
        console.log(account);
        
        return res.json({
            message:"insufficient balance"
        })
    }
    
    const toAccount=await Account.findOne({
        userId:to
    })
    console.log("ok");
    if(!toAccount){
        await session.abortTransaction()
        return res.json({
            message:"invalid account"
        })
    }
    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{
            balance:-amount
        }
    })
    await Account.updateOne({
        userId:to
    },{
        $inc:{
            balance:amount
        }
    })

    session.commitTransaction()
    res.json({
        message:"Transfer succesful"
    })
})



module.exports=router