import {ADD_CART} from "../action"

const cartReducer = (state, action) => {
if (action.type === ADD_CART) {
    const {id, quantity, product} = action.payload
    const tempItem = state.cart.find((i) => i.id === id)
    if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
            if (cartItem === id) {
                let newQuantity = cartItem.quantity + quantity
                if (newQuantity > cartItem.max) {
                    newQuantity = cartItem.max
                }return {...cartItem, quantity: newQuantity}
            }else return cartItem
        })
        return {...state, tempCart}
        }else{
            const newItem = {
                id: id,
                name: product.name,
                quantity,
                image: product.photo,
                price: product.price,
                max: product.stock
            }
            return {...state, cart:[...state.cart, newItem]}
        
    }
}
}

export default cartReducer