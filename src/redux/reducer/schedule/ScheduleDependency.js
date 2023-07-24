import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {ScheduleDependency} from '../../../api/BackEndURL'
import {message} from 'antd'

let id = '';

export const ScheduleDependencyGet = createAsyncThunk("ScheduleDependencyGet", async () => {
    return await ScheduleDependency.method.get(ScheduleDependency.URL.get).then((response) =>response.data)
})
export const ScheduleDependencyPost = createAsyncThunk("ScheduleDependencyPost", async (Detail) => {
    return await ScheduleDependency.method.post(`${ScheduleDependency.URL.post}`,Detail).then((response)=>response.data)
})
export const ScheduleDependencyGetOne = createAsyncThunk("ScheduleDependencyGetOne", async()=>{
    return await ScheduleDependency.method.get(`${ScheduleDependency.URL.get}${id}`).then((response)=>response.data)
})
export const Sched_schedule_Edit = createAsyncThunk("ScheduleDependencyEdit", async(Data)=>{
    return await ScheduleDependency.method.put(`${ScheduleDependency.URL.update}${id}`,Data).then((response)=>response.data)
})


const key = 'updatable';
const openMessage = () => {
  message.loading({
    content: 'Loading...',
    key,
  });
  setTimeout(() => {
    message.success({
      content: 'Updated Successfully!',
      key,
      duration: 2,
    });
  }, 1000);
};

const openaddMessage = () => {
    message.loading({
      content: 'Loading...',
      key,
    });
    setTimeout(() => {
      message.success({
        content: 'Created Successfully!',
        key,
        duration: 2,
      });
    }, 1000);
  };
  
export const ScheduleDependencyReducer = createSlice({
    name:"ScheduleDependencyReducer",
    initialState:{
        Data:[],
        add: {
            pipeline_schedule_dependency_name: '',
            parent_schedule_name: '',
            child_schedule_name: '',
            start_date: '',
            end_date: '',
            is_active: false,
            tenant_id:''
        },
        edit: {
            pipeline_schedule_dependency_name: '',
            parent_schedule_name: '',
            child_schedule_name: '',
            start_date: '',
            end_date: '',
            is_active: '',
        },
        newForm:{
            AddForm:false,
            EditForm: false,
            ViewForm: false
        },
        getData:'',
        getOneData:[],
       
    },
    reducers:{
        AddFormOpen:(state,action)=>{
            state.newForm.AddForm===false?state.newForm.AddForm=true:state.newForm.AddForm=false
        },
        getId:(state,action)=>{
            state.getData=action.payload.getData
            id=state.getData

        },
        EditForm:(state,action)=>{
            state.newForm.EditForm===false?state.newForm.EditForm=true:state.newForm.EditForm=false
        },
        ViewForm:(state,action)=>{
            state.newForm.ViewForm===false?state.newForm.ViewForm=true:state.newForm.ViewForm=false
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(ScheduleDependencyGet.fulfilled,(state,action)=>{
            state.Data=action.payload
        });
        builder.addCase(ScheduleDependencyPost.fulfilled,(state,action)=>{
            openaddMessage(true)
            state.add.pipeline_schedule_dependency_name = action.payload.pipeline_schedule_dependency_name;
            state.add.parent_schedule_name = action.payload.parent_schedule_name;
            state.add.child_schedule_name = action.payload.child_schedule_name;
            state.add.start_date = action.payload.start_date;
            state.add.end_date = action.payload.end_date;
            state.add.is_active = action.payload.is_active;
            state.newForm.AddForm = action.payload.AddForm;
            state.add.tenant_id=action.payload.tenant_id
        });
        builder.addCase(ScheduleDependencyGetOne.fulfilled,(state,action)=>{
            state.getOneData = action.payload
        });
        builder.addCase(Sched_schedule_Edit.fulfilled,(state,action)=>{
            openMessage(true)
            state.edit.pipeline_schedule_dependency_name = action.payload.pipeline_schedule_dependency_name;
            state.edit.parent_schedule_name = action.payload.parent_schedule_name;
            state.edit.child_schedule_name = action.payload.child_schedule_name;
            state.edit.start_date = action.payload.start_date;
            state.edit.end_date = action.payload.end_date;
            state.edit.is_active = action.payload.is_active;
            state.newForm.EditForm = action.payload.EditForm;
        });

    }
})
export const {AddFormOpen,EditForm, ViewForm, getId}=ScheduleDependencyReducer.actions
export default (ScheduleDependencyReducer).reducer