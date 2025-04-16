import { createSlice } from "@reduxjs/toolkit";
// initial state
const initialState = JSON.parse(localStorage.getItem('taskData')) || [];

// create slice here
const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.push(action.payload);
            localStorage.setItem('taskData', JSON.stringify(state));
        },
    }
})



export const { addTask} = taskSlice.actions;
export default taskSlice.reducer;