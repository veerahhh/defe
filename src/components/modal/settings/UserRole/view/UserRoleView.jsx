import React, {useEffect} from 'react'
import './UserRoleView.css'
import { Row,Switch, Form, Input, Col, DatePicker } from 'antd'
import { useSelector, useDispatch} from 'react-redux'
import {UserRoleGetOne} from '../../../../../redux/reducer/settings/UserRoleReducer'

function UserRoleView() {

  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;

  const userRoleGetData = useSelector((state) => state.UserRole.getOneData)

  useEffect(() => {
    dispatch(UserRoleGetOne())
  }, [])

  return (
    <div className='Userrole_ViewForm_Parent_Contaiiner'>

      <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito" }}>
       
            <Row gutter={[16, 0]}>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="User Name"
                  name="username"
                >
                  <Input placeholder={userRoleGetData.user_name} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Role Name"
                  name="rolename"
                >
                  <Input placeholder={userRoleGetData.role_name} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Start Date - End Date"
                  name="StartDateToEndDate"
                >
                  <RangePicker placeholder={[(userRoleGetData.start_date), (userRoleGetData.end_date)]} disabled={[true, true]} style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Active"
                  name="status"
                >
                 <Switch disabled={true} checked={userRoleGetData.is_active===true?true:false} />
                </Form.Item>
              </Col>
            </Row>
          
        
      </Form>
    </div>
  )
}

export default UserRoleView