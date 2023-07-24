import React, { useState } from 'react'
import { Row, Button, Form, Input, Col, DatePicker, Switch } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import { RolePutId } from '../../../../../redux/reducer/settings/RoleReducer'

function RoleEdit() {

  const roleGetData = useSelector((state) => state.Role.getOneData)

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
    dispatch(RolePutId({
      username: username,
      rolename: rolename,
      start_date: start_date,
      End_date: end_date,
      is_active: isActive
    }))
  }

  return (
    <div className='PipeLine_EditForm_Parent_Contaiiner'>

      {roleGetData.map((val) => {

        return (

          <Form name="basic" autoComplete="off" layout='vertical' size='medium' key={val.id} style={{ fontFamily: "Nunito" }}>
            <Row gutter={[16, 0]}>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="UserName"
                  name="username"
                >
                  <Input defaultValue={val.username} onChange={(e) => { setUsername(e.target.value) }} />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Role Name"
                  name="rolename"
                >
                  <Input defaultValue={val.rolename} onChange={(e) => { setRolename(e.target.value) }} />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Start Date - End Date"
                  name="StartDateToEndDate"
                >
                  <RangePicker onChange={datePickerOnChange} defaultValue={[moment(val.start_date, dateFormat), moment(val.end_date, dateFormat)]} disabled={[true, false]} style={{ width: "100%" }} />
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

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 14 }}>
                <Button onClick={update} type="primary" htmlType="submit" className='Pipeline_Update_Button'> Update </Button>
              </Col>
            </Row>
          </Form>
        )
      })}
    </div>
  )
}

export default RoleEdit