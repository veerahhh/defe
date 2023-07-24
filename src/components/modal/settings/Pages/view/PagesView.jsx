import React, { useState, useEffect } from 'react'
import { Button, Input, Form, Row, Col, DatePicker, Switch, message, AutoComplete } from 'antd';
import moment from "moment"
import { useSelector, useDispatch } from 'react-redux'
import '../add/PagesAdd.css'

export default function PagesView() {
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';
  const [newdates, setNewDates] = useState([])
  const pageGetOneData = useSelector((state) => state.Page.getOneData)

  return (
    <>

      <Form name="basic" autoComplete="off" layout='vertical' size='medium' disabled key={pageGetOneData.id} style={{ fontFamily: "Nunito" }}>
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Page Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Page Name',
                },
              ]}
            >
              <Input defaultValue={pageGetOneData.page_name} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Page Url"
              name="pageurl"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Page Url',
                },
              ]}
            >
              <Input defaultValue={pageGetOneData.page_url} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>

            <Form.Item
              className="reg-lbl"
              label="Start Date - End Date"
              name="StartDatetoEndDate"
              initialValue={[moment(pageGetOneData.start_date, dateFormat), moment(pageGetOneData.end_date, dateFormat)]}
              rules={[{ required: true, message: 'Enter Your Date' },
              ]}
            >
              <RangePicker className='newCon-input-feild'
                disabled
                onCalendarChange={(value) => {
                  setNewDates([value[0], value[1]]);
                }}
                value={newdates}
              />
            </Form.Item>

          </Col>
          <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Active"
              name="Active"
            >
              
              <Switch disabled={true} checked={pageGetOneData.is_active === true ? true : false} />
              
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}
