import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from 'antd'
import { DTransform,Token } from '../../../api/BackEndURL'

let id = ''
let key = 'updatable'

export const dTransformGet = createAsyncThunk("DTransformGet", async () => {
    return await DTransform.method.get(DTransform.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data) 
})

export const dTransformPost = createAsyncThunk("DTransformPost", async (Data) => {
    return await DTransform.method.post(`${DTransform.URL.post}`, Data,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const dTransformGetOne = createAsyncThunk("DTransformGetOne", async () => { 
       return await DTransform.method.get(`${DTransform.URL.get}${id}`,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const dTransformPut = createAsyncThunk("DTransformPut", async (Data) => {
    return await DTransform.method.put(`${DTransform.URL.put}${id}`, Data,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const createSuccess = () => {
    message.success({ content: 'Created Successfully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated Successfully!', key, duration: 2, });
};
export const DTransFormReducer = createSlice({
    name: "DTransform",
    initialState: {
        dTFormGetData: [],
        dTFormAddData: {
            schema_name:'',
            source_name: '',
            target_name: '',
            // config_name: '', 
            transform_name: '', 
            // config_id: '',
            start_date: '',
            end_date: '',
            is_active: true,
          
        },
        dTFormUpdate: {
            config_name: '', 
            schema_name:'',
            source_name: '',
            target_name: '',
            transform_name: '', 
            // Dtranfig_id: '',
            start_date: '',
            end_date: '',
            is_active: '',
        },
        newForm: {
            DtranEditPop: false,
            DtranViewPop: false,
            DtranCreatePop: false,
            DTransAddForm:false,
            Search: true
        },
        loader: {
            Loader: false
        },
        singleData: "",
        getOneData: []
    },
    reducers: {
        DtranGetId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        DTransAddForm: (state, action) => {
            state.newForm.Search = action.payload.Search
            state.newForm.DTransAddForm = action.payload.DTransAddForm
        },
        DtranEditPop: (state, action) => {
            state.newForm.DtranEditPop === false ? state.newForm.DtranEditPop = true : state.newForm.DtranEditPop = false
        },
        DtranViewPop: (state, action) => {
            state.newForm.DtranViewPop === false ? state.newForm.DtranViewPop = true : state.newForm.DtranViewPop = false
        },
        DtranCreatePop: (state, action) => {
            // state.newForm.DtranCreatePop === false ? state.newForm.DtranCreatePop = true : state.newForm.DtranCreatePop = false
            state.newForm.DtranCreatePop=action.payload.DtranCreatePop
        }
    },
    extraReducers: (builder) => {
        builder.addCase(dTransformGet.pending, (state, action) => {
            state.loader.Loader = true
        });
        builder.addCase(dTransformGet.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.dTFormGetData = action.payload
        }) 
        builder.addCase(dTransformGetOne.fulfilled, (state, action) => {
            state.getOneData = action.payload
        })
        builder.addCase(dTransformPost.fulfilled, (state, action) => {
            createSuccess(true)
            state.newForm.DtranCreatePop=false;
            state.newForm.DTransAddForm=false;
            state.newForm.Search=true;
            state.dTFormAddData.schema_name = action.payload.schema_name;
            state.dTFormAddData.source_name = action.payload.source_name;
            state.dTFormAddData.target_name = action.payload.target_name;
            // state.dTFormAddData.config_name = action.payload.config_name;
            state.dTFormAddData.transform_name = action.payload.transform_name;
            // state.dTFormAddData.config_id = action.payload.config_id;
            state.dTFormAddData.start_date = action.payload.start_date;
            state.dTFormAddData.end_date = action.payload.end_date;
            state.dTFormAddData.is_active = action.payload.is_active;
            state.newForm.DtranCreatePop = action.payload.DtranCreatePop;
            // state.dTFormAddData.tenant_id=action.payload.tenant_id;
        })
        builder.addCase(dTransformPut.fulfilled, (state, action) => {
            updateSuccess(true)
            state.dTFormAddData.schema_name = action.payload.schema_name;
            state.dTFormAddData.source_name = action.payload.source_name;
            state.dTFormAddData.target_name = action.payload.target_name;
            // state.dTFormAddData.config_name = action.payload.config_name;
            state.dTFormAddData.transform_name = action.payload.transform_name;
            // state.dTFormAddData.config_id = action.payload.config_id;
            state.dTFormAddData.start_date = action.payload.start_date;
            state.dTFormAddData.end_date = action.payload.end_date;
            state.dTFormUpdate.is_active = action.payload.is_active;
            state.newForm.DtranEditPop = action.payload.DtranEditPop
        })
    }
})

export const { DtranEditPop, DtranViewPop, DtranCreatePop, DtranGetId ,DTransAddForm} = DTransFormReducer.actions
export default (DTransFormReducer).reducer