import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from "./Context/themeContext"
import {LoginProvider} from "./Context/loginContext"
import {ProductProvider} from "./Context/ProductContext"
import {FilterProProvider} from "./Context/FilterProContext"
import { AdminFilterProvider } from './Context/AdminFilterContext';
import {CartProvider} from "./Context/CartContext"

// important point to note that place filterprovider inside the product provider because we are getting data from product provider so productprovider must be above the filterprovider
ReactDOM.render(
  <React.StrictMode>
      <ProductProvider>
        <AdminFilterProvider>
          <FilterProProvider>
          <LoginProvider>
            <ThemeProvider>
              <CartProvider>
                <App/>
              </CartProvider>
            </ThemeProvider>
          </LoginProvider>
          </FilterProProvider>
        </AdminFilterProvider>
      </ProductProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
