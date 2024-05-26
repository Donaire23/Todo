import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios'
import { route, url } from "../routes/Routes";
import { nullOrUndefined } from "../common/helpers/nullOrUndefined";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;


export const RegistrationApi = createAsyncThunk("registerUser", async(data, { rejectWithValue }) => {

    try {

        if(nullOrUndefined(data.name) === null) {   
            throw new Error("Please type your name")
        } 

        if(nullOrUndefined(data.emailAddress) === null) {
            throw new Error("Please type your email")
        }

        if(nullOrUndefined(data.password) === null) {
            throw new Error("Please type your password")
        }

        if(nullOrUndefined(data.repeatPassword) === null) {
            throw new Error("Please type your repeat password")
        }

        if(data.password != data.repeatPassword) {
            throw new Error("Password does not match")
        }

        if (!emailRegex.test(data.emailAddress)) {
            throw new Error("Invalid email address");
        }

        if (!passwordRegex.test(data.password)) {
            throw new Error("Invalid password");
        }

        

        const response = await Axios.post(`${url.urls}/${route.registerRoute}`, data);
        return response.data;
    } catch(error) {
        return rejectWithValue(error.message); 
    }
})

const RegisterUser = createSlice({
    name: "register",
    initialState: {
        name: '',
        emailAddress: '',
        password: '',
        repeatPassword: '',
        errorRegister: null
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmailAddress: (state, action) => {
            state.emailAddress = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setRepeatPass: (state, action) => {
            state.repeatPassword = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(RegistrationApi.fulfilled, (state, action) => {
            state.name = '',
            state.emailAddress = '',
            state.password = '',
            state.repeatPassword = ''
            state.errorRegister = null
        })
        .addCase(RegistrationApi.rejected, (state, action) => {
            state.errorRegister = action.payload;
        })
    }
})

export const {setName, setEmailAddress, setPassword, setRepeatPass} = RegisterUser.actions;
export default RegisterUser.reducer;