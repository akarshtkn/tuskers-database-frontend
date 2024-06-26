import { useContext, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import InputBox from "../../components/inputbox/InputBox";
import { ErrorType, LoginCredentials } from "../../types/NewTypes";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import AuthService from "../../service/AuthService";
import Alert from "../../components/alert/Alert";
import AuthContext from "../../context/AuthProvider";
import { Loader } from "../../components/loader/Loader";
import * as Yup from 'yup';

const initialValue:LoginCredentials = {
    username: "",
    password: "",
}

let UserSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').email('Username is inavlid'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(40, 'Password must not exceed 40 characters'),
})

const Login = () => {
    const [loginDetails, setLoginDetails] = useState<LoginCredentials>(initialValue);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<ErrorType>({value: false, message: ''});
    const [loading, setLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Record<string,string>>({});
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      setSuccess(false);
      setError({ value: false, message: '' });
    }, [loginDetails.username, loginDetails.password])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, property:keyof LoginCredentials) => {
        setLoginDetails({...loginDetails, [property]:e.target.value});
    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setValidationErrors({});
      
      try{
        await UserSchema.validate(loginDetails, { abortEarly: false });
        let { data, error } = await AuthService.login(loginDetails);

        if (error) {
          setError({ value: true, message: error });
          setLoading(false);
        } else {
          setSuccess(true);
          setAuth(data);
          setLoading(false);
          setTimeout(() => {
            navigate('/');
          }, 2000)
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
            const errors: Record<string, string> = {};
            err.inner.forEach((error) => {
                if (error.path) {
                    errors[error.path] = error.message;
                }
            });
            setValidationErrors(errors);
        }
        setLoading(false);
      }
    }

  return (
    <div className="flex flex-col justify-center items-center  h-screen w-full bg-zinc-900 gap-2">
      <div className="flex">
          <form onSubmit={handleLogin}>
          <div className="flex flex-col rounded-lg bg-zinc-800 h-fit w-96 p-6 gap-10">
            <InputBox label="Username" type="text" value={loginDetails.username} placeholder="Enter username" onChange={(e) => handleChange(e,"username")} error={validationErrors.username}/>
            <InputBox label="Password" type="password" value={loginDetails.password} placeholder="Enter password" onChange={(e) => handleChange(e,"password")} error={validationErrors.password}/>
            <div className="flex items-center h-9">
              <Button type="submit" label="Login" Icon={ ChevronRightIcon } />
            </div>
          </div>
          </form>
      </div>
      {loading && <Loader />}
      {success && <div className="w-96"><Alert type="Success" response={{value:true, message:"Login Successfull. Redirecting to home page"}}/></div>}
      {error.value && <div className="w-96"><Alert type="Error" response={{value:true, message:error.message}}/></div>}
    </div>
  )
}

export default Login;