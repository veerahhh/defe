import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Audit ,Token} from '../../../api/BackEndURL'
import { message } from 'antd'

let id = ''
let key = 'updatable'
export const AuditSearchGet = createAsyncThunk("AuditSearchGet", async () => {
    return await Audit.method.get(Audit.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})


export const AuditGetsheetone = createAsyncThunk("AuditGetsheetone", async () => {
    return await Audit.method.get(Audit.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const AuditGetsheettwo = createAsyncThunk("AuditGetsheettwo", async (Data) => {
    return await Audit.method.put(Audit.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const createSuccess = () => {
    message.success({ content: 'Created SuccessFully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated SuccessFully!', key, duration: 2, });
};
export const AuditReducer = createSlice({
    name: "DataType",
    initialState: {
        AuditGetData: [],
        loader:{
            Loader:false
        },
    },
    
    extraReducers: (builder) => {
        builder.addCase(AuditGetsheetone.pending, (state, action) => {
            state.loader.Loader = true
        });
        builder.addCase(AuditGetsheetone.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.AuditGetsheetone = action.payload
        })
     
    }
})

export default (AuditReducer).reducer