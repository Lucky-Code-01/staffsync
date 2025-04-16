import { createContext,useState,useContext} from "react";  

// create context
const LoginContext = createContext();

// provider component
export const LoginProvider = ({children})=>{
    const [isLoged,setisLoged] = useState(null);

    return (
        <LoginContext.Provider value={{isLoged,setisLoged}}>
            {children}
        </LoginContext.Provider>
    )
}

// create custom hook
export const useLogin = ()=> useContext(LoginContext);