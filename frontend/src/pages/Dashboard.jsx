import { useEffect, useState } from "react"
import { Appbar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import {  Users } from "../components/User"
import axios from "axios"

export const Dashboard=()=>{
    const [amount,setAmount]=useState()
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{   // This is the configuration object (headers, etc.)
            headers: {
                authentication: "Bearer " + localStorage.getItem("token") // Correct header key
            }
        }).then((response)=>{
            console.log(response.data.balance);
            
            setAmount(response.data.balance)
        })
    },[])
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={amount}/>
            <Users />
        </div>
    </div>
}
