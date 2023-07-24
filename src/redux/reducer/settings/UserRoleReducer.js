import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserRole,Pipeline,Role }from '../../../api/BackEndURL';

import {message} from 'antd'

let id=''
let key='updatable'
export const UserRoleGet = createAsyncThunk("UserRoleGet", async () => {
    return await UserRole.method.get(UserRole.URL.get).then((res) => res.data)
})
export const UserRoleGetOne = createAsyncThunk("UserRoleGetOne", async()=>{
    return await UserRole.method.get(`${UserRole.URL.get}${id}`).then((response)=>response.data)
})
export const UserRolePut = createAsyncThunk("UserRolePut", async(Data)=>{
    return await UserRole.method.put(`${UserRole.URL.put}${id}`,Data).then((response)=>response.data)
})
export const UserRoleAdd = createAsyncThunk("UserRoleAdd", async (Details) => {
    return await UserRole.method.post(`${UserRole.URL.post}`, Details).then((response) =>response.data)
})

export const RolenameGet = createAsyncThunk("RolenameAdd", async () => {
    return await Role.method.get(Role.URL.get).then((response) =>response.data)
})

export const createSuccess = () => {
    message.success({ content: 'Created SuccessFully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated SuccessFully!', key, duration: 2, });
};

export const UserRoleReducer = createSlice({
    name: 'UserRole',
    initialState: {
        UserRoleData: [],

        RoleName :[],

        Loader: false,
        add: {
            user_name:'',
            role_name:'',
            start_date:'',
            end_date:'',
            is_active:false,
        },
        edit: {
            user_name:'',
            role_name:'',
            start_date:'',
            end_date:'',
            is_active:false,
        },
        modal: {
            UserRoleAddmodel:false,
            Edit: false,
            View: false,
            Search:true,
            AddForm:false,
        },
        singleData: "",
        getOneData: []
    },

    reducers: {
        UserRoleAddmodel:(state,action)=>{
            state.modal.UserRoleAddmodel===false?state.modal.UserRoleAddmodel=true:state.modal.UserRoleAddmodel=false
        },
        AddForm:(state,action)=>{
            state.modal.Search=action.payload.Search
            state.modal.AddForm=action.payload.AddForm
        },
        UserRoleGetId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },      

        Edit: (state, action) => {
            state.modal.Edit === false ? state.modal.Edit = true : state.modal.Edit = false
        },

        View: (state, action) => {
            state.modal.View === false ? state.modal.View = true : state.modal.View = false
        }
    },

    extraReducers: (builder) => {
        builder.addCase(UserRoleGet.pending, (state, action) => {
            state.Loader = true
        });
        builder.addCase(UserRoleGet.fulfilled, (state, action) => {
            state.Loader = false
            state.UserRoleData = action.payload

        });
        builder.addCase(RolenameGet.fulfilled, (state, action) => {
            state.Loader = false
            state.RoleName = action.payload

        });
        builder.addCase(UserRoleAdd.fulfilled, (state, action) => {
            createSuccess(true)
            state.modal.UserRoleAddmodel=false;
            state.modal.AddForm=false;
            state.modal.Search=true
             state.add.user_name = action.payload.user_name;
             state.add.role_name = action.payload.role_name;
             state.add.start_date = action.payload.start_date;
             state.add.end_date = action.payload.end_date;
             state.add.is_active = action.payload.is_active;
         });
        builder.addCase(UserRoleGetOne.fulfilled,(state,action)=>{
            state.getOneData = action.payload
        });
        builder.addCase(UserRolePut.fulfilled,(state,action)=>{
            updateSuccess(true)
            state.modal.Edit =false;
            state.edit.user_name = action.payload.user_name;
            state.edit.role_name = action.payload.role_name;
            state.edit.start_date = action.payload.start_date;
            state.edit.end_date = action.payload.end_date;
            state.edit.is_active = action.payload.is_active;
        });

    }
})
export const {UserRoleAddmodel,Edit, View, UserRoleGetId,AddForm}=UserRoleReducer.actions
export default (UserRoleReducer).reducer