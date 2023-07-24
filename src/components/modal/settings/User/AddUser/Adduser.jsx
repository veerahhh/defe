import { Form, Input, Row, Col,Switch, DatePicker, Button } from 'antd'
import React from 'react'
import { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { UserPost } from '../../../../../redux/reducer/settings/UserReducer'
import Password from 'antd/lib/input/Password';
import './Adduser.css'
const { RangePicker } = DatePicker;



const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@';
const Adduser = () => {
  const dispatch = useDispatch()
  const [gpPassword,setGpPassword] = useState(false)
  const [random,setRandom] = useState('')
  const [generatePass,setGeneratePass]=useState(true)

  const form = useSelector((state) => state.User.modal.AddUserForm)

  const [userState,setUserState] = useState({
    firstName:'',
    // lastName:'',
    useremail:'',
    employeeId:'',
    password:'',
    startDate:'',
    endDate:'',
    isActive:false
  })

  // console.log(userState)
 

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day')
  };
  const handleChange =(e)=>{
    setUserState({...userState,[e.target.name]: e.target.value})
  }
  const datePickerOnChange = (dates, dateStrings) =>{
    setUserState({...userState,startDate:dateStrings[0],endDate:dateStrings[1]})
  }
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
    setGpPassword(checked)
    setUserState({...userState,isActive:checked})
    setGeneratePass(false)
    generatePassword()
    
  };
  
  const generatePassword = () => {
    const randomPassword =Math.random().toString(36).slice(2,10)
    setRandom(randomPassword);  
  };
 

  const addData = ()=>{
    {!generatePass&& dispatch(UserPost(
      {
        first_name:userState.firstName,
        // last_name:userState.lastName,
        email:userState.useremail,
        employee_id:userState.employeeId,
        password:random,
        start_date:userState.startDate,
        end_date:userState.endDate,
        is_active:userState.isActive,
        tenant_id:JSON.parse(sessionStorage.getItem("id")),
        AddUserForm:false
      }
    ))
  }
  {
    generatePass&& dispatch(UserPost(
      {
        first_name:userState.firstName,
        // last_name:userState.lastName,
        email:userState.useremail,
        employee_id:userState.employeeId,
        password:userState.password,
        start_date:userState.startDate,
        end_date:userState.endDate,
        is_active:userState.isActive,
        AddUserForm:false
      }
    ))

  }
  
  }
    
   
  
  return (
    <div>
      <Form
        name="basic"
        autoComplete="off"
        layout='vertical'
        style={{ fontFamily: "Nunito" }}
      >
        <Row gutter={[8, 16]}>
          <Col className="gutter-row" span={16} >
            <Form.Item
              name="first_name"
              label="First Name"
              rules={[
                {
                  required: true,
                  message: 'Please fill your First Name',
                },
              ]}
            >
              <Input name='firstName' onChange={handleChange} />
            </Form.Item>
          </Col>
          {/* <Col className="gutter-row" span={12} >
            <Form.Item
              name="last_name"
              label="Last Name"
            >
              <Input name='lastName' onChange={handleChange} />
            </Form.Item>
          </Col> */}
        </Row>
        <Row gutter={[8, 16]}>
          <Col className="gutter-row" span={24} >
            <Form.Item
              name="employee_email"
              label="Employee Email"
              rules={[
                {
                  required: true,
                  message: 'Please fill your employee email',
                },
              ]}
            >
              <Input name='useremail' onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 16]}>
          <Col className="gutter-row" span={12} >
            <Form.Item
              name="employee_id"
              label="Employee Id"
              rules={[
                {
                  required: true,
                  message: 'Please fill your employee id',
                },
              ]}
            >
              <Input name='employeeId' onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12} >
            <Form.Item
              name="startdate_endDate"
              label="Start_date - End_date"
              rules={[
                {
                  required: true,
                  message: 'Please fill your employee email',
                },
              ]}
            >
             <RangePicker disabledDate={disabledDate} onChange={datePickerOnChange} defaultValue={[moment()]}  />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[8, 16]}>
          <Col className="gutter-row" span={12} >
            <Form.Item
              name="isActive"
              label="Enable Password Generator"
              
            >
              <Switch name="isActive"  onChange={onChange} />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12} >
            {gpPassword === true ?
              <Form.Item
                name="generate_password"
                label="Generate Password"
              >
                <Input.Password name='password' disabled defaultValue={random} onChange={handleChange} />
              </Form.Item>
              :
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please fill your Password',
                  },
                ]}
              >
                <Input.Password name='password' onChange={handleChange} />
              </Form.Item>
            }
          </Col>
        </Row>
        <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
            {/* <Button type='primary' onClick={close}>Back</Button> */}
            <Button htmlType='submit' type='primary'onClick={addData} className='User_create_button' >Create</Button>
        </div>
      </Form>
    </div>
  )
}

export default Adduser