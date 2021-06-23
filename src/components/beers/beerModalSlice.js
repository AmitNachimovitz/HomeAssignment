import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    show: false,
    data: null,
}

const beerModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        modalShowed(state, action) {
            const data = action.payload
            state.data = data
            state.show = true
        },
        modalRemoved(state, action) {
            state.data = null
            state.show = false
        },
    },
})

export const { modalShowed, modalRemoved } = beerModalSlice.actions

export default beerModalSlice.reducer
