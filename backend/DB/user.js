const mongoose=require("mongoose")

mongoose.connect('lol');
  
const userSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // Amount: {
    //     type: Number,
    //     required:true
    // }
})

const User= mongoose.model("User",userSchema)

const accountSchema=new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    balance: Number
})

const Account= mongoose.model('Account',accountSchema)

module.exports={
    User,
    Account,
}
