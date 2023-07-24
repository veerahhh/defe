import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {MonitorData,Token} from '../../../api/BackEndURL'
import { AuditMonitor } from "../../../api/BackEndURL";
let id=''
export const MonitorDataGet = createAsyncThunk("MonitorDataGet", async () => {
    return await MonitorData.method.get(MonitorData.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const MonitorGetOne = createAsyncThunk("MonitorGetOne", async () => {
    return await MonitorData.method.get(`${MonitorData.URL.get}${id}`,{headers:{"Authorization" : Token}}).then((response) => response.data)
})
export const AuditMonitorGet = createAsyncThunk("AuditMonitorGet", async () => {
    return await AuditMonitor.method.get(AuditMonitor.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})
export const monitorDataReducer = createSlice({
    name: "monitor",
    initialState: {
        AuditMon:[],
            Data: [],
            newForm:{
                PopUp:false,
            },
            Loader: false,
            singleData: "",
            getOneData: {}
    },
    
    reducers: {
        GetId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        PopUp: (state, action) => {
            state.newForm.PopUp === false ? state.newForm.PopUp = true : state.newForm.MonPopUp = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(MonitorDataGet.pending, (state, action) => {
            state.Loader = true
        });
        builder.addCase(AuditMonitorGet.pending, (state, action) => {
            state.Loader = true
        });
      
        builder.addCase(MonitorDataGet.fulfilled, (state, action) => {
            state.Loader = false
            state.Data = action.payload
        });
        builder.addCase(AuditMonitorGet.fulfilled, (state, action) => {
            state.Loader = false
            state.AuditMon = action.payload
        });
        builder.addCase(MonitorGetOne.fulfilled, (state, action) => {
            state.getOneData = action.payload
        })
    }
})
export const { GetId ,PopUp} = monitorDataReducer.actions
export default (monitorDataReducer).reducer