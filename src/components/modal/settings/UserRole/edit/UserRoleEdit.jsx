import React, { useState } from 'react'
import './UserRoleEdit.css'
import { Row, Button, Form, Input, Col, DatePicker, Switch } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import { UserRolePut } from '../../../../../redux/reducer/settings/UserRoleReducer'

function UserRoleEdit() {

  const userRoleGetData = useSelector((state) => state.UserRole.getOneData)

  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';

  const [username, setUsername] = useState()
  const [rolename, setRolename] = useState()
  const [start_date, setStartDate] = useState()
  const [end_date, setEndDate] = useState()
  const [isActive, setIsActive] = useState()

  const datePickerOnChange = (dates, dateStrings) => {
    setEndDate(dateStrings[1])
  };

  const switchOnChange = (checked) => {
    setIsActive(checked)
  }

  const update = () => {
    dispatch(UserRolePut({
      user_name: username,
      role_name: rolename,
      start_date: start_date,
      end_date: end_date,
      is_active: isActive
    }))
  }

  return (
    <div className='userrole_EditForm_Parent_Contaiiner'>
      <Form name="basic" autoComplete="off" layout='vertical' size='medium' key={userRoleGetData.id} style={{ fontFamily: "Nunito" }}>
        <Row gutter={[16, 0]}>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="UserName"
              name="username"
            >
              <Input defaultValue={userRoleGetData.user_name} onChange={(e) => { setUsername(e.target.value) }} disabled />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Role Name"
              name="rolename"
            >
              <Input defaultValue={userRoleGetData.role_name} onChange={(e) => { setRolename(e.target.value) }} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Start Date - End Date"
              name="StartDateToEndDate"
            >
              <RangePicker onChange={datePickerOnChange} defaultValue={[moment(userRoleGetData.start_date, dateFormat), moment(userRoleGetData.end_date, dateFormat)]} disabled={[true, false]} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }} >
            <Form.Item
              label="Active"
              name='isChecked'
            >
              <Switch defaultChecked={userRoleGetData.is_active} onChange={switchOnChange} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 14 }}>
            <Button onClick={update} type="primary" htmlType="submit" className='userrole_Update_Button'> Update </Button>
          </Col>
        </Row>
      </Form>

    </div>
  )
}

export default UserRoleEdit