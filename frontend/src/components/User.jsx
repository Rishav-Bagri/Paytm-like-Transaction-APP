import { useEffect, useState } from "react"
import { Button } from "./Button"
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import axios from "axios"


export const Users = () => {
    const [user,setUser]=useState([])
    const [filter,setFilter]=useState("")
    const url=`http://localhost:3000/api/v1/user/bulk?filter=${filter}`
    useEffect(()=>{
        if(filter=="")return;
        axios.get(url,{
            headers:{
                authentication:"Bearer "+localStorage["token"]
            },
            data:{
                filter:filter
            }
        })
        .then((response)=>{
            setUser(response.data.user)
            
        })
    },[filter])
    var i=0
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {user.map(user => <User key={i++} user={user} />)}
        </div>
    </>
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                </div>
                <div className="text-sm text-gray-500">
                    {user.userName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&firstName=" + user.firstName + "&lastName=" + user.lastName);
            }} label={"Send Money"} />
        </div>
    </div>
}