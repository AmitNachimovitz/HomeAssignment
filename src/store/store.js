import { configureStore } from '@reduxjs/toolkit'
import beersReducer from '../components/beers/beersSlice'
import favoritesBeersReducer from '../components/beers/favoritesBeersSlice'
import beerModalReducer from '../components/beers/beerModalSlice'
import paginationReducer from '../components/pagination/paginationSlice'

export default configureStore({
    reducer: {
        beers: beersReducer,
        favoritesBeers: favoritesBeersReducer,
        modal: beerModalReducer,
        pagination: paginationReducer,
    },
})
