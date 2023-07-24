import React, { useEffect, useState } from 'react'
import './SchemaEdit.css'
import { Row, Button, Form, Input, Col, DatePicker, Switch } from 'antd'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { SchemaMigratePut } from '../../../../../redux/reducer/pipeline/SchemamigReducer'

function SchemaEdit() {

  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';

  const [configName, setConfigName] = useState()
  // const [desc, setDesc] = useState()
  const [Schema, setSchema] = useState()
  const [srcConn, setSrcConn] = useState()
  const [target, setTarget] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [status, setStatus] = useState()

  const demo = useSelector((state) => state.SchemaMigration.getOneData)
  // console.log(demo)
  const switchOnChange = (checked) => { setStatus(checked) }

  const datePickerOnChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0])
    setEndDate(dateStrings[1])
  }
  
  const handleSubmitSchema = () => {
    // alert("hello")
    dispatch(SchemaMigratePut({
      config_name: configName,
      // desc: "dec_name",
      schema_name:Schema,
      source_name: srcConn,
      target_name: target,
      start_date: startDate,
      end_date: endDate,
      is_active: status,
      SchemaMigrateEditPop: false
    }))
  }

  return (
    <div className='Schema_EditForm_Parent_Container'>

      <Form name="basic" style={{fontFamily:'Nunito'}} autoComplete="off" layout='vertical' size='medium' key={demo.id}>
        <Row gutter={[16, 0]} >
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Configuration Name"
              name="config name"
            >
              <Input style={{textTransform:"capitalize"}}  disabled defaultValue={demo.config_name} onChange={(e) => { setConfigName(e.target.value) }} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Schema Name"
              name="Schema name "
              // rules={[
                
              //    { required: true, message: 'Please Enter Schema Name' },
               
              // ]}
            >
              <Input style={{textTransform:"capitalize"}}  defaultValue={demo.source_schema_name} onChange={(e) => { setSchema(e.target.value) }} />
            </Form.Item>
          </Col>

          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Source Connection"
              name="srcConn "
            >
              <Input style={{textTransform:"capitalize"}}  disabled defaultValue={demo.source_name} onChange={(e) => { setSrcConn(e.target.value) }} />
            </Form.Item>
          </Col>
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Target Connection"
              name="targetConn"
            >
              <Input style={{textTransform:"capitalize"}}  disabled defaultValue={demo.target_name} onChange={(e) => { setTarget(e.target.value) }} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Start Date - End Date"
              name="StartDateToEndDate"

              // rules={[
              //   {
              //     required: true,
              //     message: 'Please Select EndDate',
              //   },
              // ]}

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
          <div className='Schema_Update_Button'>
          {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 14 }}> */}
            <Button type="primary" htmlType="submit" onClick={handleSubmitSchema} > Update </Button>
          {/* </Col> */}
          </div>
        </Row>

      </Form>

    </div>
  )
}

export default SchemaEdit