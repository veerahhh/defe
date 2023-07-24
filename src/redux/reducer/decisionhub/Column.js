import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from 'antd'
import {Column,Token} from '../../../api/BackEndURL'

let id = ''
let key = 'updatable'

export const columnGet = createAsyncThunk("columnGet", async () => {
    return await Column.method.get(Column.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data) 
})

export const columnPost = createAsyncThunk("columnPost", async (Data) => {
    return await Column.method.post(`${Column.URL.post}`, Data,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const columnGetOne = createAsyncThunk("columnGetOne", async () => {
    return await Column.method.get(`${Column.URL.get}${id}`,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const columnPut = createAsyncThunk("columnPut", async (Data) => {
    return await Column.method.put(`${Column.URL.put}${id}`, Data,{headers:{"Authorization" : Token}}).then((response) => response.data)
})
export const createSuccess = () => {
    message.success({ content: 'Created Successfully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated Successfully!', key, duration: 2, });
};
export const columnReducer = createSlice({
    name: "column",
    initialState: {
        ColumnGetData: [],
        ColumnAddData: {
         table_name: '',  
           column_name: '',
            // target_connection_name: '',
            start_date: '',
            end_date: '',
            is_active: false,
            tenant_id:'',
            config_id:''
        },
        ColumnUpdate: {
            table_name: '',    
            column_name: '',
             start_date: '',
             end_date: '',
             is_active: '',
             tenant_id:'',
             config_id:''
        },
        newForm: {
            ColEditPop: false,
            ColViewPop: false,
            ColCreatePop: false,
        },
        loader: {
            Loader: false
        },
        singleData: "",
        getOneData: []
    },
    reducers: {
        ColGetId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        ColEditPop: (state, action) => {
            state.newForm.ColEditPop === false ? state.newForm.ColEditPop = true : state.newForm.ColEditPop = false
        },
        ColViewPop: (state, action) => {
            state.newForm.ColViewPop === false ? state.newForm.ColViewPop = true : state.newForm.ColViewPop = false
        },
        ColCreatePop: (state, action) => {
            state.newForm.ColCreatePop === false ? state.newForm.ColCreatePop = true : state.newForm.ColCreatePop = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(columnGet.pending, (state, action) => {
            state.loader.Loader = true
        });
        builder.addCase(columnGet.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.ConfigGetData = action.payload
        }) 
        builder.addCase(columnGetOne.fulfilled, (state, action) => {
            state.getOneData = action.payload
        })
        builder.addCase(columnPost.fulfilled, (state, action) => {
            createSuccess(true)
            state.ColumnAddData.table_name = action.payload.table_name;
            // state.ColumnAddData.source_connection_name = action.payload.source_connection_name;
            state.ColumnAddData.column_name = action.payload.column_name;
            state.ColumnAddData.start_date = action.payload.start_date;
            state.ColumnAddData.end_date = action.payload.end_date;
            state.ColumnAddData.is_active = action.payload.is_active;
            state.newForm.ColCreatePop = action.payload.ColCreatePop;
            state.ColumnAddData.tenant_id=action.payload.tenant_id;
        })
        builder.addCase(columnPut.fulfilled, (state, action) => {
            updateSuccess(true)
            state.ColumnUpdate.table_name = action.payload.table_name;
            // state.ColumnUpdate.source_connection_name = action.payload.source_connection_name;
            state.ColumnUpdate.column_name = action.payload.column_name;
            state.ColumnUpdate.start_date = action.payload.start_date;
            state.ColumnUpdate.end_date = action.payload.end_date;
            state.ColumnUpdate.is_active = action.payload.is_active;
            state.newForm.ColEditPop = action.payload.ColEditPop
        })
    }
})

export const { ColEditPop, ColViewPop, ColCreatePop, ColGetId } = columnReducer.actions
export default (columnReducer).reducer