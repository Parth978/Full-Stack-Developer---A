import { createContext, useState } from "react";

const userContext = createContext();

export const Provider = ({children}) => {
    const [user, setUser] = useState("");
    const value = {
        user : user,
        setUser : setUser,
    }
    return(
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}

export default userContext;