import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import InputBox from "../../components/inputbox/InputBox";
import Alert from "../../components/alert/Alert";
import Loader from "../../components/loader/Loader";
import AuthService from "../../service/AuthService";
import AuthContext from "../../context/AuthProvider";
import { ApiError, LoginCredentials } from "../../types/Types";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import * as Yup from 'yup';

const initialValue:LoginCredentials = {
    username: '',
    password: '',
}

let UserSchema = Yup.object().shape({
  username: Yup.string().required('Username is required').email('Username is inavlid'),
  password: Yup.string().required('Password is required'),
})

const Login = () => {
    const [loginDetails, setLoginDetails] = useState<LoginCredentials>(initialValue);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<ApiError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<Record<string,string>>({});
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>, property:keyof LoginCredentials) => {
        setLoginDetails({...loginDetails, [property]:e.target.value});
    }

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setValidationErrors({});
      setError(null);
      
      try{
        await UserSchema.validate(loginDetails, { abortEarly: false });
        
        let { data, error } = await AuthService.login(loginDetails);
        if (data) {
          setSuccess(true);
          setAuth(data);
          setLoading(false);
          setTimeout(() => {
            navigate('/');
            setSuccess(false);
          }, 2000)
        } else {
          setError(error);
          setLoading(false);
          setTimeout(() => {
            setError(null);
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
          <form onSubmit={handleLogin}>
          <div className="flex flex-col rounded-lg bg-zinc-800 h-fit w-96 p-6 gap-10">
            <InputBox label="Username" type="text" value={loginDetails.username} placeholder="Enter username" onChange={(e) => handleChange(e,"username")} error={validationErrors.username}/>
            <InputBox label="Password" type="password" value={loginDetails.password} placeholder="Enter password" onChange={(e) => handleChange(e,"password")} error={validationErrors.password}/>
            <div className="flex items-center h-9">
              <Button type="submit" label="Login" Icon={ ChevronRightIcon } />
            </div>
          </div>
          </form>
      {loading && <Loader />}
      {success && <div className="w-96"><Alert isSuccess={true} isFailure={false} message="Login Successfull. Redirecting to home page" /></div>}
      {error && <div className="w-96"><Alert isSuccess={false} isFailure={true} message={error.message} /></div>}
    </div>
  )
}

export default Login;