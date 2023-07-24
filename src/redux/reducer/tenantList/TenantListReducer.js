import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TenantList } from '../../../api/BackEndURL'
import { message } from 'antd'

let id = ''
let key = 'updatable'

export const tenantGet = createAsyncThunk("TenantGet", async () => {
    return await TenantList.method.get(TenantList.URL.get).then((response) => response.data)
})

export const tenantPost = createAsyncThunk("TenantAdd", async (Data) => {
    return await TenantList.method.post(`${TenantList.URL.post}`, Data).then((response) => response.data)
})

export const tenantGetOne = createAsyncThunk("TenantGetOne", async () => {
    return await TenantList.method.get(`${TenantList.URL.get}${id}`).then((response) => response.data)
})

export const tenantPut = createAsyncThunk("TenantPut", async (Data) => {
    return await TenantList.method.put(`${TenantList.URL.put}${id}`, Data).then((response) => response.data)
})

export const createSuccess = () => {
    message.success({ content: 'Created Successfully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated Successfully!', key, duration: 2, });
};

export const tenantReducer = createSlice({
    name: "tenant",
    initialState: {
        TenantGetData: [],
        tenantAddData: {
            company_name:'',
            team_count:'',
            email: '',
            phone_number:'',
            role:'',
            address:'',
            country:'',
            city:'',
            start_date: '',
            end_date: '',
            is_active: false,
            tenant_id:''
        },
        tenantUpdate: {
            company_name: '',
            email: '',
            phone_number:'',
            role:'',
            address:'',
            country:'',
            city:'',
            start_date: '',
            end_date: '',
            is_active: '',
        },
        newForm: {
            TenantEditPop: false,
            TenantViewPop: false,
            TenantCreatePop: false,
            TenantGroupViewPop:false,
        },
        loader: {
            Loader: false
        },
        singleData: "",
        getOneData: []
    },
    reducers: {
        TenantGetId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        TenantEditPop: (state, action) => {
            state.newForm.TenantEditPop === false ? state.newForm.TenantEditPop = true : state.newForm.TenantEditPop = false
        },
        TenantViewPop: (state, action) => {
            state.newForm.TenantViewPop === false ? state.newForm.TenantViewPop = true : state.newForm.TenantViewPop = false
        },
        TenantCreatePop: (state, action) => {
            state.newForm.TenantCreatePop === false ? state.newForm.TenantCreatePop = true : state.newForm.TenantCreatePop = false
        },
        TenantGroupViewPop: (state, action) => {
            state.newForm.TenantGroupViewPop === false ? state.newForm.TenantGroupViewPop = true : state.newForm.TenantGroupViewPop = false
        }                     
    },
    extraReducers: (builder) => {
        builder.addCase(tenantGet.pending, (state, action) => {
            state.loader.Loader = true
        });
        builder.addCase(tenantGet.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.TenantGetData = action.payload
        })
        builder.addCase(tenantGetOne.fulfilled, (state, action) => {
            state.getOneData = action.payload
        })
        builder.addCase(tenantPost.fulfilled, (state, action) => {
            createSuccess(true)
            state.tenantAddData.company_name = action.payload.company_name;
            state.tenantAddData.email = action.payload.email;
            state.tenantAddData.role = action.payload.role;
            state.tenantAddData.phone_number = action.payload.phone_number;
            state.tenantAddData.address = action.payload.address;
            state.tenantAddData.country = action.payload.country;
            state.tenantAddData.city = action.payload.city;
            state.tenantAddData.postalcode = action.payload.postalcode;
            state.tenantAddData.start_date = action.payload.start_date;
            state.tenantAddData.end_date = action.payload.end_date;
            state.tenantAddData.is_active = action.payload.is_active;
            state.newForm.TenantCreatePop = action.payload.TenantCreatePop;
            state.tenantAddData.tenant_id=action.payload.tenant_id;
        })
        builder.addCase(tenantPut.fulfilled, (state, action) => {
            updateSuccess(true)
            state.tenantUpdate.company_name = action.payload.company_name;
            state.tenantUpdate.email = action.payload.email;
            state.tenantUpdate.role = action.payload.role;
            state.tenantUpdate.phone_number = action.payload.phone_number;
            state.tenantUpdate.country = action.payload.country;
            state.tenantUpdate.postalcode = action.payload.postalcode;
            state.tenantUpdate.city = action.payload.city;
            state.tenantUpdate.start_date = action.payload.start_date;
            state.tenantUpdate.end_date = action.payload.end_date;
            state.tenantUpdate.is_active = action.payload.is_active;
            state.newForm.TenantEditPop = action.payload.TenantEditPop
        })
    }
})

export const { TenantEditPop, TenantViewPop, TenantCreatePop, TenantGetId, TenantGroupViewPop } = tenantReducer.actions
export default (tenantReducer).reducer