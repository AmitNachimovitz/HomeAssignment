import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const favoritesBeersSlice = createSlice({
    name: 'favoritesBeers',
    initialState,
    reducers: {
        beerAdded(state, action) {
            const favoriteBeer = Object.assign({}, action.payload, { rank: 1 })
            state.push(favoriteBeer)
        },
        beerRemoved(state, action) {
            return state.filter((beer, index) => beer.id !== action.payload)
        },
        removedAllBeers(state, action) {
            return []
        },
        rankChanged(state, action) {
            const { id, rank } = action.payload
            const beer = state.find((beer) => beer.id === id)
            beer.rank = rank
        },
    },
})

export const { beerAdded, beerRemoved, removedAllBeers, rankChanged } =
    favoritesBeersSlice.actions

export const selectAllFavorites = (state) => state.favoritesBeers

export const isFavoriteById = (state, beerId) =>
    state.favoritesBeers.some((beer) => beer.id === beerId)

export default favoritesBeersSlice.reducer
