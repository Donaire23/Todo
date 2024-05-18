import { configureStore } from "@reduxjs/toolkit";

import loginAction from "../action/loginAction";
import Registration  from "../action/Registration";
import UserData from '../action/GetTask'
import UserTask from '../action/addTask'

import asyncMiddleware from "../Middleware/asyncMiddleware ";

const store = configureStore({
    reducer: {
        login: loginAction,
        register: Registration,
        userData: UserData,
        userTask: UserTask
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(asyncMiddleware)
})

export default store;
