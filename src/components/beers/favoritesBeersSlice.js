import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const favoritesBeersSlice = createSlice({
    name: 'favoritesBeers',
    initialState,
    reducers: {
        beerAdded(state, action) {
            state.push(action.payload)
        },
        beerRemoved(state, action) {
            return state.filter((beer, index) => beer.id !== action.payload)
        },
        removedAllBeers(state, action) {
            return []
        },
    },
})

export const { beerAdded, beerRemoved, removedAllBeers } =
    favoritesBeersSlice.actions

export const selectAllFavorites = (state) => state.favoritesBeers

export const isFavoriteById = (state, beerId) =>
    state.favoritesBeers.some((beer) => beer.id === beerId)

export default favoritesBeersSlice.reducer
