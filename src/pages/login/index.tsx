import { useState } from "react";
import Button from "../../components/button";
import InputBox from "../../components/inputbox";
import { LoginRequest } from "../../types/props";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

const initialValue:LoginRequest = {
    username:"",
    password:"",
}

const Login = () => {
    const [loginDetails, setLoginDetails] = useState<LoginRequest>(initialValue);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, property:keyof LoginRequest) => {
        setLoginDetails({...loginDetails, [property]:e.target.value});
    }

    const handleLogin = () => {}

  return (
    <div className="flex justify-center items-center h-screen w-full bg-zinc-900">
        <form onSubmit={handleLogin}>
        <div className="flex flex-col rounded-lg bg-zinc-800 h-80 w-96 p-6 gap-10">
                <InputBox label="Username" placeholder="Enter username" value={loginDetails.username} onChange={(e) => handleChange(e,"username")}/>
                <InputBox label="Password" placeholder="Enter password" value={loginDetails.password} onChange={(e) => handleChange(e,"password")}/>
                <Button type="submit" label="Sign In" width={80} Icon={ ArrowRightIcon } disabled={false}/>
        </div>
        </form>
    </div>
  )
}

export default Login;