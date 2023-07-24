import React, { useEffect, useState } from 'react'
import './ConfigurationCreate.css'
import { Row, Button, Form, Input, Col, Select, DatePicker, Switch } from 'antd'
import moment from 'moment';
import { connectionDetailGet } from '../../../../../redux/reducer/connection/ConnectionDetailReducer'
import { configurationPost ,ConCreatePop} from '../../../../../redux/reducer/configuration/ConfigurationReducer'
import { useSelector, useDispatch } from 'react-redux'

function ConfigurationCreate() {

  const dispatch = useDispatch()
  const connDetlData = useSelector((state) => state.ConnectionDetail.ConData)

  useEffect(() => {
    dispatch(connectionDetailGet(true))
  }, [])

  const { RangePicker } = DatePicker;
  const dateFormat = 'DD-MM-YYYY';

  const [srcId, setSrcId] = useState()

  const [tarId, setTarId] = useState()
  const [configName, setconfigName] = useState()
  const [desc, setDesc] = useState()
  const [srcConn, setSrcConn] = useState()
  const [target, setTarget] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [status, setStatus] = useState(false)
  const [createForm, setCreateForm] = useState(false);
  const { Option } = Select;

  const handleSrcChange = (value) => {
    const sendID = connDetlData.map((values, i) => {
      if (values.connection_detail === value) {
        setSrcId(values.id)
        setSrcConn(values.connection_detail)
      }
    })
    return value
  };


  const handleTarChange = (value) => {
    const sendID = connDetlData.map((values) => {
      if (values.connection_detail === value) {
        setTarId(values.id)
        setTarget(values.connection_detail)

      }
    })
    return value
  };

  const switchOnChange = (checked) => {
    console.log(checked)
    setStatus(checked)
  };

 const demp =[] 
const ConfifData= connDetlData.map((val)=>{
  // console.log(val.connection_detail)
    return(demp.push({value:val.connection_detail}))
})
// console.log(demp)

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < moment().startOf('day')
};

  const datePickerOnChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0])
    setEndDate(dateStrings[1])
  }
  const ConfigCreateForm = () => {
    dispatch(configurationPost({
      Source_conn_det_id: srcId,
      Target_conn_det_id: tarId,
      config_name: configName,
      desc: desc,
      source_connection_name: srcConn,
      target_connection_name: target,
      start_date: startDate,
      end_date: endDate,
      is_active: status,
      tenant_id:JSON.parse(sessionStorage.getItem("id")),
    }))
    
  }

  return (
    <div className='config_AddForm_Parent_Container'>
      <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{fontFamily:'Nunito'}}>
        <Row gutter={[16, 0]} >
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Configuration Name"
              name="config name"
              rules={[
                {
                  required: true,
                  message: 'Please Enter database Name',
                },
              ]}
            >
              <Input style={{textTransform:"capitalize"}} onChange={(e) => { setconfigName(e.target.value) }} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Description"
              name="desc "
              rules={[
                {
                  required: true,
                  message: 'Please Enter Sql Validation',
                },
              ]}
            >
              <Input style={{textTransform:"capitalize"}} onChange={(e) => { setDesc(e.target.value) }} />
            </Form.Item>
          </Col>

          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Source Connection"
              name="srcConn "
              rules={[
                {
                  required: true,
                  message: 'Please Enter Source Connection',
                  transform: (v) => v.toUpperCase(),
                },
              ]}
            >
              <Select style={{ width: '100%', }}
              showSearch
                placeholder="Connection Details"
                onChange={handleSrcChange}
                options={demp}
               
                // filterOption={(input, option) =>
                //   (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                // }
              >
                {/* <Option value={demp}>
                  {demp}
                </Option> */}
                {/* {connDetlData.map((item, index) => {
                  return (
                    <Option value={item.connection_detail} key={index} >
                      <div className="demo-option-label-item" >
                        {item.connection_detail}
                      </div>
                    </Option>
                  )
                })} */}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Target Connection"
              name="targetConn "
              rules={[
                {
                  required: true,
                  message: 'Please Enter Target Connection',
                  // transform: (v) => v.toUpperCase(),
                },
              ]}
            >
              <Select style={{ width: '100%' }}
                placeholder="Connection Details"
                showSearch
                onChange={handleTarChange}
                options={demp}
              //  filterOption={(input,option) =>
              //  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              // }
              />
                {/* {connDetlData.map((item, index) => {
                  return (
                    <Option value={item.connection_detail} key={index} >
                      <div className="demo-option-label-item" >
                        {item.connection_detail}
                      </div>
                    </Option>
                  )
                })} */}

              
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Start Date - End Date"
              name="StartDateToEndDate"
              rules={[
                {
                  required: true,
                  message: 'Please Select EndDate',
                },
              ]}
            >
              <RangePicker onChange={datePickerOnChange} disabledDate={disabledDate} defaultValue={[moment()]} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Active"
              name="status"
            >
              <Switch onChange={switchOnChange} />
            </Form.Item>
          </Col>
          {/* <Col lg={{ span: 12, offset: 0 }}>
            <Button type="primary" htmlType="submit"  className='config_Back_Button' onClick={()=>{
dispatch(ConCreatePop(false))
            }}> Back </Button>
          </Col> */}
          <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
            <Button type="primary" htmlType="submit" onClick={ConfigCreateForm} className='config_Add_Button'> Create </Button>
          </div>
        </Row>

      </Form>
    </div>
  )
}

export default ConfigurationCreate