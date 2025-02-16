import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import axios from "axios"

export const SendMoney=()=>{
    const [searchParams]=useSearchParams()
    const [amount,setAmount]=useState(0)
    const navigate=useNavigate()
    return <div className="h-screen flex justify-center bg-gray-100">
        
        <div className="h-full flex flex-col justify-center p-10">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">

                <div className="flex flex-col space-y-1.5 p-6">
                    <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="p-6">

                    <div className="flex items-center space-x-4 ">
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                            <span class="text-2xl text-white">
                                {(searchParams.get("firstName").split('')[0])}
                                
                            </span>
                        </div>
                        <div className="text-2xl font-semibold">
                            <h3 className="text-2xl font-semibold">
                                {searchParams.get("firstName")} {searchParams.get("lastName")}
                            </h3>
                        </div>
                    </div>
                    <div>
                        <label
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            for="amount"
                        >
                            Amount (in Rs)
                        </label>
                    </div>
                    <div className="my-2 ">

                        <input type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        onChange={(e)=>{
                            setAmount(e.target.value)
                        }}
                        placeholder="Enter amount"  />
                    </div>
                    
                    <button 
                        onClick={async() => {
                            const response = await axios.post("http://localhost:3000/api/v1/account/transfer", 
                                {   // This is the request body
                                    to: searchParams.get("id"),
                                    amount: amount
                                }, 
                                {   // This is the configuration object (headers, etc.)
                                    headers: {
                                        authentication: "Bearer " + localStorage.getItem("token") // Correct header key
                                    }
                                }
                            );
                            
                            console.log("HI")
                            console.log(response)
                            alert(response.data.message)
                            
                            navigate(-1)
                        }} 
                        className="justify-center rounded-md text-sm font-medium ring-offset-background transition-all h-10 px-4 py-2 w-full bg-green-500 text-white cursor-pointer hover:bg-green-600 active:scale-95"
                    >
                        Initiate Transfer
                    </button>

                    
                </div>
            </div>
        </div>
    </div>
}
