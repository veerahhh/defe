import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {Pages,Teams,Members} from '../../../api/BackEndURL';
import {message} from 'antd'

let id=""
export const PageUrlGet = createAsyncThunk("PagesGetData",async()=>{
    return await Pages.method.get(Pages.URL.get).then((res)=>res.data)
})
export const TeamsUrlPost = createAsyncThunk("TeamsPostData",async(Detail)=>{
    return await Teams.method.post(`${Teams.URL.post}`,Detail).then((res)=>res.data)
})
export const TeamsUrlGet = createAsyncThunk("TeamsGetData",async()=>{
    return await Teams.method.get(Teams.URL.get).then((res)=>res.data)
})
export const TeamsUrlGetOne = createAsyncThunk("TeamsGetOneData",async()=>{
    return await Teams.method.get(`${Teams.URL.get}${id}`).then((res)=>res.data)
})
export const TeamsUrlPut = createAsyncThunk("TeamsPutData",async(Data)=>{
    return await Teams.method.put(`${Teams.URL.put}${id}`,Data).then((res)=>res.data)
})
export const TeamsUrlDelete = createAsyncThunk("TeamsDeleteData",async(Data)=>{
    return await Teams.method.delete(`${Teams.URL.delete}${id}`,Data).then((res)=>res.data)
})
export const MembersUrlGet = createAsyncThunk("MembersGetData",async()=>{
    return await Members.method.get(Members.URL.get).then((res)=>res.data)
})
export const MembersUrlPost = createAsyncThunk("MembersPostData",async(Detail)=>{
    return await Members.method.post(`${Members.URL.post}`,Detail).then((res)=>res.data)
})

const key = 'created';
const createMessage = () => {
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
const updateMessage = () => {
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
  const deleteMessage = () => {
    message.loading({
      content: 'Loading...',
      key,
    });
    setTimeout(() => {
      message.success({
        content: 'Deleted Successfully!',
        key,
        duration: 2,
      });
    }, 1000);
  };
export const TeamsReducer = createSlice({
    name: 'Teams',
    initialState:{
        Loader:false,
        PageUrlDataGet:[],
        Data:[],
        GetOneData: [],
        GetId:'',
        TeamName:'',
        Add:{
            team_name:'',
            role_handling_pages:'',
            read: '',
            write: '',
            tenant_id:''
        },
        Edit:{
            team_name:''
        }, 
        modal:{
            AddForm: false,
            EditForm: false,
            DeleteForm: false,
            MemberAddForm: false,
        },
        memberAdd:{
            member_name:'',
            mail_id:'',
            tenant_id:''
        },
        MembersData:[],
    },
    reducers:{
        GetTeamsId:(state,action)=>{
            state.GetId = action.payload.GetId
            id=state.GetId
        },
        TeamName:(state,action)=>{
            state.TeamName = action.payload.TeamName
        },
        AddForm:(state,action)=>{
            state.modal.AddForm===false ? state.modal.AddForm=true : state.modal.AddForm=false
        },
        EditForm:(state,action)=>{
            state.modal.EditForm===false ? state.modal.EditForm=true : state.modal.EditForm=false
        },
        DeleteForm:(state,action)=>{
            state.modal.DeleteForm===false ? state.modal.DeleteForm=true : state.modal.DeleteForm=false
        },
        MemberAddForm:(state,action)=>{
            state.modal.MemberAddForm===false ? state.modal.MemberAddForm=true : state.modal.MemberAddForm=false
        },
    },
    extraReducers:(builder)=>{
        builder.addCase(TeamsUrlGet.pending, (state, action) => {
            state.Loader = true
        });
        builder.addCase(PageUrlGet.fulfilled,(state,action)=>{
            state.PageUrlDataGet = action.payload
        });
        builder.addCase(TeamsUrlGetOne.fulfilled,(state,action)=>{
            state.GetOneData = action.payload
        });
        builder.addCase(TeamsUrlGet.fulfilled,(state,action)=>{
            state.Loader=false
            state.Data = action.payload
        });
        builder.addCase(TeamsUrlPost.fulfilled,(state,action)=>{
            createMessage()
            state.Add.team_name = action.payload.team_name;
            state.Add.role_handling_pages = action.payload.role_handling_pages;
            state.Add.read = action.payload.read;
            state.Add.write = action.payload.write;
            state.Add.tenant_id = action.payload.tenant_id
            state.modal.AddForm = action.payload.AddForm

        })
        builder.addCase(TeamsUrlPut.fulfilled,(state,action)=>{
            updateMessage()
            state.Add.team_name = action.payload.team_name;
            state.Add.role_handling_pages = action.payload.role_handling_pages;
            state.Add.read = action.payload.read;
            state.Add.write = action.payload.write;
            state.modal.EditForm = action.payload.EditForm

        })
        builder.addCase(TeamsUrlDelete.fulfilled,(state,action)=>{
            deleteMessage()
            state.modal.DeleteForm = action.payload.DeleteForm
        })
        builder.addCase(MembersUrlGet.fulfilled,(state,action)=>{
            state.MembersData = action.payload
        })
        builder.addCase(MembersUrlPost.fulfilled,(state,action)=>{
            createMessage();
            state.memberAdd.member_name = action.payload.member_name;
            state.memberAdd.mail_id = action.payload.mail_id;
            state.memberAdd.tenant_id = action.payload.tenant_id
            state.modal.MemberAddForm = action.payload.MemberAddForm
        })
    }
})


export const{AddForm,EditForm,DeleteForm,MemberAddForm,GetTeamsId,TeamName} = TeamsReducer.actions
export default (TeamsReducer).reducer