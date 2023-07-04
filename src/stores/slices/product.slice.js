import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const findAllProducts = createAsyncThunk("findAllProducts", async () => {
    let res = await axios.get(process.env.REACT_APP_SERVER_JSON + "products");
    return res.data;
});
// lays ra tung san pham
const filterProduct = createAsyncThunk("filterProduct", async (type) => {
    let res = await axios.get(
        `${process.env.REACT_APP_SERVER_JSON}products?type=${type}`
    );
    return res.data;
});
// click tung san pham
const searchProductById = createAsyncThunk(
    "searchProductById",
    async (id) => {
        let res = await axios.get(`${process.env.REACT_APP_SERVER_JSON}products?id=${id}`)
        return res.data
    });
// delete product
const deleteProductById = createAsyncThunk(
    "deleteProductById",
    async (id) => {
        //http://localhost:4000/users/1
        let res = await axios.delete(`${process.env.REACT_APP_SERVER_JSON}products?id=${id}`);
        return res.data
    }
)
// phan trang
const paginateProduct = createAsyncThunk("paginateProduct", async (dataObj) => {
    let res = await axios.get(
        `http://localhost:4000/products?_page=${dataObj.nowPage}&_limit=${dataObj.maxItemPage}`
    );
    return {
        data: res.data,
        maxPage: res.headers["x-total-count"],
    };
});

const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        listProducts: [],
        maxPage: null,
    },
    extraReducers: (builder) => {
        // find all products
        builder.addCase(findAllProducts.fulfilled, (state, action) => {
            state.listProducts = [...action.payload];
        });

        // filter products by type
        builder.addCase(filterProduct.fulfilled, (state, action) => {
            state.listProducts = [...action.payload];
        });

        // phan trang
        builder.addCase(paginateProduct.fulfilled, (state, action) => {
            state.listProducts = action.payload.data;
            state.maxPage = action.payload.maxPage;
        });

        // search product by id
        builder.addCase(searchProductById.fulfilled, (state, action) => {
            state.listProducts = [...action.payload];
        });
        // delete product
        builder.addCase(deleteProductById.fulfilled, (state, action) => {
            console.log("đã vào fulfilled", action.payload)
            state.listProducts = state.listProducts.filter(product => product.id !== action.payload)
        });

        // xử lý các pending và rejected
        builder.addMatcher(
            (action) => {
                if (action.meta) {
                    return action;
                }
            },
            (state, action) => {
                if (action.meta) {
                    if (action.meta.requestStatus === "pending") {
                        //console.log("đã vào pending của api: ", action.type)
                        // if (action.type == "deleteUserByid/pending") {
                        //     console.log("trường hợp pending của api delete")
                        // }
                        state.loading = true;
                    }
                    if (action.meta.requestStatus === "rejected") {
                        //console.log("đã vào rejected của api: ", action.type)
                        state.loading = false;
                    }
                    if (action.meta.requestStatus === "fulfilled") {
                        //console.log("đã vào fulfilled của api: ", action.type)
                        state.loading = false;
                    }
                }
            }
        );
    },
});

export const productActions = {
    ...productSlice.actions,
    findAllProducts,
    filterProduct,
    paginateProduct,
    searchProductById,
    deleteProductById
};
export default productSlice.reducer;
