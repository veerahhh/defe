import React ,{memo} from 'react'
import { Switch, Table,Badge } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { configurationGet } from '../../../../redux/reducer/configuration/ConfigurationReducer'
import { useEffect } from 'react';
import moment from 'moment';

function ConfigurationCard() {

  const dispatch = useDispatch()
  const ConfigData = useSelector((state) => state.Configuration.ConfigGetData)

  useEffect(() => {
    dispatch(configurationGet(true))
  }, [])
  
  const filteredData = ConfigData.filter((val) => {
    if (val.is_active === true) {
      return val
    }
  })
  const dataSource = filteredData.map((val => {
    return ({
      name: val.config_name,
      start: moment.utc((val.start_date)).format('MM-DD-YYYY'),
      date: moment.utc((val.end_date)).format('MM-DD-YYYY'),
    }
    )
  }))

  const columns = [
    {
      // title: 'Active Configurations',
      title:(
        <div>
           <Badge status='processing'/>
         Active Configuration
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

export default memo(ConfigurationCard)