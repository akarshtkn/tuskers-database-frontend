import { createContext, useState, ReactNode, Dispatch, SetStateAction, useContext } from "react";
import { User } from "../types/Types";

interface AuthContextType {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

type Props = { children: ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider:React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<User>({} as User);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

export { AuthProvider, useAuth };
