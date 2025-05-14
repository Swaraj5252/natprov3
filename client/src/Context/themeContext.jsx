import React,{useContext, useEffect, useReducer} from "react";
import reducer from "../Reducer/themeReducer"
import {LIGHTMODE, DARKMODE, OPENSIDEBAR, CLOSESIDEBAR, OPEN_ADMIN_SIDEBAR, CLOSE_ADMIN_SIDEBAR, OPEN_FILTER_BAR, CLOSE_FILTER_BAR} from "../action"

const INITIAL_STATE = {
    darkMode: JSON.parse(localStorage.getItem("Theme")),
    sideBar: false,
    adminSideBar: true,
    filterBar: true
}

const ThemeContext = React.createContext()

export const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

    useEffect(() => {
        localStorage.setItem("Theme", JSON.stringify(state.darkMode));
    }, [state.darkMode])

    const LightMode = () => {
        dispatch({type: LIGHTMODE})
    }

    const DarkMode = () => {
        dispatch({type: DARKMODE})
    }

    const openSidebar = () => {
        dispatch({type: OPENSIDEBAR})
    }

    const closeSidebar = () => {
        dispatch({type: CLOSESIDEBAR})
    }

    const openAdminSidebar = () => {
        dispatch({type: OPEN_ADMIN_SIDEBAR})
    }

    const closeAdminSidebar = () => {
        dispatch({type: CLOSE_ADMIN_SIDEBAR})
    }

    const openFilterBar = () => {
        dispatch({type: OPEN_FILTER_BAR})
    }

    const closeFilterBar = () => {
        dispatch({type: CLOSE_FILTER_BAR})
    }

    return <ThemeContext.Provider value={{...state, LightMode, DarkMode, openSidebar, closeSidebar, openAdminSidebar, closeAdminSidebar, openFilterBar, closeFilterBar }} >
        {children}
    </ThemeContext.Provider>
}

export const useThemeContext = () => {
    return useContext(ThemeContext)
}