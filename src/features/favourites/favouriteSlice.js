import { createSlice } from "@reduxjs/toolkit";

const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: {
        itemList: [],
    },
    reducers: {
        addToFavourites(state, action) {
            const newItem = action.payload;
            const userEmail = newItem.userEmail;
            const existingItem = state.itemList.find((item) => (item.id == newItem.id && item.userEmail == userEmail));
            if (!existingItem)
            {
                state.itemList.push(
                    {
                        userEmail: userEmail,
                        id: newItem.id,
                        listPrice: newItem.listPrice,
                        imageUrl: newItem.imageUrl,
                        productName: newItem.productName,
                        category: newItem.category,
                    }
                );
            }
        },
        removeFromFavourites(state, action) {
            const existingItem = action.payload;
            const userEmail = existingItem.userEmail;
            const thatItem = state.itemList.find((item) => (item.id == existingItem.id && item.userEmail == userEmail));
            if (thatItem)
            {
               state.itemList = state.itemList.filter((item) => (item.id != thatItem.id && item.userEmail == userEmail));
            }
        }
    }
});

export const favouritesReducer = favouriteSlice.reducer;
export const { addToFavourites, removeFromFavourites } = favouriteSlice.actions;