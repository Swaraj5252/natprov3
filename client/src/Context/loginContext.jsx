import React,{useContext, useEffect, useReducer, createContext} from "react";
import reducer from "../Reducer/loginReducer"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("User")),
    userFetching: false,
    userError: false,
    admin: JSON.parse(localStorage.getItem("Admin")),
    adminFetching: false,
    adminError: false
}

const LoginContext = React.createContext()

export const LoginProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    useEffect(() => {
        localStorage.setItem("User", JSON.stringify(state.user))
        localStorage.setItem("Admin", JSON.stringify(state.admin))
    }, [state.user, state.admin])

    return(
        <LoginContext.Provider value={{
            user: state.user, 
            userFetching: state.userFetching, 
            userError: state.userError,
            admin: state.admin,
            adminFetching: state.adminFetching,
            adminError: state.adminError, dispatch}} >
            {children}
        </LoginContext.Provider>
    )

}

export const useLoginContext = () => {
    return useContext(LoginContext)
}