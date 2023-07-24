import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Role,Pages} from '../../../api/BackEndURL'
import {message} from 'antd'

let id=""
const key = 'updatable';

export const RoleGet=createAsyncThunk("RoleGet",async()=>{
    return await Role.method.get(Role.URL.get).then((res)=>res.data)
})
export const RoleAdd=createAsyncThunk("Add",async(Details)=>{
    
    return await Role.method.post(`${Role.URL.post}`,Details).then((response)=>response.data)
})
export const RoleGetId=createAsyncThunk("GetID",async()=>{
    console.log("dd")
    return await Role.method.get(`${Role.URL.getOne}${id}`).then((response)=>response.data)
})
export const RolePutId=createAsyncThunk("PutId",async(Detail)=>{
    return await Role.method.put(`${Role.URL.put}${id}`,Detail).then((response)=>response.data)
})

export const PageUrlGet = createAsyncThunk("PageUrlGet",async()=>{
    return await Pages.method.get(Pages.URL.get).then((res)=>res.data)
})

export const createSuccess = () => {
    message.success({ content: ' Role Created SuccessFully!', key, duration: 2, });
};

export const updateSuccess = () => {
message.success({ content: ' Role Updated Successfully!', key, duration: 1, });
};
export const RoleReducer=createSlice({
    name:'Role',
    initialState:{
        Data:[],
        PageUrlDataGet:[],
        Loader:false,
        add:{
            role_name:'',
            role_desc:'',
            role_handling_pages:'',
            read: '',
            write: '',
            role_start_date:'',
            role_end_date:'',
            role_status:'false'
        },
        modal:{
            RoleAddmodel:false,
            Edit:false,
            View:false,
        },
        singleData:"",
        getOneData:[]
    },
    reducers:{
        GetId:(state, action)=>{
            state.singleData=action.payload.singleData
            id=state.singleData
           },
        RoleAddmodel:(state,action)=>{
            state.modal.RoleAddmodel===false?state.modal.RoleAddmodel=true:state.modal.RoleAddmodel=false
        },
        Edit:(state,action)=>{
            state.modal.Edit===false?state.modal.Edit=true:state.modal.Edit=false
        },
        View:(state,action)=>{
            state.modal.View===false?state.modal.View=true:state.modal.View=false
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(RoleGet.pending,(state,action)=>{
            state.Loader=true
        });

        builder.addCase(RoleGet.fulfilled,(state,action)=>{
            state.Loader=false
            state.Data = action.payload
        });
    
        builder.addCase(PageUrlGet.fulfilled,(state,action)=>{
            state.PageUrlDataGet = action.payload
        });
         builder.addCase(RoleAdd.fulfilled,(state,action)=>{
            createSuccess(true)
            state.modal.RoleAddmodel=false
            state.add.role_name=action.payload.role_name;
            state.add.role_desc=action.payload.role_desc;
            state.add.role_handling_pages = action.payload.role_handling_pages
            state.add.read = action.payload.read;
            state.add.write = action.payload.write;
            state.add.start_date=action.payload.start_date;
            state.add.end_date=action.payload.end_date;
            state.add.is_active=action.payload.is_active;
        })
        builder.addCase(RoleGetId.fulfilled,(state,action)=>{
            state.getOneData=action.payload
        });
        builder.addCase(RolePutId.fulfilled,(state,action)=>{
            updateSuccess(true)
            state.modal.Edit=false
            state.update.role_name=action.payload.role_name;
            state.update.role_desc=action.payload.role_desc;
            
            state.update.start_date=action.payload.start_date;
            state.update.end_date=action.payload.end_date;
            
        })
 
    }
})
export const {RoleAddmodel,Edit,View,GetId,}=RoleReducer.actions
export default (RoleReducer).reducer