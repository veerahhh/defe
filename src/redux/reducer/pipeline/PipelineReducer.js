import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Pipeline } from '../../../api/BackEndURL'
import { message } from 'antd'

let id = ''
const key = 'updatable';

export const pipelineGet = createAsyncThunk("PipelineGet", async () => {
    return await Pipeline.method.get(Pipeline.URL).then((response) => response.data)
})

export const pipelineGetOne = createAsyncThunk("PipelineGetOne", async () => {
    return await Pipeline.method.get(`${Pipeline.URL}${id}`).then((response) => response.data)
})

export const pipelineAdd = createAsyncThunk("PipelineAdd", async (Details) => {
    return await Pipeline.method.post(`${Pipeline.URL}`, Details).then((response) => response.data)
})

export const pipelineUpdate = createAsyncThunk("PipelineUpdate", async (Data) => {
    return await Pipeline.method.put(`${Pipeline.URL}${id}`, Data).then((response) => response.data)
})

export const createSuccess = () => {
    message.success({ content: 'Created SuccessFully!', key, duration: 2, });
};

export const updateSuccess = () => {
    message.success({ content: 'Updated Successfully!', key, duration: 1, });
};

export const pipelineReducer = createSlice({
    name: "Pipeline",
    initialState: {
        Data: [],
        GetOneData: [],
        add: {
            pipeline_name: '',
            Description: '',
            email: '',
            config_id: '',
            Start_date: '',
            End_date: '',
            is_active: false,
            tenant_id: ''
        },
        update: {
            pipeline_name: '',
            Description: '',
            email: '',
            End_date: '',
            is_active: true,
        },
        modal: {
            Add: false,
            Edit: false,
            View: false,
            Search: true,
            AddForm: false,
            PendingMsg: false,
            SuccessMsg: false,
        },
        loader: {
            Loader: false
        },
        message: {
            Add: false,
            Edit: false
        },
        ID: {
            getId: '',
            status: ''
        }
    },
    reducers: {
        Add: (state, action) => {
            state.modal.Add === false ? state.modal.Add = true : state.modal.Add = false
        },
        AddForm: (state, action) => {
            state.modal.Search = action.payload.Search
            state.modal.AddForm = action.payload.AddForm
        },
        Edit: (state, action) => {
            state.modal.Edit === false ? state.modal.Edit = true : state.modal.Edit = false
        },
        View: (state, action) => {
            state.modal.View === false ? state.modal.View = true : state.modal.View = false
        },
        PipeGetId: (state, action) => {
            state.ID.status = action.payload.status
            state.ID.getId = action.payload.getId
            id = state.ID.getId
        }
    },
    extraReducers: (builder) => {
        builder.addCase(pipelineGet.pending, (state, action) => {
            state.loader.Loader = true
        });
        builder.addCase(pipelineGet.fulfilled, (state, action) => {
            state.loader.Loader = false
            state.Data = action.payload
        });

        builder.addCase(pipelineAdd.fulfilled, (state, action) => {
            createSuccess(true)
            state.modal.Add = false;
            state.modal.AddForm = false;
            state.modal.Search = true
            state.add.pipeline_name = action.payload.pipeline_name;
            state.add.Description = action.payload.Description;
            state.add.configuration_name = action.payload.configuration_name;
            state.add.Start_date = action.payload.Start_date;
            state.add.End_date = action.payload.End_date;
            state.add.is_active = action.payload.is_active;
            state.add.tenant_id = action.payload.tenant_id
        });
        builder.addCase(pipelineGetOne.fulfilled, (state, action) => {
            state.GetOneData = action.payload
        });
        builder.addCase(pipelineUpdate.fulfilled, (state, action) => {
            updateSuccess(true)
            state.modal.Edit = false
            state.update.pipeline_name = action.payload.pipeline_name;
            state.update.Description = action.payload.Description;
            state.update.End_date = action.payload.End_date;
            state.update.is_active = action.payload.is_active
        })
    }
})
export const { Add, Edit, View, PipeGetId, AddForm } = pipelineReducer.actions
export default (pipelineReducer).reducer
