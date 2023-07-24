import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {RoleDetails, Role, Pages} from '../../../api/BackEndURL'
import {message} from 'antd'

let id=""
export const RoledetailsGet=createAsyncThunk("RoledetailGet",async()=>{
    return await RoleDetails.method.get(RoleDetails.URL.get).then((res)=>res.data)
})
export const RoleDetailsPost = createAsyncThunk("RoleDetailspost",async(Detail)=>{
    return await RoleDetails.method.post(`${RoleDetails.URL.post}`,Detail).then((res)=>res.data)
})
export const NewRoleGet = createAsyncThunk("NewRoleDetailGet",async()=>{
    return await Role.method.get(Role.URL.get).then((res)=>res.data)
})
export const PageUrlGet = createAsyncThunk("PageUrlGet",async()=>{
    return await Pages.method.get(Pages.URL.get).then((res)=>res.data)
})

const key = 'created';
const createMessage = () => {
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

export const RoleDetailsReducer = createSlice({
    name:'RoleDetails',
    initialState:{
        NewRoleDataGet:[],
        PageUrlDataGet:[],
        Data:[],
        Loader:false, 
        modal:{
            addRoleDetails: false
        },
        AddData:{
            role_name:'',
            role_detail_name:'',
            role_description:'',
            role_handling_pages:'',
            read: '',
            write: ''
        }
    },
    reducers:{
        addRoleDetails:(state,action)=>{
            state.modal.addRoleDetails===false ? state.modal.addRoleDetails=true : state.modal.addRoleDetails=false
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(RoledetailsGet.pending,(state,action)=>{
            state.Loader=true
        });
        builder.addCase(RoledetailsGet.fulfilled,(state,action)=>{
            state.Loader=false
            state.Data = action.payload
        });
        builder.addCase(NewRoleGet.fulfilled,(state,action)=>{
            state.NewRoleDataGet = action.payload
        });
        builder.addCase(PageUrlGet.fulfilled,(state,action)=>{
            state.PageUrlDataGet = action.payload
        });
        builder.addCase(RoleDetailsPost.fulfilled,(state,action)=>{
            createMessage()
            state.AddData.role_name = action.payload.role_name;
            state.AddData.role_detail_name = action.payload.role_detail_name;
            state.AddData.role_description = action.payload.role_description;
            state.AddData.role_handling_pages = action.payload.role_handling_pages
            state.AddData.read = action.payload.read;
            state.AddData.write = action.payload.write;
            state.modal.addRoleDetails = action.payload.addRoleDetails
        })
        
    }
})

export const {addRoleDetails} = RoleDetailsReducer.actions
export default (RoleDetailsReducer).reducer