import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SchemaMigrate } from '../../../api/BackEndURL'
import { message } from 'antd'

let id = ''
let key = 'updatable'

export const SchemaMigrateGet = createAsyncThunk("SchemaMigrateGet", async () => {
    return await SchemaMigrate.method.get(SchemaMigrate.URL.get).then((response) => response.data)
})

export const SchemaMigratePost = createAsyncThunk("SchemaMigrateAdd", async (Data) => {
    return await SchemaMigrate.method.post(`${SchemaMigrate.URL.post}`, Data).then((response) => response.data)
})

export const SchemaMigrateOne = createAsyncThunk("SchemaMigratetOne", async () => {
    return await SchemaMigrate.method.get(`${SchemaMigrate.URL.get}${id}`).then((response) => response.data)
})

export const SchemaMigratePut = createAsyncThunk("SchemaMigratePut", async (Data) => {
    return await SchemaMigrate.method.put(`${SchemaMigrate.URL.put}${id}`, Data).then((response) => response.data)
})

export const createSuccess = () => {
    message.success({ content: 'Created Successfully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated Successfully!', key, duration: 2, });
};
export const SchemaMigrateReducer = createSlice({
    name: "SchemaMigrate",
    initialState: {
        SchemaMigrateGetData: [],
        SchemaMigrateAddData: {
            schema_name:'',
            source_name: '',
            target_name: '',
            start_date: '',
            end_date: '',
            active:'',
            tenant_id:'',

        },
        SchemaMigrateUpdate: {
            schema_name:'',
            source_name: '',
            target_name: '',
            start_date: '',
            end_date: '',
            is_active:''
        },
        newForm: {
            SchemaMigrateEditPop: false,
            SchemaMigrateViewPop: false,
            SchemaMigrateCreatePop: false,
            SchemaAddForm:false,
            Search:true,
        },
        loader: {
            Loader: false
        },
        singleData: "",
        getOneData: []
    },
    reducers: {
        SchemaMigrateId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        SchemaAddForm:(state,action)=>{
            state.newForm.Search=action.payload.Search
            state.newForm.SchemaAddForm=action.payload.SchemaAddForm
        },
        SchemaMigrateEditPop: (state, action) => {
            state.newForm.SchemaMigrateEditPop === false ? state.newForm.SchemaMigrateEditPop = true : state.newForm.SchemaMigrateEditPop = false
        },
        SchemaMigrateViewPop: (state, action) => {
            state.newForm.SchemaMigrateViewPop === false ? state.newForm.SchemaMigrateViewPop = true : state.newForm.SchemaMigrateViewPop = false
        },
        SchemaMigrateCreatePop: (state, action) => {
            state.newForm.SchemaMigrateCreatePop=action.payload.SchemaMigrateCreatePop
            // state.newForm.SchemaMigrateCreatePop === false ? state.newForm.SchemaMigrateCreatePop = true : state.newForm.SchemaMigrateCreatePop = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(SchemaMigrateGet.pending, (state, action) => {
            state.loader.Loader = true
        });
        builder.addCase(SchemaMigrateGet.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.SchemaMigrateGetData = action.payload
        })
        builder.addCase(SchemaMigrateOne.fulfilled, (state, action) => {
            state.getOneData = action.payload
        })
        builder.addCase(SchemaMigratePost.fulfilled, (state, action) => {
            createSuccess(true)
            state.newForm.SchemaMigrateCreatePop=false;
            state.newForm.SchemaAddForm=false;
            state.newForm.Search=true;
            state.SchemaMigrateAddData.schema_name = action.payload.schema_name;
            state.SchemaMigrateAddData.source_name = action.payload.source_name;
            state.SchemaMigrateAddData.target_name = action.payload.target_name;
            state.SchemaMigrateAddData.start_date = action.payload.start_date;
            state.SchemaMigrateAddData.end_date = action.payload.end_date;
            state.SchemaMigrateAddData.active = action.payload.active;
            state.newForm.SchemaMigrateCreatePop = action.payload.SchemaMigrateCreatePop;
            state.SchemaMigrateAddData.tenant_id=action.payload.tenant_id
           
        })
        builder.addCase(SchemaMigratePut.fulfilled, (state, action) => {
            updateSuccess(true)
            state.SchemaMigrateUpdate.schema_name = action.payload.schema_name;
            state.SchemaMigrateUpdate.source_name = action.payload.source_name;
            state.SchemaMigrateUpdate.target_name = action.payload.target_name;
            state.SchemaMigrateUpdate.start_date = action.payload.start_date;
            state.SchemaMigrateUpdate.end_date = action.payload.end_date;
            state.SchemaMigrateUpdate.is_active = action.payload.is_active;
            state.newForm.SchemaMigrateEditPop = action.payload.SchemaMigrateEditPop
        })
    }
})

export const { SchemaMigrateEditPop, SchemaMigrateViewPop, SchemaMigrateCreatePop, SchemaMigrateId,SchemaAddForm } = SchemaMigrateReducer.actions
export default (SchemaMigrateReducer).reducer