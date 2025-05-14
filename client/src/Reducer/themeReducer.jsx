import { LIGHTMODE, DARKMODE, OPENSIDEBAR, CLOSESIDEBAR, OPEN_ADMIN_SIDEBAR, CLOSE_ADMIN_SIDEBAR, OPEN_FILTER_BAR, CLOSE_FILTER_BAR } from "../action";

const themeReducer = (state, action) => {
    if (action.type === LIGHTMODE) {
        return{...state, darkMode: false}
    }
    if (action.type === DARKMODE) {
        return{...state, darkMode: true}
    }
    if (action.type === OPENSIDEBAR) {
        return { ...state, sideBar: true}
    }
    if (action.type === CLOSESIDEBAR) {
        return { ...state, sideBar: false }
    }
    if (action.type === OPEN_ADMIN_SIDEBAR) {
        return {...state, adminSideBar: true}
    }
    if (action.type === CLOSE_ADMIN_SIDEBAR) {
        return {...state, adminSideBar: false}
    }
    if (action.type === OPEN_FILTER_BAR) {
        return {...state, filterBar: true}
    }
    if (action.type === CLOSE_FILTER_BAR) {
        return {...state, filterBar: false}
    }
}

export default themeReducer