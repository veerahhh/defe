import React, { useState, useEffect } from 'react'
import './PipelineEdit.css'
import { Row, Button, Form, Input, Col, DatePicker, Switch } from 'antd'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { pipelineUpdate, pipelineGet } from '../../../../../redux/reducer/pipeline/PipelineReducer'

function PipelineEdit(props) {

  const { PipeGetOneData } = props

  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';

  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [endDate, setEndDate] = useState()
  const [isActive, setIsActive] = useState()

  const configurationGetAll = useSelector((state) => state.Configuration.ConfigGetData)

  const datePickerOnChange = (dates, dateStrings) => {
    setEndDate(dateStrings[1])
  };

  const switchOnChange = (checked) => {
    setIsActive(checked)
  }

  const update = () => {
    dispatch(pipelineUpdate({
      pipeline_name: name,
      Description: description,
      End_date: endDate,
      is_active: isActive
    }))
  }

  const configName = (e) => {
    const configname = []
    configurationGetAll.map((value) => {
      if (e == value.id) {
        configname.push(value.config_name)
      }
    }
    )
    return configname
  }

  return (
    <div className='PipeLine_EditForm_Parent_Contaiiner'>

      {PipeGetOneData.map((val, key) => {

        return (

          <Form name="basic" autoComplete="off" layout='vertical' size='medium' key={val.id} style={{ fontFamily: "Nunito" }}>
            <Row gutter={[16, 0]}>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }}>
                <Form.Item
                  label="Pipeline Name"
                  name="pipeline name"
                >
                  <Input style={{textTransform:"capitalize"}}  defaultValue={val.pipeline_name} onChange={(e) => { setName(e.target.value) }} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 2 }}>
                <Form.Item
                  label="Description"
                  name="description"
                >
                  <Input style={{textTransform:"capitalize"}}  defaultValue={val.Description} onChange={(e) => { setDescription(e.target.value) }} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="E-mail"
                  name="email"
                >
                  <Input defaultValue={val.email} onChange={(e) => { setDescription(e.target.value) }} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Configuration Name"
                  name=" configurationName"
                >
                  <Input style={{textTransform:"capitalize"}}  defaultValue={configName(val.config_id)} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Start Date - End Date"
                  name="StartDateToEndDate"
                >
                  <RangePicker onChange={datePickerOnChange} defaultValue={[moment(val.Start_date, dateFormat), moment(val.End_date, dateFormat)]} disabled={[true, false]} style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }} >
                <Form.Item
                  label="Active"
                  name='isChecked'
                >
                  <Switch defaultChecked={val.is_active} onChange={switchOnChange} />
                </Form.Item>
              </Col>
               <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
              {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 14 }}> */}
                <Button onClick={update} type="primary" htmlType="submit" className='Pipeline_Update_Button'> Update </Button>
              {/* </Col> */}
              </div>
            </Row>
          </Form>
        )
      })}
    </div>
  )
}

export default PipelineEdit
