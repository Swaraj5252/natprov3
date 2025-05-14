import { USER_START, USER_FAILIURE, USER_SUCCESS, USER_LOGOUT, USER_CART_START, USER_CART_SUCCESS, USER_CART_FAIL, ADMIN_FAILURE, ADMIN_START, ADMIN_SUCCESS, ADMIN_LOGOUT} from "../action"

const loginReducer = (state, action) => {
    if (action.type === USER_START) {
        return{
            user: action.payload,
            admin: null,
            userFetching: true,
            userError: false
        }
    }
    if (action.type === USER_FAILIURE) {
        return{
            user: null,
            admin: null,
            userFetching: false,
            userError: true
        }
    }
    if (action.type === USER_SUCCESS) {
        return{
            admin: null,
            user: action.payload,
            userFetching: false,
            userError: false
        }
    }
    if (action.type === USER_LOGOUT) {
        return{
            user: null,
            admin: null,
            userFetching: false,
            userError: false
        }
    }
    if (action.type === USER_CART_START) {
        return{
            ...state,
            userFetching:true,
            admin: null,
        }
    }
    if (action.type === USER_CART_SUCCESS) {
        return{
            user: action.payload,
            userFetching:false,
            userError: false,
            admin: null,
        }
    }
    if (action.type === USER_CART_FAIL) {
        return {
            user: state.user,
            userFetching: false,
            admin: null,
            userError: true,
        }
    }
    if (action.type === ADMIN_START) {
        return{
            user: action.payload,
            admin: null,
            adminFetching: false,
            adminError: false
        }
    }
    if (action.type === ADMIN_SUCCESS) {
        return{
            admin: action.payload,
            user: null,
            adminFetching: false,
            adminError: false
        }
    }
    if (action.type === ADMIN_FAILURE) {
        return{
            user: action.payload,
            admin: null,
            adminFetching: false,
            adminError: false
        }
    }
    if (action.type === ADMIN_LOGOUT) {
        return{
            user: null,
            admin: null,
            adminFetching: false,
            adminError: false
        }
    }
}

export default loginReducer