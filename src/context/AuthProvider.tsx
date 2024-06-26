import { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { User } from "../types/NewTypes";

interface AuthContextType {
    auth: User;
    setAuth: Dispatch<SetStateAction<User>>;
}

type Props = { children: ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider:React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState<User>({} as User);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
