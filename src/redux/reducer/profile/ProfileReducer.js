import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Profile} from '../../../api/BackEndURL'
import {message} from 'antd'

const key = 'updatable';

export const profileGet = createAsyncThunk("ProfileGet", async () => {
    return await Profile.method.get(`${Profile.URL.get}/${JSON.parse(sessionStorage.getItem("id"))}`).then((response) => response.data)
})

export const profileUpdate = createAsyncThunk("ProfileUpdate", async (Data) => {
    return await Profile.method.edit(`${Profile.URL.put}/${JSON.parse(sessionStorage.getItem("id"))}`,Data).then((response) => response.data)
})

export const updatedSuccess = () => {
    message.success({ content: 'Updated SuccessFully!', key, duration: 2, });
};

export const ProfileReducer = createSlice({
    name: "Profile",
    initialState: {
        Data: [],
        edit:{
            first_name: "",
            last_name: "",
            postalcode: "",
            category: "",
            email: "",
            phone_number: "",
            alternate_phonenumber: "",
            addressline_one: "",
            addressline_two: "",
            countryor_city: "",
            company_name: "",
            company_type: ""
        }
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
       
        builder.addCase(profileGet.fulfilled, (state, action) => {
            state.Data = action.payload
        });

        builder.addCase(profileUpdate.fulfilled,(state,action)=>{
            updatedSuccess(true)
            profileGet(true)
            state.edit.first_name=action.payload.first_name
            state.edit.last_name=action.payload.last_name
            state.edit.phone_number=action.payload.phone_number
            state.edit.email=action.payload.email
            state.edit.addressline_one=action.payload.addressline_one
            state.edit.addressline_two=action.payload.addressline_two
            state.edit.alternate_phonenumber=action.payload.alternate_phonenumber
            state.edit.countryor_city=action.payload.countryor_city
            state.edit.postalcode=action.payload.postalcode
        })
      
       
    }
})

export const {idCapture} = ProfileReducer.actions
export default (ProfileReducer).reducer
