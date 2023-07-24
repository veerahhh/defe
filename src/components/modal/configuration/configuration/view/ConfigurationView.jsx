import React, { useEffect, useState } from 'react'
import './ConfigurationView.css'
import { Row, Button, Form, Input, Col, DatePicker, Switch } from 'antd'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'

function ConfigurationView() {
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;

  const configGetOne = useSelector((state) => state.Configuration.getOneData)

  return (
    <div className='config_EditForm_Parent_Container'>

      <Form name="basic" autoComplete="off" layout='vertical' size='medium' key={configGetOne.id}  style={{fontFamily:'Nunito'}}>

        <Row gutter={[16, 0]} >
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Configuration Name"
              name="config name"
            >
              <Input  style={{textTransform:'capitalize'}} placeholder={configGetOne.config_name} disabled />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Description"
              name="desc "
            >
              <Input  style={{textTransform:'capitalize'}} placeholder={configGetOne.desc} disabled />
            </Form.Item>
          </Col>
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Source Connection"
              name="srcConn "

            >
              <Input  style={{textTransform:'capitalize'}} disabled placeholder={configGetOne.source_connection_name} />
            </Form.Item>
          </Col>
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Target Connection"
              name="targetConn "

            >
              <Input  style={{textTransform:'capitalize'}} disabled placeholder={configGetOne.target_connection_name} />
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
              <RangePicker placeholder={[(configGetOne.start_date), (configGetOne.end_date)]} disabled={[true, true]} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Active"
              name="status"
            >
              <Switch defaultChecked={configGetOne.is_active} disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default ConfigurationView