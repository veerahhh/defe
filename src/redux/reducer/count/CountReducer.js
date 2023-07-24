import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ChartTwoCount ,Token} from '../../../api/BackEndURL'
import {CountDetail} from '../../../api/BackEndURL'
import {TotalCount} from '../../../api/BackEndURL'

export const ChartTwo = createAsyncThunk("ChartCount", async () => {
    return await ChartTwoCount.method.get(ChartTwoCount.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const ChartOne = createAsyncThunk("ChartOne", async () => {
    return await CountDetail.method.get(CountDetail.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})
export const Total = createAsyncThunk("Total", async () => {
    return await TotalCount.method.get(TotalCount.URL.get,{headers:{"Authorization" : Token}}).then((response) => response.data)
})

export const countReducer = createSlice({
    name: "Count",
    initialState: {
        ChartTwoData: [],
        ChartOneData:[],
        TotalCounts:[],
        loader: {
            Loader: false
        },
    },
  
    extraReducers: (builder) => {
        builder.addCase(ChartTwo.pending, (state, action) => {
            state.loader.Loader = true
        });

        builder.addCase(ChartTwo.fulfilled, (state, action) => {
            state.ChartTwoData = action.payload
        })
        builder.addCase(ChartOne.fulfilled, (state, action) => {
            state.ChartOneData = action.payload
        })
        builder.addCase(Total.fulfilled, (state, action) => {
            state.TotalCounts = action.payload
        })
    }

})

export default (countReducer).reducer