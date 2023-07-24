import React, { useState } from 'react'
import { Button, Form, Input, Row, Col, message } from 'antd';
import './SignUp.css'
import { RegisterAPI } from '../../api/BackEndURL'

export default function FormTwo(props) {

    const [errorMsg, setErrorMsg] = useState('Email Alreay Exists')

    const { backToRegOne, success, NotSuccess, alternatePhoneno, postalCode, country, address1, address2,
        setAlternatePhoneno, setAddress1, setAddress2, setCountry, setpostalCode } = props;

    const key = 'updatable';
    const Error = () => {
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
            message.error({ content: `${errorMsg}`, key, duration: 5 });
        }, 1000);
    };

    const handleSubmit = () => {
        if (/^\d{6}$/.test(postalCode) && /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/.test(country)) {
            RegisterAPI.method(`${RegisterAPI.URL}`, props.Data).then((res) => {
                console.log(res.data)
                success(true)
                NotSuccess(true)
            }).catch(function (error) {
                Error(true)
            })


        }
    }

    const handleBackToOneReg = () => {
        backToRegOne(true)
    }

    console.log(props.Data)

    return (

        <Form
            name="basic"
            autoComplete="off"
            layout='vertical'
            className='Form_Container'
        >
            <Row gutter={[0, 2]}>
                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                        className='reg-lbl'
                        label="Alternate PhoneNumber"
                        name="alternatephonenumber"
                        initialValue={alternatePhoneno}
                        rules={[{ required: false, message: false },
                            {pattern:/^([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/,message:'Enter valid Phone number with bar after country code'}
                        ]}
                    >
                        <Input className='reg-input-feild' name='alternatePhoneno' maxLength={10} onChange={(e) => (setAlternatePhoneno(e.target.value))} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                        className='reg-lbl'
                        label="Address Line 1"
                        name="address1"
                        initialValue={address1}
                        rules={[{ required: true, message: 'Enter the Address' }]}
                    >
                        <Input className='reg-input-feild' name='address1' onChange={(e) => { setAddress1(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                        className='reg-lbl'
                        label="Address Line 2"
                        initialValue={address2}
                        name="address2"
                    >
                        <Input className='reg-input-feild' name='address2' onChange={(e) => (setAddress2(e.target.value))} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                        className='reg-lbl'
                        label="Country / City"
                        name="CountryAndCity"
                        initialValue={country}
                        rules={[{ required: true, message: 'Enter the Country Name!' },
                        { pattern: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, message: "Enter the Country Name" }]}
                    >
                        <Input className='reg-input-feild' name='country' onChange={(e) => setCountry(e.target.value)} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                        className='reg-lbl'
                        label="Postal Code"
                        name="postal code"
                        initialValue={postalCode}
                        rules={[{ required: true, message: 'Enter the Postal Code!' },
                        { pattern: /^\d{6}$/, message: "Enter 6 Digits number" }]}
                    >
                        <Input className='reg-input-feild' name='postalCode' maxLength={6} onChange={(e) => { setpostalCode(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Button htmlType='submit' type='primary' className='regpage-nxt-btn' onClick={handleSubmit}>Submit</Button>
                </Col>
                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Button className='regpage-bck-btn' onClick={handleBackToOneReg}>Back</Button>
                </Col>
            </Row>
        </Form>
    )
}
