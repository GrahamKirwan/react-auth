import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider(props) {
   

    const [userIsLoggedIn, setuserIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    function loginHandler(token) {
        setToken(token);
        setuserIsLoggedIn(true);
    }

    function logoutHandler() {
        setToken(null);
        setuserIsLoggedIn(false);
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