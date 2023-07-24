import React,{useEffect,useState, memo} from 'react'
import { Column } from '@ant-design/plots';
import { useSelector,useDispatch } from 'react-redux';
import {ChartTwo} from "../../../../redux/reducer/count/CountReducer"

function BarChartTwo() {
  
const dispatch = useDispatch()
const data = useSelector((state)=> state.Count.ChartTwoData)

useEffect(()=>{
  dispatch(ChartTwo(true))
},[])

      const config = {
        data,
        isGroup: true,
        xField: 'value',
        yField: 'Count',
        seriesField: 'Name',
        color: ['#0c50a3', ' rgba(5,222,250,1)'],
        maxColumnWidth: 20,
        columnStyle:{
          radius:[20,20,0,0]
        },
        label: {  
          position: 'middle',
             layout: [
           
            {
              type: 'interval-adjust-position',
            }, 
            {
              type: 'interval-hide-overlap',
            }, 
            {
              type: 'adjust-color',
            },
          ],
        },
      };
      return <Column  width={390} height={240} {...config} />;
}

export default memo(BarChartTwo)