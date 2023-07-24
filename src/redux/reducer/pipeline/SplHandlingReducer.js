import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SplHandling,Token } from '../../../api/BackEndURL'
import { message } from 'antd'

let id = ''
let key = 'updatable'
export const SplHandlingGet = createAsyncThunk("SplHandlingGet", async () => {
    return await SplHandling.method.get(SplHandling.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const SplHandlingPost = createAsyncThunk("SplHandlingAdd", async (Data) => {
    return await SplHandling.method.post(`${SplHandling.URL.post,{headers:{"Authorization" : Token}}}`, Data).then((response) => response.data)
})

export const SplHandlingOne = createAsyncThunk("SplHandlingtOne", async () => {
    return await SplHandling.method.get(`${SplHandling.URL.get}${id}`,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const SplHandlingPut = createAsyncThunk("SplHandlingPut", async (Data) => {
    return await SplHandling.method.put(`${SplHandling.URL.put}${id}`, Data,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const createSuccess = () => {
    message.success({ content: 'Created Successfully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated Successfully!', key, duration: 2, });
};
export const SplHandlingReducer = createSlice({
    name: "SplHandling",
    initialState: {
        SplHandlingGetData: [],
        SplHandlingAddData: {
            Handling_name:'',
            source_name: '',
            target_name: '',
            start_date: '',
            end_date: '',
            active:'',
            // tenant_id:'',

        },
        SplHandlingUpdate: {
            Handling_name:'',
            source_name: '',
            target_name: '',
            start_date: '',
            end_date: '',
            is_active:''
        },
        newForm: {
            SplHandlingEditPop: false,
            SplHandlingViewPop: false,
            SplHandlingCreatePop: false,
            SplHandlingAddForm:false,
            Search:true,
        },
        loader: {
            Loader: false
        },
        singleData: "",
        getOneData: []
    },
    reducers: {
        SplHandlingId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        SplHandlingAddForm:(state,action)=>{
            state.newForm.Search=action.payload.Search
            state.newForm.SplHandlingAddForm=action.payload.SplHandlingAddForm
        },
        SplHandlingEditPop: (state, action) => {
            state.newForm.SplHandlingEditPop === false ? state.newForm.SplHandlingEditPop = true : state.newForm.SplHandlingEditPop = false
        },
        SplHandlingViewPop: (state, action) => {
            state.newForm.SplHandlingViewPop === false ? state.newForm.SplHandlingViewPop = true : state.newForm.SplHandlingViewPop = false
        },
        SplHandlingCreatePop: (state, action) => {
            state.newForm.SplHandlingCreatePop=action.payload.SplHandlingCreatePop
            // state.newForm.SchemaMigrateCreatePop === false ? state.newForm.SchemaMigrateCreatePop = true : state.newForm.SchemaMigrateCreatePop = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(SplHandlingGet.pending, (state, action) => {
            state.loader.Loader = true
        });
        builder.addCase(SplHandlingGet.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.SplHandlingGetData = action.payload
        })
        builder.addCase(SplHandlingOne.fulfilled, (state, action) => {
            state.getOneData = action.payload
        })
        builder.addCase(SplHandlingPost.fulfilled, (state, action) => {
            createSuccess(true)
            state.newForm.SplHandlingCreatePop=false;
            state.newForm.SplHandlingAddForm=false;
            state.newForm.Search=true;
            state.SplHandlingAddData.schema_name = action.payload.Handling_name;
            state.SplHandlingAddData.source_name = action.payload.source_name;
            state.SplHandlingAddData.target_name = action.payload.target_name;
            state.SplHandlingAddData.start_date = action.payload.start_date;
            state.SplHandlingAddData.end_date = action.payload.end_date;
            state.SplHandlingAddData.active = action.payload.active;
            state.newForm.SplHandlingCreatePop = action.payload.SplHandlingCreatePop;
            // state.SplHandlingAddData.tenant_id=action.payload.tenant_id
           
        })
        builder.addCase(SplHandlingPut.fulfilled, (state, action) => {
            updateSuccess(true)
            state.SplHandlingUpdate.schema_name = action.payload.schema_name;
            state.SplHandlingUpdate.source_name = action.payload.source_name;
            state.SplHandlingUpdate.target_name = action.payload.target_name;
            state.SplHandlingUpdate.start_date = action.payload.start_date;
            state.SplHandlingUpdate.end_date = action.payload.end_date;
            state.SplHandlingUpdate.is_active = action.payload.is_active;
            state.newForm.SplHandlingEditPop = action.payload.SplHandlingEditPop
        })
    }
})

export const { SplHandlingEditPop, SplHandlingViewPop, SplHandlingCreatePop, SplHandlingId,SplHandlingAddForm } = SplHandlingReducer.actions
export default (SplHandlingReducer).reducer