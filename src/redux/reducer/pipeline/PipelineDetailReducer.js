import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {PipelineDetail,Token} from '../../../api/BackEndURL'
import {message} from 'antd'

let id=''
let key='updatable'

export const PipelinedetailGet = createAsyncThunk("PipelinedetailGet", async () => {
    return await PipelineDetail.method.get(PipelineDetail.URL.get,{headers:{"Authorization" : Token}}).then((response) =>response.data)
})
export  const PipelinedetailPost=createAsyncThunk("PipelinedetailPost",async(Data)=>{
    return await PipelineDetail.method.post(PipelineDetail.URL.post,Data,{headers:{"Authorization" : Token}}).then((response)=>response.data)
})
export  const PipelinedetailGetOne=createAsyncThunk("PipelinedetailGetOne",async()=>{
    return await PipelineDetail.method.get(`${PipelineDetail.URL.get}${id}`,{headers:{"Authorization" : Token}}).then((response)=>response.data)
})
export const PipelinedetailPut= createAsyncThunk("PipelinedetailPut",async(Data)=>{
    return await PipelineDetail.method.put(`${PipelineDetail.URL.put}${id}`,Data,{headers:{"Authorization" : Token}}).then((response)=>response.data)
})
export const createSuccess = () => {
    message.success({ content: 'Created SuccessFully!', key, duration: 2, });
};
export const updateSuccess = () => {
    message.success({ content: 'Updated SuccessFully!', key, duration: 2, });
};

export const PipelineDetailReducer=createSlice({
    name:"PipelineDetailReducer",
    initialState:{
        getPipelineDetailData:[],
        addPipelineDetailData:{
            pipeline_id:'',
            pipeline_name:'',
            pipeline_details_name:'',
            sql_extract_id:"",
            sql_extract_name:'',
            target_table_name:'',
            source_table_name:'',
            start_date:'',
            end_date:'',
            is_active:'',
            tenant_id:''
        },
        UpdatePipelineDetailData:{
            pipeline_name:'',
            pipeline_details_name:'',
            sql_extract_name:'',
            target_table_name:'',
            source_table_name:'',
            start_date:'',
            end_date:'',
            is_active:'',
        },
        
        newForm:{    
            CreatePop:false,    
            EditPop:false,
            ViewPop:false,
            PplDtlAddForm:false,
            Search:true    
        },
        loader:{
            Loader:false
        },
        singleData:"",
        getOneData:[]     
    },
    reducers:{
       GetPipedetailId:(state, action)=>{
        state.singleData=action.payload.singleData
        id=state.singleData
       },
       CreateModal:(state,action)=>{
        state.newForm.CreatePop===false?state.newForm.CreatePop=true:state.newForm.CreatePop=false
       },
       EditModal:(state,action)=>{
        state.newForm.EditPop===false? state.newForm.EditPop=true:state.newForm.EditPop=false
       },
       ViewModal:(state, action)=>{
        state.newForm.ViewPop===false?state.newForm.ViewPop=true:state.newForm.ViewPop=false
       },
       PplDtlAddForm:(state,action)=>{
        state.newForm.Search=action.payload.Search
        state.newForm.PplDtlAddForm=action.payload.PplDtlAddForm
        },

    },
    extraReducers:(builder)=>{
        builder.addCase(PipelinedetailGet.pending,(state,action)=>{
            state.loader.Loader=true
        });
      
        builder.addCase(PipelinedetailGet.fulfilled,(state,action)=>{
            state.loader.Loader=false
            state.getPipelineDetailData=action.payload
        })
        builder.addCase(PipelinedetailGetOne.fulfilled,(state,action)=>{
           state.getOneData=action.payload
        })

        builder.addCase(PipelinedetailPost.fulfilled,(state,action)=>{
            createSuccess(true)
            state.newForm.CreatePop=false
            state.newForm.PplDtlAddForm=false;
            state.newForm.Search=true
            state.addPipelineDetailData.pipeline_name=action.payload.pipeline_name;
            state.addPipelineDetailData.pipeline_id=action.payload.pipeline_id;
            state.addPipelineDetailData.sql_extract_id=action.payload.sql_extract_id;
            state.addPipelineDetailData.pipeline_details_name=action.payload.pipeline_details_name;
            state.addPipelineDetailData.sql_extract_name=action.payload.sql_extract_name;
            state.addPipelineDetailData.target_table_name=action.payload.target_table_name;
            state.addPipelineDetailData.source_table_name=action.payload.source_table_name;            
            state.addPipelineDetailData.start_date=action.payload.start_date;
            state.addPipelineDetailData.end_date=action.payload.end_date;
            state.addPipelineDetailData.is_active=action.payload.is_active;
            state.newForm.CreatePop=action.payload.CreatePop;
            state.addPipelineDetailData.tenant_id=action.payload.tenant_id
        })
        builder.addCase(PipelinedetailPut.fulfilled,(state,action)=>{
            updateSuccess(true)
            state.newForm.EditPop=false
            state.UpdateData.pipeline_name=action.payload.pipeline_name;
            state.UpdateData.pipeline_details_name=action.payload.pipeline_details_name;
            state.UpdateData.sql_extract_name=action.payload.sql_extract_name;
            state.UpdateData.target_table_name=action.payload.target_table_name;
            state.UpdateData.source_table_name=action.payload.source_table_name;
            state.UpdateData.start_date=action.payload.start_date;
            state.UpdateData.end_date=action.payload.end_date;
            state.UpdateData.is_active=action.payload.is_active;
        })
     
       
    }
})

export const {EditModal,ViewModal,CreateModal,GetPipedetailId,PplDtlAddForm} = PipelineDetailReducer.actions

export default (PipelineDetailReducer).reducer