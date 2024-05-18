import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios';
import { route, url, userRoute } from "../routes/Routes";
import userID from "../common/commonStyle/userID";


export const getUser = createAsyncThunk("getUser", async(userId, thunkAPI) => {
    try {
        const response = await Axios.get(`${url.urls}/${route.credentials}/${userRoute.getUser}`, {
            params: {
                userId: userId 
            }
        });
        return response.data;
    } catch(error) {
        throw error.response.data.message;
    }
});

export const todayTasks = createAsyncThunk("todayTask", async(userID, thunkAPI) => {
    try {
        const response = await Axios.get(`${url.urls}/${userRoute.addTask}/${userRoute.userTask}`, {
            params: {
                userID: userID
            }
        })
        return response.data
    } catch(error) {
        throw error.response.data.message;
    }
});

export const delayTasks = createAsyncThunk("delayTask", async(data, thunkAPI) => {
    try {
        const response = await Axios.get(`${url.urls}/${userRoute.addTask}/${userRoute.delaytasks}`, {
            params: {
                userID: userID
            }
        })
        return response.data
    } catch(error) {
        throw error.response.data.message;
    }
});

export const upCommingTasks = createAsyncThunk("upcommingTask", async(data, thunkAPI) => {
    try {
        const response = await Axios.get(`${url.urls}/${userRoute.addTask}/${userRoute.upcommingTask}`, {
            params: {
                userID: userID
            }
        })
        return response.data
    } catch(error) {
        throw error.response.data.message;
    }
});

export const deleteTask = createAsyncThunk("deleteTask", async(id, thunkAPI) => {
    try {
        const response = await Axios.delete(`${url.urls}/${userRoute.addTask}/${route.delete}`, {
            params: {
                taskID: id
            }
        })
        return response.data
    } catch(error) {
        throw error.response.data.message;
    }
});



export const StickyWall = createAsyncThunk("stickyWall", async(data, thunkAPI) => {
    try {

       
    } catch(error) {
        throw error.response.data.message;
    }
});


const UserData = createSlice({
    name: 'userData',
    initialState: {
        tTasks: [],
        upComming: [],
        delay: [],
        stickyWall: [],
        userName: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(todayTasks.fulfilled, (state, action) =>{
            state.tTasks = action.payload;
        })
        .addCase(delayTasks.fulfilled, (state, action) =>{
            state.delay = action.payload;
        })
        .addCase(upCommingTasks.fulfilled, (state, action) =>{
            state.upComming = action.payload;
        })
        .addCase(StickyWall.fulfilled, (state, action) =>{
            state.stickyWall = action.payload;
        })
        .addCase(getUser.fulfilled, (state, action) =>{
            state.userName = action.payload;
        })
        .addCase(deleteTask.fulfilled, (state, action) =>{
            state.responseData = action.payload;
        })
    }
})

export default UserData.reducer;