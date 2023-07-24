import React, { useState, useEffect } from 'react'
import { Row, Button, Form, Input, Col, DatePicker, Switch, List, Select } from 'antd'
import './TenantEdit.css'
import Success from '../../../../pages/tenant/success/Success'
// import { TenantRegister } from '../../../../api/BackEndURL'
import {tenantPut} from '../../../../redux/reducer/tenantList/TenantListReducer'
import { message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';

function TenantEdit() {

    const { RangePicker } = DatePicker;
    let key = 'updatable'
    const dispatch = useDispatch()
    const dateFormat = 'YYYY-MM-DD';

    const tenantdata = useSelector((state) => state.Tenant.getOneData)
     console.log(tenantdata.company_name)
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

    const [companyName, setCompanyName] = useState()
    const [companyRegNo, setCompanyRegNo] = useState()
    const [companyPanNo, setCompanyPanNo] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [address, setAddress] = useState()
    const [country, setCountry] = useState()
    const [city, setCity] = useState()
    const [postalcode, setPostalCode] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [status, setStatus] = useState()

    // const [data, setData] = useState({
    //     company_name: '',
    //     company_reg_no: '',
    //     company_pan_no: '',
    //     startDate: '',
    //     endDate: '',
    //     email: '',
    //     phone_number: '',
    //     address: '',
    //     country: '',
    //     city: '',
    //     postalcode: '',
    //     password: '',
    //     confirm_password: '',
    //     tenant_id: '',
    //     role: 'Tenant'
    // })

    const next = () => {
        setForm({ ...form, formOne: false, formTwo: true, success: false })
    }

    const back = () => {
        setForm({ ...form, formOne: true, formTwo: false, success: false })
    }

    const datePickerOnChange = (dates, dateStrings) => {
        setStartDate(dateStrings[0])
        setEndDate(dateStrings[1])
      }

    // const handleChange = (e) => {
    //     setData({ ...data, [e.target.name]: e.target.value })
    // }

    // const datePickerOnChange = (dates, dateStrings) => {
    //     setData({ ...data, endDate: dateStrings[1], startDate: dateStrings[0] })
    // };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day') 
    };

    const Update = () => {
        // console.log("ss")
        dispatch(tenantPut({
            company_name: companyName,
            company_reg_no: companyRegNo,
            company_pan_no:companyPanNo,
            phone_number: phoneNumber,
            start_date: startDate,
            end_date: endDate,
            email: email, 
            address: address,
            country: country,
            city: city,
            postalcode: postalcode,      
            TenantEditPop: false
            // is_active: '',
        }))
    }

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

    // console.log(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[^\w\s]).{8,}$/.test(data.password))


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
        // <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito", height: "calc(100vh - 110px)", textTransform:'capitalize', width: "95%", margin: "10px auto 0 auto" }}>
        <Form name="basic" autoComplete="off" layout='vertical' key={tenantdata.id}>
            {form.formOne && <Row gutter={[16, 0]}>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Company Name"
                        name="company_name"
                        // rules={[{ required: true, message: 'Please Enter Company Name', }]}
                    >
                        <Input name="company_name" placeholder={tenantdata.company_reg_no} onChange={(e) => { setCompanyName(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Company Reg.No"
                        name="company_reg_no"
                        // rules={[{ required: true, message: 'Please Enter Company Reg.No', }]}
                    >
                        <Input disabled defaultValue={tenantdata.company_reg_no} name="company_reg_no" onChange={(e) => { setCompanyRegNo(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                    <Form.Item
                        label="Company Pan.No"
                        name="company_pan_no"
                        // rules={[{ required: false }]}
                    >
                        <Input disabled defaultValue={tenantdata.company_pan_no} name="company_pan_no" onChange={(e) => { setCompanyPanNo(e.target.value) }}                   />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }}>
                    <Form.Item
                        label="Phone Number"
                        name="phone_number"
                        // rules={[{ required: true, message: 'Please Enter Phone Number' }]}
                    >
                        <Input  type="number" name="phone_number" onChange={(e) => { setPhoneNumber(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Start Date - End Date"
                        name="StartDateToEndDate"
                        // rules={[{ required: true, message: 'Please Select the End Date' }]}
                    >
                        <RangePicker disabledDate={disabledDate} defaultValue={[moment()]} onChange={datePickerOnChange} style={{ width: "100%" }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="E-mail"
                        name="email"
                        // rules={[{ required: true, message: '', }]}
                    >
                        <Input name="email" onChange={(e) => { setEmail(e.target.value) }} />
                    </Form.Item>
                    {form.emailError && <p className='error'>Please Enter Valid E-mail</p>}
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Button onClick={next} type="primary" htmlType="submit" className='Tenant-Edit-Form-Next-Button'  >Next</Button>
                </Col>
            </Row>}


            {form.formTwo && <Row gutter={[16, 0]}>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Address"
                        name="address"
                        // rules={[{ required: true, message: 'Please Enter Company Name', }]}
                    >
                        <Input  name="address" onChange={(e) => { setAddress(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span:22, offset: 1 }}>
                    <Form.Item
                        label="Country"
                        name="country"
                        // rules={[{ required: true, message: 'Please Enter Country Name', }]}
                    >
                        <Input  name="country" onChange={(e) => { setCountry(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="City"
                        name="city"
                        // rules={[{ required: true, message: 'Please Enter City Name', }]}
                    >
                        <Input  name="city" onChange={(e) => { setCity(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Postal Code"
                        name="postalcode"
                        // rules={[{ required: true, message: 'Please Enter Postal Code', }]}
                    >
                        <Input  type="number" name="postalcode" onChange={(e) => { setPostalCode(e.target.value) }} />
                    </Form.Item>
                </Col>

                {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 1 }}>
                    <Form.Item
                        label="Password"
                        name="password"
                        // rules={[{ required: true, message: 'Please Enter Valid Password' }]}
                    >
                        <Input.Password disabled defaultValue={tenantdata.password} name="password" onChange={(e) => { setPassword(e.target.value) }} />
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
                        <Input.Password disabled defaultValue={tenantdata.confirm_password} name="confirm_password" onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    </Form.Item>
                    {form.passwordchecker && <p className='error'>Confirm Password Doesn't Match</p>}
                </Col> */}

                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 1 }}>
                    <Button type="primary" htmlType="submit" onClick={back} className='Tenant-Edit-Form-Back-Button' >Back</Button>
                </Col>
                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 2 }}>
                    <Button type="primary" htmlType="submit" className='Tenant-Edit-Form-Next-Button' onClick={Update}>Update</Button>
                </Col>
            </Row>}
{/* 
            {form.success && <Success code={data.tenant_id} />} */}

        </Form>
    )
}

export default TenantEdit