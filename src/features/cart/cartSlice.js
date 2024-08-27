import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemList: [],
        noOfItems: {},
        totalPrice: {}
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.itemList.find((item) => (item.id == newItem.id) && (item.userEmail == newItem.userEmail));
            const userEmail = newItem.userEmail;
            if (existingItem)
            {
                existingItem.quantity++;
                existingItem.totalPriceItem += newItem.listPrice;
                state.noOfItems[userEmail] = (state.noOfItems[userEmail] || 0) + 1;
                state.totalPrice[userEmail] = (state.totalPrice[userEmail] || 0) + newItem.listPrice;
            }
            else 
            {
                state.itemList.push(
                    {
                        userEmail: newItem.userEmail,
                        id: newItem.id,
                        quantity: 1,
                        listPrice: newItem.listPrice,
                        imageUrl: newItem.imageUrl,
                        productName: newItem.productName,
                        category: newItem.category,
                        totalPriceItem: newItem.listPrice
                    }
                );
                state.noOfItems[userEmail] = (state.noOfItems[userEmail] || 0) + 1;
                state.totalPrice[userEmail] = (state.totalPrice[userEmail] || 0) + newItem.listPrice;
            }
        },
        removeFromCart(state, action) {
            const existingItem = action.payload;
            const userEmail = existingItem.userEmail;
            const thatItem = state.itemList.find((item) => (item.id == existingItem.id && item.userEmail == existingItem.userEmail));
            if (thatItem)
            {
                thatItem.quantity--;
                state.noOfItems[userEmail] = (state.noOfItems[userEmail] || 0) - 1;
                state.totalPrice[userEmail] = (state.totalPrice[userEmail] || 0) - existingItem.listPrice;
                thatItem.totalPriceItem -= existingItem.listPrice;
                if (thatItem.quantity == 0)
                {
                    state.itemList = state.itemList.filter((item) => (item.id != thatItem.id && item.userEmail == thatItem.userEmail));
                }
            }
        },
        removeAll(state, action) {
            const existingItem = action.payload;
            const userEmail = existingItem.userEmail;
            const thatItem = state.itemList.find((item) => (item.id == existingItem.id && item.userEmail == existingItem.userEmail));
            if (thatItem)
            {
                state.totalPrice[userEmail] = (state.totalPrice[userEmail] || 0) - thatItem.totalPriceItem;
                state.noOfItems[userEmail] = (state.noOfItems[userEmail] || 0) - thatItem.quantity;
                thatItem.totalPriceItem = 0;
                thatItem.quantity = 0;
                state.itemList = state.itemList.filter((item) => (item.id != thatItem.id && item.userEmail == thatItem.userEmail));
            }
        }
    }
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, removeAll } = cartSlice.actions;