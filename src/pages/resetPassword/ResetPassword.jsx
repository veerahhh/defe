import React, { useState, useEffect, useCallback } from 'react'
import './ResetPassword.css'
import { Form, Input, Button, Row, Col } from 'antd'

function ResetPassword() {
  
  const [oldPassword, setOldPassword] = useState(true)
  const [changePassword, setChangePassword] = useState(false)
  const [nextButton, setNextButton] = useState(false)
  const [resetButton, setResetButton] = useState(true)

  const [oldPass, setOldPass] = useState("")
  const [Password, setPassword] = useState({
    confirmpassword: '',
    newpassword: '',
  })

  const oldPasswordHandleChange = (e) => {
    setOldPass(e.target.value)
  }

  const passwordHandleChange = (e) => {
    setPassword({ ...Password, [e.target.name]: e.target.value })
  }

  const next = () => {
    setOldPassword(false)
    setChangePassword(true)
  }

  const reset = () => {
    setOldPassword(true)
    setChangePassword(false)
  }

  useEffect(() => {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(Password.newpassword) && Password.newpassword == Password.confirmpassword) {
      setResetButton(false)
    } else {
      setResetButton(true)
    }
  }, [Password])

  return (
    <div className='Reset-Password-Parent-Container'>
      <p className='Reset-Password-Header-Text'>Reset Password</p>
      <main className='Reset-Password-Main-Container'>

        {oldPassword && <Form initialValues={{ remember: true, }} name="basic" layout='vertical' autoComplete="off" className='SignIn_Left_Form'>
          <Row gutter={[0, 15]}>

            <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
              <Form.Item
                className='SignIn_FormItem'
                label="Old Password"
                name="oldpassword"
                rules={[{ required: true, message: 'Please Enter Old Password!' }]}
              >
                <Input.Password name='oldpassword' className='Reset-Password-Input' onChange={oldPasswordHandleChange} />
              </Form.Item>
            </Col>

            <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
              <Button htmlType="submit" type='primary' disabled={nextButton} className='Reset-Password-Button-One' onClick={next}>Next</Button>
            </Col>

          </Row>
        </Form>}

        {changePassword && <Form initialValues={{ remember: true, }} name="basic" layout='vertical' autoComplete="off" className='SignIn_Left_Form'>
          <Row gutter={[0, 15]}>

            <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
              <Form.Item
                className='SignIn_FormItem'
                label="New Password"
                name="newpassword"
                rules={[{ required: true, message: 'Please Enter New Password!' }]}
              >
                <Input.Password name='newpassword' className='Reset-Password-Input' onChange={passwordHandleChange} />
              </Form.Item>
            </Col>

            <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
              <Form.Item
                className='SignIn_FormItem'
                label="Confirm Password"
                name="confirmpassword"
                rules={[{ required: true, message: 'Please Confirm Your Password!' }]}
              >
                <Input.Password name="confirmpassword" className='Reset-Password-Input' onChange={passwordHandleChange} />
              </Form.Item>
            </Col>

            <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
              <Button htmlType="submit" type='primary' disabled={resetButton} className='Reset-Password-Button-One' onClick={reset} >Reset</Button>
            </Col>
            <p className='Reset-Password-Rule-Text'>*Password must be 8 Characters,Uppercase,Number,Special Character </p>
          </Row>
        </Form>}
      </main>
    </div>
  )
}

export default ResetPassword