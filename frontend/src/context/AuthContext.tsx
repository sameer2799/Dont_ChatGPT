import { createContext, useContext, useEffect, useState } from "react";
import { checkAuthStatus, loginUser, logoutUser, signupUser } from "../helpers/api-communicator";
import React from "react";

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
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

    useEffect(() => {
        // fetch if user is logged in (in cookies and valid) then skip login
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data){
                setUser({ username: data.name, email: data.email });
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);

    const login = async (email: string, password: string) => {
        // fetch login using fn loginUser from api-communicator inside helpers
        const data = await loginUser(email, password);
        if (data){
            setUser({ username: data.name, email: data.email });
            setIsLoggedIn(true);
        }

    };
    const signup = async (username: string, email: string, password: string) => {
        // fetch signup api
        const data = await signupUser(username, email, password);
        if (data){
            setUser({ username: data.username, email: data.email });
            setIsLoggedIn(true);
        }
    };
    const logout = async () => {
        // fetch logout api
        await logoutUser();
        setUser(null);
        setIsLoggedIn(false);
        window.location.reload();
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