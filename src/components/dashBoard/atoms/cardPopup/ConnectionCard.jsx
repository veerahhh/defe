import React ,{memo} from 'react'
import { Badge, Switch, Descriptions, Table } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { connectionGet } from '../../../../redux/reducer/connection/ConnectionReducer'
import { useEffect } from 'react';
import moment from 'moment';

function ConnectionCard() {
  const dispatch = useDispatch()
  const ConnData = useSelector((state) => state.Connection.Data)

  useEffect(() => {
    dispatch(connectionGet(true))
  }, [])

  const filteredData = ConnData.filter((val) => {
    if (val.is_active === true) {
      return val
    }
  })

  const dataSource = filteredData.map((val => {
    return ({
      name: val.connection_name,
      start: moment.utc((val.start_date)).format('MM-DD-YYYY'),
      date: moment.utc((val.end_date)).format('MM-DD-YYYY'),
    }
    )
  }))

  const columns = [
    {
      // title: 'Active Connections',
      title:(
        <div>
           <Badge status='processing'/>
         Active Connections
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

export default memo(ConnectionCard)