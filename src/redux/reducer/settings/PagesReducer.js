import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Pages}from '../../../api/BackEndURL';
import {message} from 'antd'

let id=''
let key='updatable'

export const PagesGet = createAsyncThunk("PagesGet", async () => {
    return await Pages.method.get(Pages.URL.get).then((res) => res.data)
})
export const pagesAdd=createAsyncThunk("pagesAdd",async(Details)=>{
    // console.log(pagesAdd)
    return await Pages.method.post(`${Pages.URL.post}`,Details).then((response)=>response.data)
})

export const PagesGetOne = createAsyncThunk("PagesGetOne", async()=>{
    return await Pages.method.get(`${Pages.URL.get}${id}`).then((response)=>response.data)
})
export const createSuccess = () => {
    message.success({ content: 'Page Created SuccessFully!', key, duration: 2, });
};

export const PagesReducer = createSlice({
    name: 'Pages',
    initialState: {
        Data: [],
        Loader: false,
        add: {
            page_name:'',
            page_url:'',
            start_date:'',
            end_date:'',
            is_active:false,
        },
        modal: {
            PageAdd:false,
            PageView: false,
        },
        loader:{
            Loader:false
        },
        singleData: "",
        getOneData: []
    },

    reducers: {
        PageGetId: (state, action) => {
            state.singleData = action.payload.singleData
            id = state.singleData
        },
        PageAdd:(state,action)=>{
            state.modal.PageAdd===false? state.modal.PageAdd = true:state.modal.PageAdd = false
        },

        PageView: (state, action) => {
            state.modal.PageView === false ? state.modal.PageView = true : state.modal.PageView = false
        }
    },

    extraReducers: (builder) => {
        builder.addCase(PagesGet.pending, (state, action) => {
            state.Loader = true
        });
        builder.addCase(PagesGet.fulfilled, (state, action) => {
            state.Loader = false
            state.Data = action.payload
        });
        builder.addCase(PagesGetOne.fulfilled,(state,action)=>{
            state.getOneData=action.payload 
        })
        builder.addCase(pagesAdd.fulfilled,(state,action)=>{
            createSuccess(true)
            state.modal.PageAdd=false
            state.add.page_name=action.payload.page_name;
            state.add.page_url=action.payload.page_url;            
            state.add.start_date=action.payload.start_date;
            state.add.end_date=action.payload.end_date;
            state.add.is_active=action.payload.is_active;
        })

    }
})
export const {PageGetId,PageAdd,PageView}=PagesReducer.actions
export default (PagesReducer).reducer