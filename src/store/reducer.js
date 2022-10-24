import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 1
    },
    reducers: {
        increment: (state) => {
            state.value++
        },
        decrement: (state) => {
            state.value--
        },
        reset: (state) => {
            state.value = 0
        },
        incrementTo2: (state, { payload }) => {
            state.value += payload
        },
        decrementTo4: (state, { payload }) => {
            state.value -= payload
        }
    }
})

export const { increment, decrement, reset, decrementTo4, incrementTo2 } = counterSlice.actions

export default counterSlice.reducer
