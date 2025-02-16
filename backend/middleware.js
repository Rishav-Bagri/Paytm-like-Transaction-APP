const jwt=require("jsonwebtoken")
const {JWT_SECRET} = require("./config")


const authMiddleware=(req,res,next)=>{
    const auth=req.headers.authentication
    if(!auth || !auth.startsWith('Bearer ')){
        return res.status(403).json({})
    }
    const token=auth.split(' ')[1]

    try{
        const decoded=jwt.verify(token,JWT_SECRET)
        if(decoded.userId){
        req.userId=decoded.userId
        next()
        }
        else return res.status(403).json({
            message:"auth middleware problem"
        })
    }
    catch(err){
        return res.status(403).json({
            message:"auth middleware problem"
        })
    }
}

module.exports={
    authMiddleware
}