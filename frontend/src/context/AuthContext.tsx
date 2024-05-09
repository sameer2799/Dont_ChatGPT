import { createContext, useContext, useEffect, useState } from "react";


type User = {
    username: string;
    email: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string, username: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [ user, setUser ] = useState<User | null>(null);
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(true);

    useEffect(() => {
        // fetch if user is logged in (in cookies and valid) then skip login
    });

    const login = async (email: string, password: string) => {
        // fetch login api
    };
    const signup = async (email: string, password: string, username: string) => {
        // fetch signup api
    };
    const logout = async () => {
        // fetch logout api
    };

    const value = {
        isLoggedIn,
        user,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);