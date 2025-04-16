import { configureStore } from "@reduxjs/toolkit";
import taskSlice from './WorkSlice'
const workSotre =  configureStore({
    reducer:{
        task : taskSlice,
    }
})

export default workSotre;