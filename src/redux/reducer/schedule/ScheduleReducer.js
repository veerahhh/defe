import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {PipelineDetail,Schedule} from '../../../api/BackEndURL'
import {message} from 'antd'

let id = ''

export const pipelineGet = createAsyncThunk("PipelineGet", async () => {
    return await PipelineDetail.method.get(PipelineDetail.URL.get).then((response) =>response.data)
})
export const ScheduleGet = createAsyncThunk("ScheduleGet", async () => {
    return await Schedule.method.get(Schedule.URL.get).then((response) =>response.data)
})
export const ScheduleGetOne = createAsyncThunk("ScheduleGetOne", async () => {
    return await Schedule.method.get(`${Schedule.URL.get}${id}`).then((response) =>response.data)
})
export const SchedulePost = createAsyncThunk("SchedulePost", async (detail) => {
    return await Schedule.method.post(`${Schedule.URL.post}`,detail).then((response) =>response.data)
})
export const ScheduleTimePost = createAsyncThunk("SchedulePost", async (detail) => {
    return await Schedule.method.post(`${Schedule.URL.posttime}`,detail).then((response) =>response.data)
})
export const Schedule_Edit = createAsyncThunk("ScheduleEdit", async(Data)=>{
    return await Schedule.method.put(`${Schedule.URL.put}${id}`,Data).then((response)=>response.data)
})

const key = 'updatable';

const openMessage = () => {
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

const openeditMessage = () => {
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

export const ScheduleReducer = createSlice({
    name:"ScheduleReducer",
    initialState:{
       pipeGetData:[],
       scheduleData:[],
       addpipeschedule:{
        pipeline_detail_name:'',
        pipeline_schedule_name:'',
        pipe_sched_description: '',
        pipeline_schedule_start_date:'',
        pipeline_schedule_end_date:'',
        pipeline_schedule_time:'',
        pipeline_status: false,
        tenant_id:'',
        pipeline_schedule_run_imme:false
       },
       editpipeschedule:{
        pipeline_schedule_name: '',
        pipeline_detail_name: '',
        pipe_sched_description: '',
        pipeline_schedule_start_date:'',
        pipeline_schedule_end_date:'',
        pipeline_schedule_time:'',
        pipeline_status:'',
        pipeline_schedule_run_imme:''
       },
        newForm:{
            AddForm:false,
            EditSchedForm:false,
            ViewSchedForm:false,
            ScheduleAdd:false,
            search:true    
        },
        getId: '',
        getOneData: []   ,
        loader:{
            Loader:false
        }    
    },
    reducers:{
        getSchedId:(state,action)=>{
            state.getId=action.payload.getId
            id=state.getId

        },
        ListForm:(state,action)=>{
            state.newForm.AddForm===false?state.newForm.AddForm=true:state.newForm.AddForm=false
        },
        EditSchedForm:(state,action)=>{
            state.newForm.EditSchedForm===false?state.newForm.EditSchedForm=true:state.newForm.EditSchedForm=false
        },
        ViewSchedForm:(state,action)=>{
            state.newForm.ViewSchedForm===false?state.newForm.ViewSchedForm=true:state.newForm.ViewSchedForm=false
        },
        ScheduleAddForm:(state,action)=>{
            state.newForm.search = action.payload.search
            state.newForm.ScheduleAdd = action.payload.ScheduleAdd
        },
      
    },
    extraReducers:(builder)=>{
        builder.addCase(ScheduleGet.pending,(state,action)=>{
            state.loader.Loader=true
        });
        builder.addCase(ScheduleGet.fulfilled,(state,action)=>{
            state.loader.Loader=false
            state.scheduleData = action.payload
        });
        builder.addCase(ScheduleGetOne.fulfilled,(state,action)=>{
            state.getOneData=action.payload
        });
        builder.addCase(pipelineGet.fulfilled,(state,action)=>{
            state.pipeGetData=action.payload
        });
        
        builder.addCase(SchedulePost.fulfilled,(state,action)=>{
            openMessage()
            state.newForm.AddForm=false;
            state.newForm.ScheduleAdd=false;
            state.newForm.search=true;
            state.addpipeschedule.pipeline_detail_name = action.payload.pipeline_detail_name;
            state.addpipeschedule.pipeline_schedule_name = action.payload.pipeline_schedule_name;
            state.addpipeschedule.pipe_sched_description = action.payload.pipe_sched_description;
            state.addpipeschedule.pipeline_schedule_start_date = action.payload.pipeline_schedule_start_date;
            state.addpipeschedule.pipeline_schedule_end_date = action.payload.pipeline_schedule_end_date;
            state.addpipeschedule.pipeline_schedule_time = action.payload.pipeline_schedule_time;
            state.addpipeschedule.pipeline_schedule_run_imme = action.payload.pipeline_schedule_run_imme;
            state.addpipeschedule.is_active = action.payload.is_active;            
            state.addpipeschedule.tenant_id=action.payload.tenant_id
            state.newForm.AddForm = action.payload.AddForm
        });
        builder.addCase(Schedule_Edit.fulfilled,(state,action)=>{
            openeditMessage()
            state.newForm.EditSchedForm=false
            state.editpipeschedule.pipeline_detail_name = action.payload.pipeline_detail_name;
            state.editpipeschedule.pipeline_schedule_name = action.payload.pipeline_schedule_name;
            state.editpipeschedule.pipe_sched_description = action.payload.pipe_sched_description;
            state.editpipeschedule.pipeline_schedule_start_date = action.payload.pipeline_schedule_start_date;
            state.editpipeschedule.pipeline_schedule_end_date = action.payload.pipeline_schedule_end_date;
            state.editpipeschedule.pipeline_schedule_time = action.payload.pipeline_schedule_time;
            state.editpipeschedule.pipeline_schedule_run_imme = action.payload.pipeline_schedule_run_imme;
            state.editpipeschedule.is_active = action.payload.is_active;
            state.newForm.EditSchedForm = action.payload.EditSchedForm
        });
       

    }
})
export const {ListForm,ViewSchedForm,EditSchedForm,getSchedId,ScheduleAddForm}=ScheduleReducer.actions
export default (ScheduleReducer).reducer