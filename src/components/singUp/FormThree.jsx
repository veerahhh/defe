import React,{useState} from 'react'
import { Form, Input, Row, Col, Button,message } from 'antd';
import './SignUp.css'
import { RegisterAPI } from '../../api/BackEndURL'


export default function FormThree(props) {

    const [errorMsg, setErrorMsg] = useState('Email Already Exists')

    const { backToRegOne, success, NotSuccess, compName, compType, postalCode, country, address1, address2,
        setCompName, setCompType, setAddress1, setAddress2, setCountry, setpostalCode } = props

        const key = 'updatable';
        const Error = () => {
            message.loading({ content: 'Loading...', key });
            setTimeout(() => {
                message.error({ content: `${errorMsg}`, key, duration: 5 });
            }, 1000);
        };

    const handleSubmit = () => {
        if (/^[a-zA-Z ]*$/.test(compName) && /[a-zA-Z ]*$/.test(compType) &&
            /^\d{6}$/.test(postalCode) && /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/.test(country)) {

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
            <Row gutter={[0, 3]}>

                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                        className="reg-lbl"
                        label="Company Name"
                        name="CompanyName"
                        initialValue={compName}
                        rules={[{ required: true, message: 'Enter the Company Name!' },
                        { pattern: /^[a-zA-Z ]*$/, message: "Enter your Company name" }
                        ]}
                    >
                        <Input className='reg-input-feild' onChange={(e) => { setCompName(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                        className="reg-lbl"
                        label="Company Type"
                        name="CompanyType"
                        initialValue={compType}
                        rules={[{ required: true, message: 'Enter the Company Type' },
                        { pattern: /^[a-zA-Z ]*$/, message: "Enter your Company Type" }
                        ]}
                    >
                        <Input className='reg-input-feild' onChange={(e) => { setCompType(e.target.value) }} />
                    </Form.Item>

                </Col>

                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                        className="reg-lbl"
                        label="Address Line 1"
                        name="Addressline1"
                        initialValue={address1}
                        rules={[{ required: true, message: 'Enter the Address!' }]}
                    >
                        <Input className='reg-input-feild' onChange={(e) => { setAddress1(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                        className="reg-lbl"
                        label="Address Line 2"
                        name="Addressline2"
                        initialValue={address2}
                    >
                        <Input className='reg-input-feild' name='address2' onChange={(e) => (setAddress2(e.target.value))} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24, offset: 5 }} md={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 0 }}>
                    <Form.Item
                        className="reg-lbl"
                        label="Country / City"
                        name="countryorcity"
                        initialValue={country}
                        rules={[{ required: true, message: 'Enter the Country Name!' },
                        { pattern: /^[a-zA-Z][a-zA-Z ]+[a-zA-Z]$/, message: "Enter your Country Name" }
                        ]}
                    >
                        <Input className='reg-input-feild' name='country' onChange={(e) => { setCountry(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24, offset: 5 }} md={{ span: 24, offset: 0 }} lg={{ span: 11, offset: 2 }}>
                    <Form.Item
                        className="reg-lbl"
                        label="PostalCode"
                        name="PostalCode"
                        initialValue={postalCode}
                        rules={[{ required: true, message: 'Enter The Postal Code!' },
                        { pattern: /^\d{6}$/, message: "Enter 6 Digits Code" }]}
                    >
                        <Input className='reg-input-feild' name='postalCode' maxLength={6} onChange={(e) => { setpostalCode(e.target.value) }} />
                    </Form.Item>
                </Col>

                <Col xs={{ span: 24, offset: 5 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Button htmlType='submit' type='primary' className='regpage-nxt-btn' onClick={() => { handleSubmit() }}>Submit</Button>
                </Col>
                <Col xs={{ span: 24, offset: 5 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Button className='regpage-bck-btn' onClick={handleBackToOneReg}>Back</Button>
                </Col>
            </Row>
        </Form>
    )
}
