import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
   
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);

    const userIsLoggedIn = !!token;

    function loginHandler(token) {
        setToken(token);
        localStorage.setItem('token', token);
    }

    function logoutHandler() {
        setToken(null);
        localStorage.removeItem('token');
    }

    const context = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    )
}