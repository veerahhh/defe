import React ,{memo}from 'react'
import { Switch, Table ,Badge} from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { ScheduleGet } from '../../../../redux/reducer/schedule/ScheduleReducer'
import { useEffect } from 'react';
import moment from 'moment';

function ScheduleCard() {

  const dispatch = useDispatch()

  const schedule = useSelector((state) =>state.Schedule.scheduleData)
 
  useEffect(() => {
    dispatch(ScheduleGet(true))
  },[])


  const active= schedule.filter((val) => {
    if (val.pipeline_status === true) {
      return val
    }
  })

  const dataSource = active.map((val => {
    return ({
      name: val.pipeline_schedule_name,
      start: moment.utc((val.pipeline_schedule_start_date)).format('MM-DD-YYYY'),
      date: moment.utc((val.pipeline_schedule_end_date)).format('MM-DD-YYYY'),
    })
  }))


  const columns = [
    {
      // title: 'Active Schedules',
      title:(
        <div>
           <Badge status='processing'/>
         Active Schedules
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
      <Table dataSource={dataSource} columns={columns} pagination={false} />
    </>
  )
}

export default memo(ScheduleCard)