import React, { useEffect, useState } from 'react'
import './ConfigurationAdd.css'
import { Row, Button, Form, Input, Col, Select, DatePicker, Switch } from 'antd'
import moment from 'moment';
import { connectionDetailGet } from '../../../../../redux/reducer/connection/ConnectionDetailReducer'
import { configurationPost } from '../../../../../redux/reducer/configuration/ConfigurationReducer'
import { useSelector, useDispatch } from 'react-redux'

function ConfigurationAdd() {

  const dispatch = useDispatch()
  const connDetlData = useSelector((state) => state.ConnectionDetail.ConData)

  useEffect(() => {
    dispatch(connectionDetailGet(true))
  }, [])

  const { RangePicker } = DatePicker;
  const dateFormat = 'DD-MM-YYYY';

  const [srcId, setSrcId] = useState()
  const [tarId, setTarId] = useState()

  const [configDetails, setConfigDetails] = useState({
    configName: '',
    desc: '',
    srcConn: '',
    target: '',
    startDate: '',
    endDate: '',
    status: ''
  })

  const { Option } = Select;

  const handleChange = (e) => {
    setConfigDetails({ ...configDetails, [e.target.name]: e.target.value })
  }


  const handleSrcChange = (value) => {
    const sendID = connDetlData.map((values, i) => {
      if (values.connection_detail === value) {
        setSrcId(values.id)
        setConfigDetails({ ...configDetails, srcConn: values.connection_detail })
      }
    })
    return value
  };

  const handleTarChange = (value) => {
    const sendID = connDetlData.map((values, i) => {
      if (values.connection_detail === value) {
        setTarId(values.id)
        setConfigDetails({ ...configDetails, target: values.connection_detail })

      }
    })
    return value
  };

  const switchOnChange = (checked) => {
    setConfigDetails({ ...configDetails, status: checked })
  };

  const datePickerOnChange = (dates, dateStrings) => {
    setConfigDetails({ ...configDetails, startDate: dateStrings[0] })
    setConfigDetails({ ...configDetails, endDate: dateStrings[1] })
  }

  const configCreateForm = () => {
    console.log(configDetails.status)
    dispatch(configurationPost({
      Source_conn_det_id: srcId,
      Target_conn_det_id: tarId,
      config_name: configDetails.configName,
      desc: configDetails.desc,
      source_connection_name: configDetails.srcConn,
      target_connection_name: configDetails.target,
      start_date: configDetails.startDate,
      end_date: configDetails.endDate,
      is_active: configDetails.status,
      tenant_id:JSON.parse(sessionStorage.getItem("id")),
    }))

  }

  return (
    <div className='config_EditForm_Parent_Container'>
      <Form name="basic" autoComplete="off" layout='vertical' size='medium'>
        <Row gutter={[16, 0]} >
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Configuration Name"
              name="Configuration Name"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Configuration Name',
                },
              ]}
            >
              <Input name="configName" onChange={handleChange} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Description"

              rules={[
                {
                  required: true,
                  message: 'Please Enter Sql Validation',
                },
              ]}
            >
              <Input name="desc" onChange={handleChange} />
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
                },
              ]}
            >

              <Select style={{ width: '100%' }}
                placeholder="Connection Details"
                onChange={handleSrcChange}
              >
                {connDetlData.map((item, index) => {
                  return (
                    <Option value={item.connection_detail} key={index} >
                      <div className="demo-option-label-item" >
                        {item.connection_detail}
                      </div>
                    </Option>
                  )
                })}
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
                },
              ]}
            >
              <Select style={{ width: '100%' }}
                placeholder="Connection Details"
                onChange={handleTarChange}
              >
                {connDetlData.map((item, index) => {
                  return (
                    <Option value={item.connection_detail} key={index} >
                      <div className="demo-option-label-item" >
                        {item.connection_detail}
                      </div>
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>
          </Col>



          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Start Date - End Date"
              name="StartDateToEndDate"
              rules={[
                {
                  required: true,
                  message: 'Please Select End Date',
                },
              ]}
            >
              <RangePicker onChange={datePickerOnChange} disabled={[true, false]} defaultValue={[moment()]} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Active"
              name="status"
            >
              <Switch defaultChecked onChange={switchOnChange} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 14 }}>
            <Button type="primary" htmlType="submit" onClick={configCreateForm} className='config_Update_Button'> Create </Button>
          </Col>
        </Row>

      </Form>
    </div>
  )
}

export default ConfigurationAdd