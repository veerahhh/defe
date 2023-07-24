import React, { useEffect, useState } from 'react'
import './SqlExtractView.css';
import { Row, Button, Form, Input, Col, DatePicker,Switch } from 'antd'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { sqlExtractGetOne } from '../../../../../redux/reducer/pipeline/SqlExtract';

function SqlExtractView() {
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const SqlExtractData = useSelector((state) => state.SqlExtract.getOneData)

  useEffect(() => {
    dispatch(sqlExtractGetOne())
  }, [])

  return (
    <div className='Sql_ViewForm_Parent_Contaiiner'>

      <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito" }} >
        {SqlExtractData.map((val, key) => {
          return (
            <Row gutter={[16, 0]}>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Database Name"
                  name="database name"
                >
                  <Input style={{textTransform:"capitalize"}}  placeholder={val.database_name} disabled />
                </Form.Item>
              </Col>

              <Col lg={{ span: 12, offset: 0 }}>
                <Form.Item
                  label="SQL Validation"
                  name="sql validate"
                >
                  <Input style={{textTransform:"capitalize"}}  placeholder={val.sql_validation} disabled />
                </Form.Item>
              </Col>
              <Col lg={{ span: 12, offset: 0 }}>
                <Form.Item
                  label="SQL Status"
                  name="sql status"
                >
                  <Input style={{textTransform:"capitalize"}}  placeholder={val.sql_status} disabled />
                </Form.Item>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Sequelize Query "
                  name="sequelize query "
                >
                  <Input style={{textTransform:"capitalize"}}  placeholder={val.sequelize_query} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Start Date - End Date"
                  name="StartDateToEndDate"
                >
                  <RangePicker placeholder={[(val.start_date), (val.end_date)]} disabled={[true, true]} style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Active"
                  name="status"
                >
                  {/* <p className='Sql_Active_ViewStatus_Text'>Active</p> */}
                  <Switch disabled={true} checked={val.is_active===true?true:false} />
                </Form.Item>
              </Col>
            </Row>
          )
        })}
      </Form>
    </div>
  )
}

export default SqlExtractView