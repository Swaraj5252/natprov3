import { LOAD_ADMIN_PRODUCTS, SORT_ADMIN_PRODUCTS, UPDATE_ADMIN_FILTER, UPDATE_ADMIN_SORT, FILTER_ADMIN_PRODUCTS, CLEAR_ADMIN_FILTER } from '../action'

const adminFilterReducer = (state, action) => {
    if (action.type === LOAD_ADMIN_PRODUCTS) {            
        let maxPrice = action.payload.map((p) => p.price)
        maxPrice = Math.max(...maxPrice)
        let minPrice = action.payload.map((p) => p.price)
        minPrice = Math.min(...minPrice)
        return{
            ...state, allProducts: [...action.payload], filteredProducts: [...action.payload],
            filter: {
                ...state.filter,
                minPrice: minPrice,
                maxPrice: maxPrice,
                price: maxPrice,
            }
        }
    }

    if (action.type === UPDATE_ADMIN_SORT) {
        return {...state, sort: action.payload}
    }

    if (action.type === UPDATE_ADMIN_FILTER) {
        const {name, value} = action.payload
        return{
            ...state,
            filter: {...state.filter, [name]: value}
        }
    }

    if (action.type === SORT_ADMIN_PRODUCTS) {
        const { sort, filteredProducts } = state
        let tempProducts = [...filteredProducts]

        if (sort === 'price-lowest') {
            tempProducts = tempProducts.sort((a, b) => a.price - b.price)
        }

        if (sort === 'price-highest') {
            tempProducts = tempProducts.sort((a,b) => b.price - a.price)
        }

        if (sort === 'name-a') {
            tempProducts = tempProducts.sort((a, b) => {
                return a.name.localeCompare(b.name)
            })
        }

        if (sort === 'name-z') {
            tempProducts = tempProducts.sort((a, b) => {
                return b.name.localeCompare(a.name)
            })
        }

        if (sort === 'stock-lowest') {
            tempProducts = tempProducts.sort((a, b) => a.stock - b.stock)
        }

        if (sort === 'stock-highest') {
            tempProducts = tempProducts.sort((a, b) => b.stock - a.stock)
        }
        return{...state, filteredProducts: tempProducts}
    }

    if (action.type === FILTER_ADMIN_PRODUCTS) {
        const {allProducts} = state
        const {text, careLevel, shipping, price} = state.filter
        let tempProducts = [...allProducts]

        // filtering start from here
        if (text) {
            tempProducts = tempProducts.filter((product) => {
                return product.name.toLowerCase().startsWith(text)
            })
        }

        if (careLevel !== "all") {
            tempProducts = tempProducts.filter((product) => product.careLevel === careLevel)
        }

        if (shipping) {
            tempProducts = tempProducts.filter((product) => product.shipping === true)
        }
        tempProducts = tempProducts.filter((product) => product.price <= price)

        return{
            ...state, filteredProducts: tempProducts
        }
    }

    if (action.type === CLEAR_ADMIN_FILTER) {
        return {
            ...state, 
            filter: {
                    ...state.filter,
                    text: '',
                    careLevel: "all",
                    price: state.filter.maxPrice,
                    shipping: false,
                }
        }
    }
    
}

export default adminFilterReducer