import React, { useEffect, useState } from 'react'
import './SchemaView.css'
import { Row, Button, Form, Input, Col, DatePicker, Switch } from 'antd'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'

function SchemaView() {
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;

  const SchemaMigrateOne = useSelector((state) => state.SchemaMigration.getOneData)

  return (
    <div className='Schema_EditForm_Parent_Container'>

      <Form name="basic"  style={{fontFamily:'Nunito'}} autoComplete="off" layout='vertical' size='medium' key={SchemaMigrateOne.id}>

        <Row gutter={[16, 0]} >
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Configuration Name"
              name="config name"
            >
              <Input style={{textTransform:"capitalize"}}  placeholder={SchemaMigrateOne.config_name} disabled />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Schema Name"
              name="Schema Name "
            >
              <Input style={{textTransform:"capitalize"}}  placeholder={SchemaMigrateOne.source_schema_name} disabled />
            </Form.Item>
          </Col>
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Source Connection"
              name="Source Connection "

            >
              <Input style={{textTransform:"capitalize"}}  disabled placeholder={SchemaMigrateOne.source_name} />
            </Form.Item>
          </Col>
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Target Connection"
              name="Target Connection "

            >
              <Input style={{textTransform:"capitalize"}}  disabled placeholder={SchemaMigrateOne.target_name} />
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
              <RangePicker placeholder={[(SchemaMigrateOne.start_date), (SchemaMigrateOne.end_date)]} disabled={[true, true]} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label="Active"
              name="status"
            >
              <Switch defaultChecked={SchemaMigrateOne.is_active} disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default SchemaView