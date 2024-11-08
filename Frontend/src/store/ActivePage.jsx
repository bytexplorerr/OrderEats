import { createContext, useState } from "react";
export const ActivePageContext = createContext();
export const ActivePageContextProvider = ({ children })=>{
    const [activeLink,setActiveLink] = useState("Home");
    const [token,setToken] = useState("");
    const value = {
        activeLink,
        setActiveLink,
        token,
        setToken
    }
    return(
        <ActivePageContext.Provider value = {value}>
        {children}
        </ActivePageContext.Provider>
    );
}