import React, { useState } from 'react'
import { Button, Input, Form, Row, Col, DatePicker, Switch, message, AutoComplete } from 'antd';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import './PagesAdd.css'
import { pagesAdd } from '../../../../../redux/reducer/settings/PagesReducer';
// console.log(pagesAdd)
export default function PagesAdd() {
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';

const[pageState,setPageState]=useState({
  pageName:'',
  pageUrl:'',
  isActive:'',
})
  
  const [dates, setDates] = useState([])

  const onChange = (checked) => {
    setPageState({...pageState,isActive:checked})
  };

  const handleChange = (e) => {
    setPageState({ ...pageState, [e.target.name]: e.target.value })
}

const createPage = async (e) => {
  if (pageState.pageName && pageState.pageUrl && dates.length === 2) {
    dispatch(
      pagesAdd({
        page_name: pageState.pageName,
        page_desc: pageState.pageUrl,
        start_date: moment(dates[0]).format('YYYY-MM-DD'),
        end_date: moment(dates[1]).format('YYYY-MM-DD'),
        is_active: pageState.isActive
      })
    );
  } else {
    message.error('Please fill all the fields');
  }
};

console.log(createPage)
  return (
    <>
      <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito" }}>
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Policy Name"
              name='pageName'
              rules={[
                {
                  required: true,
                  message: 'Please Enter Policy Name',
                },
              ]}
            >
              <Input name="pageName" onChange={handleChange} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Policy Url"
              name='pageUrl'
              rules={[
                {
                  required: true,
                  message: 'Please Enter Policy Url',
                },
              ]}
            >
              <Input name="pageUrl" onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              className="reg-lbl"
              label="Start Date - End Date"
              name="StartDatetoEndDate"
              initialValue={dates}
              rules={[{ required: true, message: 'Enter Your Date' }]}
            >
              <RangePicker className='newCon-input-feild' disabled={[true, false]} onCalendarChange={(value) => {
                setDates([value[0], value[1]]);
              }}

                value={dates}
              />
            </Form.Item>
          </Col>
          <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Active"
              name="Active"
            >
              <Switch  onChange={onChange} />
            </Form.Item>
          </Col>
          <Col className='pageAddbtn'>
            <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
            <Button onClick={createPage} type="primary" htmlType="submit" className='Policy_create_button' > Create </Button>
            </div>
          </Col>
        </Row>
      </Form>

    </>
  )
}
