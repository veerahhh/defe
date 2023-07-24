import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ConnectionDetail,Token } from '../../../api/BackEndURL'
import { message } from 'antd'

let id = ''
const key = 'updatable';

export const connectionDetailGet = createAsyncThunk("ConnectionDetailGet", async () => {
    return await ConnectionDetail.method.get(ConnectionDetail.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})
export const connectionDetailAdd = createAsyncThunk("ConnectionDetailAdd", async (Details) => {
    return await ConnectionDetail.method.post(`${ConnectionDetail.URL.post}`, Details,{headers: { "Authorization": Token }}).then((response) => response.data)
})
export const connectionDetailPutId = createAsyncThunk("connectionPutId", async (Detail) => {
    return await ConnectionDetail.method.put(`${ConnectionDetail.URL.put}${id}`, Detail,{headers: { "Authorization": Token }}).then((response) => response.data)
})
export const connectionDetailGetId = createAsyncThunk("ConnectionDetailGetID", async () => {
    return await ConnectionDetail.method.get(`${ConnectionDetail.URL.get}${id}`,{headers: { "Authorization": Token }}).then((response) => response.data)
})
export const createSuccess = () => {
    message.success({ content: 'Created Successfully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated Successfully!', key, duration: 1, });
};
export const connectiondtlReducer = createSlice({
    name: "ConnectionDetail",
    initialState: {
        ConData: [],
        addCondtl: {
            connection_name: '',
            connection_detail: '',
            con_pram: '',
            end_date: '',
            is_active: false,
            tenant_id:''
        },
        Conndtlupdate: {
            connection_name: '',
            connection_detail: '',
            conn_pram: '',
            start_date: '',
            end_date: '',
            is_active: false,
        },
        Condtlmodal: {
            ConndtlPopupAdd: false,
            ConndtlPopupEdit: false,
            ConndtlPopupView: false,
            ConndtlAddForm:false,
            Search:true
        },
        loader: {
            Loader: false
        },
        singleData: "",
        getConnectiondtlOneData: []
    },
    reducers: {
        ConndtlGetId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        ConndtlPopupAdd: (state, action) => {
            state.Condtlmodal.ConndtlPopupAdd === false ? state.Condtlmodal.ConndtlPopupAdd = true : state.Condtlmodal.ConndtlPopupAdd = false
        },
        ConndtlPopupEdit: (state, action) => {
            state.Condtlmodal.ConndtlPopupEdit === false ? state.Condtlmodal.ConndtlPopupEdit = true : state.Condtlmodal.ConndtlPopupEdit = false
        },
        ConndtlPopupView: (state, action) => {
            state.Condtlmodal.ConndtlPopupView === false ? state.Condtlmodal.ConndtlPopupView = true : state.Condtlmodal.ConndtlPopupView = false
        }
    },

    extraReducers: (builder) => {
        builder.addCase(connectionDetailGet.pending, (state, action) => {
            state.loader.Loader = true
        })
        builder.addCase(connectionDetailGet.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.ConData = action.payload
        });
        builder.addCase(connectionDetailAdd.fulfilled, (state, action) => {
            createSuccess(true)
            state.Condtlmodal.ConndtlPopupAdd = false
            state.addCondtl.connection_name = action.payload.connection_name;
            state.addCondtl.connection_detail = action.payload.connection_detail;
            state.addCondtl.con_pram = action.payload.con_pram;
            state.addCondtl.start_date = action.payload.start_date;
            state.addCondtl.end_date = action.payload.end_date;
            state.addCondtl.is_active = action.payload.is_active;
            state.addCondtl.tenant_id=action.payload.tenant_id;
        })
        builder.addCase(connectionDetailGetId.fulfilled, (state, action) => {
            state.getConnectiondtlOneData = action.payload
        });
        builder.addCase(connectionDetailPutId.fulfilled, (state, action) => {
            updateSuccess(true)
            state.Condtlmodal.ConndtlPopupEdit = false
            state.Conndtlupdate.connection_name = action.payload.connection_name;
            state.Conndtlupdate.connection_detail = action.payload.connection_detail;
            state.Conndtlupdate.start_date = action.payload.start_date;
            state.Conndtlupdate.end_date = action.payload.end_date;

        })
    }
})
export const { ConndtlPopupAdd, ConndtlPopupEdit, ConndtlPopupView, ConndtlGetId } = connectiondtlReducer.actions
export default (connectiondtlReducer).reducer