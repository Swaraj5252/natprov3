import { LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW, CLEAR_FILTER, UPDATE_SORT, UPDATE_FILTER, SORT_PRODUCTS,  FILTER_PRODUCTS, } from '../action'

const FilterProReducer = (state, action) => {

    if (action.type === LOAD_PRODUCTS) {
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

    if (action.type === SET_GRIDVIEW) {
        return { ...state, gridView: true }

    }
    if (action.type === SET_LISTVIEW) {
        return { ...state, gridView: false }
    }

    if (action.type === UPDATE_SORT) {
        return{
            ...state,
            sort: action.payload
        }
    }

    if (action.type === UPDATE_FILTER) {
        const {name, value} = action.payload
        return{
            ...state,
            filter: {...state.filter, [name]: value}
        }
    }

    if (action.type === SORT_PRODUCTS) {
        const {sort, filteredProducts } = state
        let tempProducts = [...filteredProducts]
        if (sort === 'price-lowest') {
            tempProducts = tempProducts.sort((a, b) => a.price - b.price)
        }
        if (sort === 'price-highest') {
            tempProducts = tempProducts.sort((a, b) => b.price - a.price)

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
        return { ...state, filteredProducts: tempProducts }
    }

    if (action.type === FILTER_PRODUCTS) {
        // console.log("filtering products.....");
        const {allProducts} = state
        const {text, category, careLevel, shipping, price} = state.filter
        let tempProducts = [...allProducts]
        // filtering start from here

        // text filtering [search input]
        if (text) {
            tempProducts = tempProducts.filter((product) => {
                return product.name.toLowerCase().startsWith(text)
            })
        }

        // category filtering
        if (category !== "all") {
            tempProducts = tempProducts.filter(product => product.category == category)
        }

        // careLevel
        if (careLevel !== "all") {
            tempProducts = tempProducts.filter(product => product.careLevel === careLevel)
        }

        // price filtering
        tempProducts = tempProducts.filter((product) => product.price <= price)

        // shipping filtering
        if (shipping) {
            tempProducts = tempProducts.filter((product) => product.shipping === true)
        }       

        return{
            ...state, filteredProducts: tempProducts
        }
    }


     if (action.type === CLEAR_FILTER) {
        return {
                 ...state,
                filter: {
                    ...state.filter,
                    text: '',
                    category: "all",
                    careLevel: "all",
                    price: state.filter.maxPrice,
                    shipping: false,
                }
        }
    }

}

export default FilterProReducer;
