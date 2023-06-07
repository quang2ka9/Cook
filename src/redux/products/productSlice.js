import {createSlice} from "@reduxjs/toolkit";
import {
    addProduct,
    deleteProduct,
    editProduct,
    findProductById,
    getProduct,
    searchProduct
} from "../../services/productService";

const initialState = {
    list: {
        products: []
    },
    currentProduct: {},
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: builder =>{
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.list.products = action.payload;
        });

        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.list.products = action.payload;

        });

        builder.addCase(editProduct.fulfilled, (state, action) => {
            state.list.products = action.payload;

        });


        builder.addCase(deleteProduct.fulfilled,(state,action) => {
            const id = action.payload;
            const index = state.list.products.findIndex(item => item.id === id);
            if (index !== -1){
                state.list.products.splice(index,1)
            }
        });

        builder.addCase(findProductById.fulfilled,(state,action) => {
            state.currentProduct = action.payload;
        });

        builder.addCase(searchProduct.fulfilled, (state, action) => {
            state.list.products = action.payload;

        });
    }
});

export default productSlice.reducer;