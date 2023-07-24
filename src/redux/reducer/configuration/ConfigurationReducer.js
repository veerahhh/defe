import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Configuration,Token } from '../../../api/BackEndURL'
import { message } from 'antd'

let id = ''
let key = 'updatable'

export const configurationGet = createAsyncThunk("ConfigurationGet", async () => {
    return await Configuration.method.get(Configuration.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const configurationPost = createAsyncThunk("ConfigurationAdd", async (Data) => {
    return await Configuration.method.post(`${Configuration.URL.post}`, Data,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const configurationGetOne = createAsyncThunk("ConfigurationGetOne", async () => {
    return await Configuration.method.get(`${Configuration.URL.get}${id}`,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const configurationPut = createAsyncThunk("ConfigurationPut", async (Data) => {
    return await Configuration.method.put(`${Configuration.URL.put}${id}`, Data,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const createSuccess = () => {
    message.success({ content: 'Created Successfully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated Successfully!', key, duration: 2, });
};

export const configurationReducer = createSlice({
    name: "configuration",
    initialState: {
        ConfigGetData: [],
        ConfigAddData: {
            config_name: '', 
            desc: '', 
            source_connection_name: '',
            target_connection_name: '',
            start_date: '',
            end_date: '',
            is_active: false,
            tenant_id:''
        },
        configUpdate: {
            config_name: '',
            desc: '',
            source_connection_name: '',
            target_connection_name: '',
            start_date: '',
            end_date: '',
            is_active: '',
        },
        newForm: {
            ConEditPop: false,
            ConViewPop: false,
            ConCreatePop: false,
        },
        loader: {
            Loader: false
        },
        singleData: "",
        getOneData: []
    },
    reducers: {
        ConGetId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        ConEditPop: (state, action) => {
            state.newForm.ConEditPop === false ? state.newForm.ConEditPop = true : state.newForm.ConEditPop = false
        },
        ConViewPop: (state, action) => {
            state.newForm.ConViewPop === false ? state.newForm.ConViewPop = true : state.newForm.ConViewPop = false
        },
        ConCreatePop: (state, action) => {
            state.newForm.ConCreatePop === false ? state.newForm.ConCreatePop = true : state.newForm.ConCreatePop = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(configurationGet.pending, (state, action) => {
            state.loader.Loader = true
        });
        builder.addCase(configurationGet.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.ConfigGetData = action.payload
        }) 
        builder.addCase(configurationGetOne.fulfilled, (state, action) => {
            state.getOneData = action.payload
        })
        builder.addCase(configurationPost.fulfilled, (state, action) => {
            createSuccess(true)
            state.ConfigAddData.config_name = action.payload.config_name;
            state.ConfigAddData.desc = action.payload.desc;
            state.ConfigAddData.source_connection_name = action.payload.source_connection_name;
            state.ConfigAddData.target_connection_name = action.payload.target_connection_name;
            state.ConfigAddData.start_date = action.payload.start_date;
            state.ConfigAddData.end_date = action.payload.end_date;
            state.ConfigAddData.is_active = action.payload.is_active;
            state.newForm.ConCreatePop = action.payload.ConCreatePop;
            state.ConfigAddData.tenant_id=action.payload.tenant_id;
        })
        builder.addCase(configurationPut.fulfilled, (state, action) => {
            updateSuccess(true)
            state.configUpdate.config_name = action.payload.config_name;
            state.configUpdate.desc = action.payload.desc;
            state.configUpdate.source_connection_name = action.payload.source_connection_name;
            state.configUpdate.target_connection_name = action.payload.target_connection_name;
            state.configUpdate.start_date = action.payload.start_date;
            state.configUpdate.end_date = action.payload.end_date;
            state.configUpdate.is_active = action.payload.is_active;
            state.newForm.ConEditPop = action.payload.ConEditPop
        })
    }
})

export const { ConEditPop, ConViewPop, ConCreatePop, ConGetId } = configurationReducer.actions
export default (configurationReducer).reducer