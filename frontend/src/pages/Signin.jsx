import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin=()=>{
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">

                <Heading label={"Sign in"}/>
                <SubHeading label={"Enter your information to sign into your account"}/>
                <InputBox label={"Email"} placeholder={"example123@xyz.com"}/>
                <InputBox label={"Password"} placeholder={"123456"}/>
                <div>
                    <Button label={"Sign in"}/>
                </div>
                <BottomWarning label={"Already have an account? "} buttonText={"Sign in"} to={"/signup"} />
            </div>
        </div>
    </div>
}
 