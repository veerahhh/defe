import React, { useEffect, useState } from 'react'
import './ConfigurationEdit.css'
import { Row, Button, Form, Input, Col, DatePicker, Switch } from 'antd'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { ConEditPop, configurationPut } from '../../../../../redux/reducer/configuration/ConfigurationReducer'

function ConfigurationEdit() {

  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD'; 

  const [configName, setConfigName] = useState()
  const [desc, setDesc] = useState()
  const [srcConn, setSrcConn] = useState()
  const [target, setTarget] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [status, setStatus] = useState()

  const demo = useSelector((state) => state.Configuration.getOneData)
  const switchOnChange = (checked) => { setStatus(checked) };

  const datePickerOnChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0])
    setEndDate(dateStrings[1])
  }
  const handleSubmitConfig = () => {
    dispatch(configurationPut({
      config_name: configName,
      desc: desc,
      source_connection_name: srcConn,
      target_connection_name: target,
      start_date: startDate,
      end_date: endDate,
      is_active: status,
      ConEditPop: false
    }))
  }

  return (
    <div className='config_EditForm_Parent_Container'>

      <Form name="basic" autoComplete="off" layout='vertical' size='medium' key={demo.id}  style={{fontFamily:'Nunito'}}>
        <Row gutter={[16, 0]} >
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Configuration Name"
              name="config name"
            
            >
              <Input  style={{textTransform:'capitalize'}} disabled defaultValue={demo.config_name} onChange={(e) => { setConfigName(e.target.value) }} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Description"
              name="desc "
            
            >
              <Input  style={{textTransform:'capitalize'}} disabled defaultValue={demo.desc} onChange={(e) => { setDesc(e.target.value) }} />
            </Form.Item>
          </Col>

          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Source Connection"
              name="srcConn "
             
            >
              <Input  style={{textTransform:'capitalize'}} disabled defaultValue={demo.source_connection_name} onChange={(e) => { setSrcConn(e.target.value) }} />
            </Form.Item>
          </Col>
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Target Connection"
              name="targetConn"
            
            >
              <Input style={{textTransform:'capitalize'}} disabled defaultValue={demo.target_connection_name} onChange={(e) => { setTarget(e.target.value) }} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Start Date - End Date"
              name="StartDateToEndDate"
            >
              <RangePicker disabled={[true, false]} onChange={datePickerOnChange} defaultValue={[moment(demo.start_date, dateFormat), moment(demo.end_date, dateFormat)]} dateFormat style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Active"
              name="status"
            >
              <Switch defaultChecked={demo.is_active} onChange={switchOnChange} />
            </Form.Item>
          </Col>
          
          {/* <Col lg={{ span: 12, offset: 0 }}>
            <Button type="primary" htmlType="submit" className='config_UpdateBack_Button' onClick={()=>{
              dispatch(ConEditPop())
            }}> Back </Button>
          </Col> */}
          <div className="config_UpdateAdd_Button">
    
            <Button type="primary" htmlType="submit" onClick={handleSubmitConfig} > Update </Button>
      
          </div>
         
        </Row>

      </Form>

    </div>
  )
}

export default ConfigurationEdit