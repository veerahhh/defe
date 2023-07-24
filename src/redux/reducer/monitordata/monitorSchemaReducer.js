import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {MonitorSchema,Token} from '../../../api/BackEndURL'

export const monitorSchemaGet = createAsyncThunk("MonitorSchemaGet", async () => {
    return await MonitorSchema.method.get(MonitorSchema.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const monitorSchemaReducer = createSlice({
    name: "monitor",
    initialState: {
            Data: [],
            Loader: false,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(monitorSchemaGet.pending, (state, action) => {
            state.Loader = true
        });
        builder.addCase(monitorSchemaGet.fulfilled, (state, action) => {
            state.Loader = false
            state.Data = action.payload
        });
    }
})

export default (monitorSchemaReducer).reducer
