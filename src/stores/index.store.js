import { configureStore } from "@reduxjs/toolkit";

import counterReducer from './slices/counter.slice'
import userLoginReducer from './slices/userLogin.slice'
import productReducer from "./slices/product.slice"


const store = configureStore(
    {
        reducer: {
            counterStore: counterReducer,
            productStore: productReducer,
            userLoginStore: userLoginReducer,

        }
    }
)

export default store