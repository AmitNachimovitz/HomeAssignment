import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalsBeers: 100,
    beersPerPage: 12,
    page: 1,
}

const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        pageChanged(state, action) {
            const page = action.payload
            state.page = page
        },
    },
})

export const { pageChanged } = paginationSlice.actions

export default paginationSlice.reducer
