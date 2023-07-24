import React, {useEffect} from 'react'
import { Row,Switch, Form, Input, Col, DatePicker } from 'antd'
import { useSelector, useDispatch} from 'react-redux'
import {RoleGetId} from '../../../../../redux/reducer/settings/RoleReducer'

function RoleView() {

  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;

  const roleGetData = useSelector((state) => state.Role.getOneData)

  useEffect(() => {
    dispatch(RoleGetId())   
  }, [])

  return (
    <div className='Schema_ViewForm_Parent_Contaiiner'>

      <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito" }} >
        {roleGetData .map((val, key) => {
          return (
            <Row gutter={[16, 0]}>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="User Name"
                  name="username"
                >
                  <Input placeholder={val.username} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Role Name"
                  name="rolename"
                >
                  <Input placeholder={val.rolename} disabled />
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

export default RoleView