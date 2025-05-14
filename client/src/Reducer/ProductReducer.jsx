import {PRODUCTS_BEGIN, PRODUCTS_ERROR, PRODUCTS_SUCCESS} from "../action";

const productReducer = (state, action) => {

    if (action.type === PRODUCTS_BEGIN) {
        return{...state, productsLoading: true, productsError: false}
    }

    if (action.type === PRODUCTS_SUCCESS) {
        return{...state, productsLoading: false, productsError: false, products: action.payload, adminProducts: action.payload}
    }

    if (action.type === PRODUCTS_ERROR) {
        return{...state, productsLoading: false, productsError: true}
    }
}

export default productReducer