import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    data: [],
    status: 'idle',
    error: null,
}

export const fetchBeers = createAsyncThunk(
    'beers/fetchBeers',
    async (arg, { getState }) => {
        try {
            const state = getState()
            const { page, beersPerPage } = state.pagination
            const response = await axios.get(
                `https://api.punkapi.com/v2/beers?page=${page}&per_page=${beersPerPage}`
            )
            return response.data
        } catch (err) {
            console.error(err)
        }
    }
)

export const searchBeers = createAsyncThunk(
    'beers/searchBeers',
    async (query, { getState }) => {
        try {
            const state = getState()
            const { page, beersPerPage } = state.pagination
            const response = await axios.get(
                `https://api.punkapi.com/v2/beers?food=${query}&per_page=${beersPerPage}&page=${page}`
            )
            return response.data
        } catch (err) {
            console.error(err)
        }
    }
)

export const selectAllBeers = (state) => state.beers.data

export const selectBeerById = (state, beerId) =>
    state.beers.data.find((beer) => beer.id === beerId)

const beersSlice = createSlice({
    name: 'beers',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchBeers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchBeers.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        },
        [fetchBeers.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [searchBeers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [searchBeers.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
        },
        [searchBeers.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
    },
})

export default beersSlice.reducer
