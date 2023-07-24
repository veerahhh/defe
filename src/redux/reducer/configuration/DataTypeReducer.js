import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DataType,Token } from '../../../api/BackEndURL'
import { message } from 'antd'

let id = ''
let key = 'updatable'
export const DataTypeGet = createAsyncThunk("DataTypeGet", async () => {
    return await DataType.method.get(DataType.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const DataTypePost = createAsyncThunk("DataTypeAdd", async (Data) => {
    return await DataType.method.post(`${DataType.URL.post}`, Data,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const DataTypeGetOne = createAsyncThunk("DataTypeGetOne", async () => {
    return await DataType.method.get(`${DataType.URL.get}${id}`,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const DataTypePut = createAsyncThunk("DataTypePut", async (Data) => {
    return await DataType.method.put(`${DataType.URL.put}${id}`, Data,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const createSuccess = () => {
    message.success({ content: 'Created Successfully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated Successfully!', key, duration: 2, });
};
export const DataTypeReducer = createSlice({
    name: "DataType",
    initialState: {
        DataTypeGetData: [],
        DataTypeAddData: {
            datatype_mapping_name:'',
            config_name: '',
            source_name: '',
            target_name: '',
            datatype: '',
            tenant_id:''
        },
        DataTypeUpdate: {
            datatype_mapping_name:'',
            config_name: '',
            source_name: '',
            target_name: '',
            datatype: '',
        },
        newForm: {
            DTypeEditPop: false,
            DTypeViewPop: false,
            DTypeCreatePop: false,
            DTypeAddForm:false,
            Search:true
        },
        loader: {
            Loader: false
        },
        singleData: "",
        getOneData:[],
    },
    reducers: {
        DTypeGetId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        DTypeAddForm:(state,action)=>{
            state.newForm.Search=action.payload.Search
            state.newForm.DTypeAddForm=action.payload.DTypeAddForm
        },
        DTypeEditPop: (state, action) => {
            state.newForm.DTypeEditPop === false ? state.newForm.DTypeEditPop = true : state.newForm.DTypeEditPop = false
        },
        DTypeViewPop: (state, action) => {
            state.newForm.DTypeViewPop === false ? state.newForm.DTypeViewPop = true : state.newForm.DTypeViewPop = false
        },
        DTypeCreatePop: (state, action) => {
            state.newForm.DTypeCreatePop === false ? state.newForm.DTypeCreatePop = true : state.newForm.DTypeCreatePop = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(DataTypeGet.pending, (state, action) => {
            state.loader.Loader = true
        });
        builder.addCase(DataTypeGet.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.DataTypeGetData = action.payload
        })
        builder.addCase(DataTypeGetOne.fulfilled, (state, action) => {
            state.getOneData = action.payload
        })
        builder.addCase(DataTypePost.fulfilled, (state, action) => {
            createSuccess(true);
            state.newForm.DTypeCreatePop=false;
            state.newForm.DTypeAddForm=false;
            state.newForm.Search=true;
            state.DataTypeAddData.datatype_mapping_name = action.payload.datatype_mapping_name;
            state.DataTypeAddData.source_name = action.payload.source_name;
            state.DataTypeAddData.target_name = action.payload.target_name;
            state.DataTypeAddData.datatype = action.payload.datatype;
            state.newForm.DTypeCreatePop = action.payload.DTypeCreatePop
            state.DataTypeAddData.tenant_id=action.payload.tenant_id
        })
        builder.addCase(DataTypePut.fulfilled, (state, action) => {
            updateSuccess(true)
            state.DataTypeUpdate.datatype_mapping_name = action.payload.datatype_mapping_name;
            state.DataTypeUpdate.source_connection_name = action.payload.source_connection_name;
            state.DataTypeUpdate.target_connection_name = action.payload.target_connection_name;
            state.DataTypeAddData.datatype = action.payload.datatype;       
            state.newForm.DTypeEditPop = action.payload.DTypeEditPop
        })
    }
})

export const { DTypeEditPop, DTypeViewPop, DTypeCreatePop, DTypeGetId, DTypeAddForm} = DataTypeReducer.actions
export default (DataTypeReducer).reducer