import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Connection,Token} from '../../../api/BackEndURL'
import {message} from 'antd'

let id=""
const key = 'updatable';

export const connectionGet = createAsyncThunk("ConnectionGet", async () => {
    return await Connection.method.get(Connection.URL.get,{headers:{"Authorization" : Token}}).then((response) =>response.data)
})
export const connectionAdd=createAsyncThunk("ConnectionAdd",async(Details)=>{
    return await Connection.method.post(`${Connection.URL.post}`,Details,{headers:{"Authorization" : Token}}).then((response)=>response.data)
})
export const connectionGetId=createAsyncThunk("ConnectionGetID",async()=>{
    return await Connection.method.get(`${Connection.URL.getOne}${id}/`,{headers:{"Authorization" : Token}}).then((response)=>response.data)
})
export const connectionPutId=createAsyncThunk("connectionPutId",async(Detail)=>{
    return await Connection.method.put(`${Connection.URL.put}${id}/`,Detail,{headers:{"Authorization" : Token}}).then((response)=>response.data)
})

export const createSuccess = () => {
    message.success({ content: 'Created Successfully!', key, duration: 2, });
};

export const updateSuccess = () => {
message.success({ content: 'Updated Successfully!', key, duration: 1, });
};

export const connectionReducer = createSlice({
    name:"Connection",
    initialState:{
        Data:[],
        connCount:[],
        add:{
            connection_name:'',
            connection_detail:'',
            conn_pram:'',
            start_date:'',
            end_date:'',
            is_active:false,
        },
        update:{
            connection_name:'',
            connection_detail:'',
            conn_pram:'',
            start_date:'',
            end_date:'',
            is_active:false,
        },
        modal:{
            ConnPopupAdd:false,
            ConnPopupEdit:false,
            ConnPopupView:false,
        },
        loader:{
            Loader:false
        },
        singleData:"",
        getOneData:[]
    },
    reducers:{
        GetId:(state, action)=>{
            state.singleData=action.payload.singleData
            id=state.singleData
           },
     
        ConnPopupAdd:(state,action)=>{
            state.modal.ConnPopupAdd===false?state.modal.ConnPopupAdd=true:state.modal.ConnPopupAdd=false
        },
        ConnPopupEdit:(state,action)=>{
            state.modal.ConnPopupEdit===false?state.modal.ConnPopupEdit=true:state.modal.ConnPopupEdit=false
        },
        ConnPopupView:(state,action)=>{
            state.modal.ConnPopupView===false?state.modal.ConnPopupView=true:state.modal.ConnPopupView=false
        }
       },
        extraReducers:(builder)=>{
        builder.addCase(connectionGet.pending,(state,action)=>{
            state.loader.Loader=true
            
        })
        builder.addCase(connectionGet.fulfilled,(state,action)=>{
            state.loader.Loader=false
            state.Data=action.payload
        });
        builder.addCase(connectionAdd.fulfilled,(state,action)=>{
            createSuccess(true)
            state.modal.ConnPopupAdd=false
            state.add.connection_name=action.payload.connection_name;
            state.add.connection_detail=action.payload.connection_detail;
            state.add.conn_pram=action.payload.conn_pram;
            state.add.start_date=action.payload.start_date;
            state.add.end_date=action.payload.end_date;
            state.add.is_active=action.payload.is_active;
        })
        builder.addCase(connectionGetId.fulfilled,(state,action)=>{
            state.getOneData=action.payload
        });
        
        builder.addCase(connectionPutId.fulfilled,(state,action)=>{
            updateSuccess(true)
            state.modal.ConnPopupEdit=false
            state.update.connection_name=action.payload.connection_name;
            state.update.connection_detail=action.payload.connection_detail;
            state.update.start_date=action.payload.start_date;
            state.update.end_date=action.payload.end_date;
            
        })
    }
})
export const {ConnPopupAdd,ConnPopupEdit,ConnPopupView,GetId}=connectionReducer.actions
export default (connectionReducer).reducer
