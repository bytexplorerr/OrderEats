import { createContext } from "react";
import { useState } from "react";
export const ActiveMenuContext = createContext();
export const ActiveMenuContextProvider = ({children})=>{
    const [category,setCategory] = useState("All");

    return(
        <ActiveMenuContext.Provider value = {{category,setCategory}}>
            {children}
        </ActiveMenuContext.Provider>
    )
};