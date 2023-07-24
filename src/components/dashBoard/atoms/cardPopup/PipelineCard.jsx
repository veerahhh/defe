import React ,{memo} from 'react'
import {  Switch, Table,Badge } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import moment from 'moment';
import { pipelineGet } from '../../../../redux/reducer/pipeline/PipelineReducer';

function PipelineCard() {

    const dispatch=useDispatch();
    const pipeData=useSelector((state)=>state.Pipeline.Data)

    useEffect(()=>{
        dispatch(pipelineGet(true))
    },[])
    
    const data = pipeData.filter((val) => {
      if (val.is_active === true) {
        return val
      }
    })
    const dataSource = data.map((val=>{
        return({
          name:val.pipeline_name,
          start:moment.utc((val.start_date)).format('MM-DD-YYYY'),
          date:moment.utc((val.end_date)).format('MM-DD-YYYY'),
        }
        )
      }))
  
      
      const columns = [
        {
          // title: 'Active Pipelines',
          title:(
            <div>
               <Badge status='processing'/>
             Active Pipelines
            </div>
            
          ),
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Start Date',
          dataIndex: 'start',
          key: 'address',
        },
        {
          title: 'End Date',
          dataIndex: 'date',
          key: 'age',
        },
       
      ];

  return (
    <>
        <Table  dataSource={dataSource} columns={columns} pagination={false}/>
    </>
  )
}

export default memo(PipelineCard)