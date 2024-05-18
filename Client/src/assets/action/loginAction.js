import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from 'axios';
import { route, url } from "../routes/Routes";
import Cookies from 'js-cookie';

export const LoginBtn = createAsyncThunk("loginUser", async(data, thunkAPI) => {
    try {

        if(data.email === "") {
            throw new Error("Please type your email");
        } else if(data.password === "") {
            throw new Error("Please type your password");
        }

        const response = await Axios.post(`${url.urls}/${route.loginRoute}`, data);
        const { token, ID } = response.data;
        localStorage.setItem('token', token); 
        await Cookies.set('token', token)
        await Cookies.set('ID', ID)
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
        const protectedResponse = await Axios.get(`${url.urls}/${route.loginRoute}/protected`);
        return { loginResponse: response.data, protectedResponse: protectedResponse.status };
    } catch(error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw error.response.data.message;
        } else {
            throw error;
        }
    }
});



const LoginUser = createSlice({
    name: "Login",
    initialState: {
        emailAddress: '',
        password: '',
        rejected: null
    },
    reducers: {
        setEmailAddress: (state,action) => {
            state.emailAddress = action.payload;
        },
        setPassword: (state,action) => {
            state.password = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(LoginBtn.fulfilled, (state, action) => {
            state.emailAddress = "";
            state.password = "";
            state.rejected = null;
            state.res = action.payload
        })
        .addCase(LoginBtn.rejected, (state, action) => {
            state.rejected = action.error.message;
        })
    }
})

export const {setEmailAddress, setPassword} = LoginUser.actions;
export default LoginUser.reducer;