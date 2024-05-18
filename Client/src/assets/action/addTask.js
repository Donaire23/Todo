
    import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
    import Axios from 'axios';
    import { route, url, userRoute } from "../routes/Routes";
    import Cookie from 'js-cookie'
    
    export const addTask = createAsyncThunk("addTask", async(data, thunkAPI) => {
        try {

            if(data.task_name === "") {
                throw new Error("Please type your task");
            } else if(data.task_description === "") {
                throw new Error("Please type your description");
            }

            const userID = Cookie.get('ID');
            const response = await Axios.post(`${url.urls}/${userRoute.addTask}`, data, { params: { userID } });
            return response.data;
        } catch(error) {
            throw error; 
        }
    });


    export const editTask = createAsyncThunk("edit", async(data, taskID, thunkAPI) => {
        try {
            const taskID = data.task_id
            console.log(data)
            const response = await Axios.put(`${url.urls}/${userRoute.addTask}/edit`, data, { params: { taskID } });
            return response.data;
        } catch(error) {
            throw error; 
        }
    });

    const UserTask = createSlice({
        name: 'userTask',
        initialState: {
            task_name: '',
            task_description: '',
            task_date: new Date().toISOString(),
            isComplete: null,
            new_task_name: '',
            new_task_description: '',
            new_date: new Date().toISOString(),
            rejected: null
        },
        reducers: {
            setTaskName: (state, action) => {
                state.task_name = action.payload;
            },
            setTaskDescription: (state, action) => {
                state.task_description = action.payload;
            },
            setTaskDate: (state, action) => {
                state.task_date = action.payload.toString();
            },
            setNewTaskName: (state, action) => {
                state.new_task_name = action.payload;
            },
            setNewTaskDescription: (state, action) => {
                state.new_task_description = action.payload;
            },
            setNewDate: (state, action) => {
                state.new_date = action.payload.toString();
            }
        },
        extraReducers: (builder) => {
            builder
            .addCase(addTask.fulfilled, (state, action) => {
                state.task_name = '',
                state.task_description = '',
                state.task_date = new Date().toISOString();
                state.responseData = action.payload;
                state.rejected = null
            })
            .addCase(addTask.rejected, (state, action) => {
                state.rejected = action.error.message;
            })
        }
    })

    export const {
        setTaskName, 
        setTaskDescription, 
        setTaskDate, 
        setNewTaskName, 
        setNewTaskDescription, 
        setNewDate} = UserTask.actions;

    export default UserTask.reducer;