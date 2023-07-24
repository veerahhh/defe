import React, { useState, useEffect } from 'react'
import { Row, Button, Form, Input, Col, DatePicker, Switch, List, Select } from 'antd'
import './TenantView.css'
import { useSelector, useDispatch } from 'react-redux'
//import Success from '../../../../pages/tenant/success/Success'
// import { TenantRegister } from '../../../../api/BackEndURL'
import { message } from 'antd'
import moment from 'moment';

function TenantView() {

    const { RangePicker } = DatePicker;
    let key = 'updatable'

    const tenantGetOne = useSelector((state) => state.Tenant.getOneData)

    const [form, setForm] = useState({
        formOne: true,
        formTwo: false,
        emailError: false,
        nextDisable: true,
        registerDisable: true,
        passwordchecker: false,
        passwordPattern: false,
        success: false
    })

    const [data, setData] = useState({
        company_name: '',
        company_reg_no: '',
        company_pan_no: '',
        startDate: '',
        endDate: '',
        email: '',
        phone_number: '',
        address: '',
        country: '',
        city: '',
        postalcode: '',
        password: '',
        confirm_password: '',
        tenant_id: '',
        role: 'Tenant'
    })

    const next = () => {
        setForm({ ...form, formOne: false, formTwo: true, success: false })
    }

    const back = () => {
        setForm({ ...form, formOne: true, formTwo: false, success: false })
    }

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const datePickerOnChange = (dates, dateStrings) => {
        setData({ ...data, endDate: dateStrings[1], startDate: dateStrings[0] })
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day')
    };

    // useEffect(() => {

    //     if (data.company_name.length !== 0 && data.company_reg_no !== 0 && data.email.length !== 0 && data.phone_number.length!== 0 && data.startDate.length !== 0 && data.endDate.length !== 0 ) {
    //         if ((!/\S+@\S+\.\S+/.test(data.email)) !== true) {
    //             setForm({ ...form, emailError: false, nextDisable: false })
    //         } else {
    //             setForm({ ...form, emailError: true, nextDisable: true })
    //         }
    //     }else{
    //         setForm({...form,nextDisable:true})
    //     }

    //     if (form.formTwo !== false) {
    //         if (data.address.length !== 0 && data.country.length !== 0 && data.city.length !== 0 && data.postalcode.length !== 0 ) {
    //             if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[^\w\s]).{8,}$/.test(data.password)===true) {
    //                 if (data.password === data.confirm_password) {
    //                     setForm({ ...form, passwordchecker: false, registerDisable: false })
    //                 } else if (data.password !== data.confirm_password) {
    //                     setForm({ ...form, passwordchecker: true, registerDisable: true })
    //                 }

    //             } 
    //         }
    //     }

    // }, [data])

    console.log(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[^\w\s]).{8,}$/.test(data.password))

    // const Register = () => {
    //     TenantRegister.method(`${TenantRegister.URL}`, data).then((res) => {
    //         console.log(res.data)
    //     })
    // }

    // const codeGenerator = () => {
    //     const lowest = 1000;
    //     const highest = 9999;
    //     let randomNumber = Math.random() * (highest - lowest) + lowest;
    //     randomNumber = Math.floor(randomNumber);
    //     setData({ ...data, tenant_id: data.company_name + "-" + randomNumber })

    //     TenantRegister.method(`${TenantRegister.URL}`, {
    //         company_name: data.company_name,
    //         company_reg_no: data.company_reg_no,
    //         company_pan_no: data.company_pan_no,
    //         email: data.email,
    //         phone_number: data.phone_number,
    //         address: data.address,
    //         country: data.country,
    //         city: data.city,
    //         postalcode: data.postalcode,
    //         password: data.password,
    //         role:data.role,
    //         tenant_id: data.company_name + "-" + randomNumber,
    //     }).then((res) => {
    //         setForm({ ...form, formOne: false, formTwo: false, success: true })
    //     }).catch((err) => {
    //         // console.log(err.response.data)
    //         // message.error({ content:err.response.data, key, duration: 2, });
    //     })

    //     // setTimeout(() => {
    //     //     setForm({ ...form, formOne: false, formTwo: false, success: true })
    //     // }, 1000);

    // }

    return (
        // <Form name="basic" autoComplete="off" layout='vertical' size='medium' key={tenantGetOne.id} style={{ fontFamily: "Nunito", height: "calc(100vh - 100px)", textTransform:'capitalize', width: "95%", margin: "10px auto 0 auto" }}>
        <Form name="basic" autoComplete="off" layout='vertical'>
            {form.formOne && <Row gutter={[16, 0]}>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Company Name"
                        name="company_name"
                        // rules={[{ required: true, message: 'Please Enter Company Name', }]}
                    >
                        <Input disabled placeholder={tenantGetOne.company_name} name="company_name" onChange={handleChange} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Company Reg.No"
                        name="company_reg_no"
                        // rules={[{ required: true, message: 'Please Enter Company Reg.No', }]}
                    >
                        <Input disabled placeholder={tenantGetOne.company_reg_no} name="company_reg_no" onChange={handleChange} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                    <Form.Item
                        label="Company Pan.No"
                        name="company_pan_no"
                        // rules={[{ required: false }]}
                    >
                        <Input disabled placeholder={tenantGetOne.company_pan_no} name="company_pan_no" onChange={handleChange} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }}>
                    <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        // rules={[{ required: true, message: 'Please Enter Phone Number' }]}
                    >
                        <Input disabled placeholder={tenantGetOne.phone_number} type="number" name="phone_number" onChange={handleChange} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Start Date - End Date"
                        name="StartDateToEndDate"
                        // rules={[{ required: true, message: 'Please Select the End Date' }]}
                    >
                        <RangePicker disabled={[true, true]} placeholder={[(tenantGetOne.startDate), (tenantGetOne.endDate)]}  onChange={datePickerOnChange} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="E-mail"
                        name="email"
                        // rules={[{ required: true, message: '', }]}
                    >
                        <Input disabled placeholder={tenantGetOne.email} name="email" onChange={handleChange} />
                    </Form.Item>
                    {form.emailError && <p className='error'>Please Enter Valid E-mail</p>}
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Button onClick={next} type="primary" htmlType="submit" className='Tenant-View-Form-Next-Button'  >Next</Button>
                </Col>
            </Row>}


            {form.formTwo && <Row gutter={[16, 0]}>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Address"
                        name="address"
                        // rules={[{ required: true, message: 'Please Enter Company Name', }]}
                    >
                        <Input disabled placeholder={tenantGetOne.address} name="address" onChange={handleChange} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Country"
                        name="country"
                        // rules={[{ required: true, message: 'Please Enter Country Name', }]}
                    >
                        <Input disabled placeholder={tenantGetOne.country} name="country" onChange={handleChange} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="City"
                        name="city"
                        // rules={[{ required: true, message: 'Please Enter City Name', }]}
                    >
                        <Input disabled placeholder={tenantGetOne.city} name="city" onChange={handleChange} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Postal Code"
                        name="postalcode"
                        // rules={[{ required: true, message: 'Please Enter Postal Code', }]}
                    >
                        <Input disabled placeholder={tenantGetOne.postalcode} type="number" name="postalcode" onChange={handleChange} />
                    </Form.Item>
                </Col>

                {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Password"
                        name="password"
                        // rules={[{ required: true, message: 'Please Enter Valid Password' }]}
                    >
                        <Input.Password disabled placeholder={tenantGetOne.password} name="password" onChange={handleChange} />
                    </Form.Item>
                    {form.passwordPattern && <p className='error'> Password must be 8 Char , 1 Uppercase,Sp char & Numbers</p>}
                    <p style={{ fontFamily: 'Nunito', fontSize: '10px', fontWeight: '500', position: 'relative', margin: '-10px 0 0 8px', color: 'rgba(100,100,100,1)' }}> Password must be 8 Char,1 Uppercase,Spl char & Numbers</p>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Confirm Password"
                        name="confirm_password"
                        // rules={[{ required: true, message: '', }]}
                    >
                        <Input.Password disabled placeholder={tenantGetOne.confirm_password} name="confirm_password" onChange={handleChange} />
                    </Form.Item>
                    {form.passwordchecker && <p className='error'>Confirm Password Doesn't Match</p>}
                </Col> */}

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Button type="primary" htmlType="submit" onClick={back} className='Tenant-View-Form-Back-Button' >Back</Button>
                </Col>

                {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 2 }}>
                    <Button type="primary" htmlType="submit" className='Tenant-Add-Form-Next-Button'>Update</Button>
                </Col> */}
            </Row>}

            {/* {form.success && <Success code={data.tenant_id} />} */}

        </Form>
    )
}

export default TenantView