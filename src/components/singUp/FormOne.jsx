import React from 'react'
import { Radio, Form, Input, Col, Button, Row } from 'antd';
import './SignUp.css'

export default function FormOne(props) {
    const {showRegister,deActivePage,firstName,lastName,email,password,confirmPassword,phoneNumber,companyDetail,conPassVal,
        setConPassVal,setLastName,setCompanyDetail,setFirstName,setEmail,setPassword,setPhoneNumber,setConfirmPassword}=props

    const ChckConfirmPassword =(e)=>{
        setConfirmPassword(e)
        if(password==(e)){            
            setConPassVal(false)
        }
        else{
            setConPassVal(true)
        }
  
    }
    const Radiobtn = (e)=>{
        setCompanyDetail(e.target.value)
        e.target.value == "individual"?RadbtnIndividual(): RadbtnCompany()
        }
       
    const RadbtnIndividual = () => {
        console.log("cmmp")    
        setCompanyDetail("individual")
        deActivePage(true)
    }
    const RadbtnCompany = () => {
        console.log("cp")       
        setCompanyDetail("company")
        deActivePage(false)
    }
 
   const handleClick =()=> {
        if(/^[a-zA-Z]+$/.test(firstName)  && /\S+@\S+\.\S+/.test(email) && 
        /^([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/.test(phoneNumber) && /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)&& confirmPassword===password)
        {
            showRegister(false)
        } 
    }
    return (
            <Form
                name="basic"
                autoComplete="off"
                layout='vertical'
                className='Form_Container'
            >
                <Row gutter={[0, 5]}>

                    <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                        <Form.Item
                            className="reg-lbl"
                            label="FirstName"
                            name="firstname"
                            initialValue={firstName}
                            rules={[{ required: true,  message:"Enter Your First name"},
                            {pattern:/^[a-zA-Z]+$/,message:'Enter The Characters'}]
                        }
                        >
                            <Input className='reg-input-feild'  onChange={(e)=>(setFirstName(e.target.value))} />                           
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 2 }}>
                        <Form.Item
                            className="reg-lbl"
                            label="LastName"
                            name="lastname"
                            initialValue={lastName}
                            rules={[{ required: true,message:"Enter Your Last name"},
                            {pattern:/^[a-zA-Z]+$/,message:'Enter The Characters'}
                        ]}
                        >
                            <Input className='reg-input-feild'  onChange={(e)=>(setLastName(e.target.value))}/>
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                        <Form.Item
                            className="reg-lbl"
                            label="Email"
                            name="emailaddress"
                            initialValue={email}
                            rules={[{type:email, required: true,message:'Enter the email address'},
                                   {pattern:/\S+@\S+\.\S+/,message:'Enter valid email address'}]}
                        >
                            <Input className='reg-input-feild'  onChange={(e)=>(setEmail(e.target.value))} />
                        </Form.Item>                          
                    </Col>

                    <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                        <Form.Item
                            className="reg-lbl"
                            label="PhoneNumber"
                            name="Phonenumber"
                            initialValue={phoneNumber}
                            rules={[{ required: true,message:'Enter Your Phone number'},
                            {pattern:/^([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/,message:'Enter valid Phone number with bar after country code'}]}
                        >
                            <Input  className='reg-input-feild' onChange={(e)=>(setPhoneNumber(e.target.value))}/>
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                        <Form.Item
                            className="reg-lbl"
                            label="Password"
                            name="Password"
                            initialValue={password}
                            rules={[{ required: true,message:'Enter Your Password'},
                            {pattern:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,message: 'Password must 8chars with uppercase,lowercase,special char&number'}
                        ]}
                        >
                            <Input.Password className='reg-input-feild'  onChange={(e)=>(setPassword(e.target.value))} />
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                        <Form.Item
                            className="reg-lbl"
                            label="Confirm Password"
                            name="Confirmpassword"
                            initialValue={confirmPassword}
                            rules={[{ required: true,
                            message:"Enter The Confirm Password"}
                            ]}
                        >
                            <Input.Password className='reg-input-feild'  onChange={(e)=>(ChckConfirmPassword(e.target.value))} />
                        </Form.Item>
                        {conPassVal && <p className='error' >Enter the same Password</p>}
                    </Col>
                    <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 15, offset: 0 }}>
                    <Radio.Group name="companyDetail" className='radio-reg' onChange={Radiobtn} value={companyDetail} >
                        <Radio value={"individual"} checked={companyDetail == "individual"}   >Individual</Radio>
                        {/* <Radio value={"company"} checked={companyDetail == "company"} >Company</Radio> */}
                    </Radio.Group>
                </Col>
                    <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Button htmlType='submit' type='primary' className='regpage-nxt-btn' onClick={handleClick}>Next</Button>
                    </Col>
                </Row>
            </Form>
    )
}