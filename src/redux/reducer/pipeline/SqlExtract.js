import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SqlExtract } from '../../../api/BackEndURL'
import { message } from 'antd'

let id = ''
let key = 'updatable'

export const sqlExtractGet = createAsyncThunk("SqlExtractGet", async () => {
    return await SqlExtract.method.get(SqlExtract.URL.get).then((response) => response.data)
})
export const sqlExtractPost = createAsyncThunk("SqlExtractAdd", async (Data) => {
    return await SqlExtract.method.post(SqlExtract.URL.post, Data).then((response) => response.data)
})
export const sqlExtractGetOne = createAsyncThunk("SqlExtractGetOne", async () => {
    return await SqlExtract.method.get(`${SqlExtract.URL.get}${id}`).then((response) => response.data)
})
export const sqlExtractPut = createAsyncThunk("SqlExtractPut", async (Data) => {
    return await SqlExtract.method.put(`${SqlExtract.URL.put}${id}`, Data).then((response) => response.data)
})
export const createSuccess = () => {
    message.success({ content: 'Created SuccessFully!', key, duration: 2, });
};
export const updateSuccess = () => {
    message.success({ content: 'Updated SuccessFully!', key, duration: 2, });
};

export const sqlExtract = createSlice({
    name: "sqlExtract",
    initialState: { 
        getData: [],
        addData: {
            database_name: '',
            sql_validation: '',
            sql_status: '',
            sequelize_query: '',
            start_date: '',
            end_date: '',
            is_active: false,
            tenant_id: ''
        },
        UpdateData: {
            database_name: '',
            sql_validation: '',
            sql_status: '',
            sequelize_query: '',
            start_date: '',
            end_date: '',
            is_active: '',
        },
        newForm: {

            EditPop: false,
            ViewPop: false,
            CreatePop: false,
            SqlAddForm: false,
            Search: true
        },
        loader: {
            Loader: false
        },
        singleData: " ",
        getOneData: []

    },
    reducers: {
        GetId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        SqlAddForm: (state, action) => {
            state.newForm.Search = action.payload.Search
            state.newForm.SqlAddForm = action.payload.SqlAddForm
        },
        EditPop: (state, action) => {
            state.newForm.EditPop === false ? state.newForm.EditPop = true : state.newForm.EditPop = false
        },
        ViewPop: (state, action) => {
            state.newForm.ViewPop === false ? state.newForm.ViewPop = true : state.newForm.ViewPop = false
        },
        CreatePop: (state, action) => {
            state.newForm.CreatePop === false ? state.newForm.CreatePop = true : state.newForm.CreatePop = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sqlExtractGet.pending, (state, action) => {
            state.loader.Loader = true
        });

        builder.addCase(sqlExtractGet.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.getData = action.payload
        })
        builder.addCase(sqlExtractGetOne.fulfilled, (state, action) => {
            state.getOneData = action.payload
        })

        builder.addCase(sqlExtractPost.fulfilled, (state, action) => {
            createSuccess(true)
            state.newForm.CreatePop=false;
            state.newForm.SqlAddForm=false;
            state.newForm.Search=true;
            state.addData.database_name = action.payload.database_name;
            state.addData.sql_validation = action.payload.sql_validation;
            state.addData.sql_status = action.payload.sql_status;
            state.addData.sequelize_query = action.payload.sequelize_query;
            state.addData.start_date = action.payload.start_date;
            state.addData.end_date = action.payload.end_date;
            state.addData.is_active = action.payload.is_active;
            state.newForm.CreatePop = action.payload.CreatePop;
            state.addData.tenant_id = action.payload.tenant_id;
        })
        builder.addCase(sqlExtractPut.fulfilled, (state, action) => {
            updateSuccess(true)
            state.UpdateData.database_name = action.payload.database_name;
            state.UpdateData.sql_validation = action.payload.sql_validation;
            state.UpdateData.sql_status = action.payload.sql_status;
            state.UpdateData.sequelize_query = action.payload.sequelize_query;
            state.UpdateData.start_date = action.payload.start_date;
            state.UpdateData.end_date = action.payload.end_date;
            state.UpdateData.is_active = action.payload.is_active;
            state.newForm.EditPop = action.payload.EditPop;
        })


    }
})

export const { EditPop, ViewPop, CreatePop, GetId,SqlAddForm } = sqlExtract.actions

export default (sqlExtract).reducer