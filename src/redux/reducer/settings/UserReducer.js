import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from '../../../api/BackEndURL'
import {message} from 'antd'

let id=''
let key='updatable'
export const UserGet = createAsyncThunk("UserGet", async () => {
    return await User.method.get(User.URL.get).then((res) => res.data)
})
export const UserPost = createAsyncThunk("UserPost",async (Detail)=>{
    return await User.method.post(`${User.URL.post}`,Detail).then((res) => res.data )
})

const openMessage = () => {
    message.loading({
      content: 'Loading...',
      key,
    });
    setTimeout(() => {
      message.success({
        content: 'Created Successfully!',
        key,
        duration: 2,
      });
    }, 1000);
  };
export const UserReducer = createSlice({
    name: 'User',
    initialState: {
        Data: [],
        Loader: false,
        add:{
            first_name:'',
            email:'',
            employee_id:'',
            password:'',
            start_date:'',
            end_date:'',
            tenant_id:'',
            is_active: false
        },
        modal:{
            AddUserForm: false
        }
    },

    reducers: {
        AddUserForm:(state,action)=>{
            state.modal.AddUserForm === false ? state.modal.AddUserForm = true : state.modal.AddUserForm = false
        }
    },

    extraReducers: (builder) => {
        builder.addCase(UserGet.pending, (state, action) => {
            state.Loader = true
        });
        builder.addCase(UserGet.fulfilled, (state, action) => {
            state.Loader = false
            state.Data = action.payload
        });
        builder.addCase(UserPost.fulfilled, (state, action) => {
            openMessage()
            state.add.first_name= action.payload.first_name
            state.add.last_name = action.payload.last_name
            state.add.email = action.payload.email
            state.add.employee_id = action.payload.employee_id
            state.add.password = action.payload.password
            state.add.start_date = action.payload.start_date
            state.add.end_date = action.payload.end_date
            state.add.is_active = action.payload.is_active
            state.add.tenant_id=action.payload.tenant_id
            state.modal.AddUserForm = action.payload.AddUserForm
        });
    }
})

export const {AddUserForm} = UserReducer.actions 
export default (UserReducer).reducer