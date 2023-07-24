import React from 'react'
import { Col, Row } from 'antd'
import './RegisterForm.css'
import RegisterImg from '../../../assests/images/TenantRegisterImg.svg'
import Logo from '../../../assests/images/DMX datahub.svg'
import Form from './Form'

function RegisterForm() {
    return (
        <Row gutter={[0, 0]}>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 12, offset: 0 }}>
                <div className='Tenant-Reg-Form-Left'>
                    <img src={Logo} />
                    <Form />
                </div>
            </Col>
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 12, offset: 0 }}>
                <div className='Tenant-Reg-Form-Right'>
                    <p className='Tenant-Reg-Form_Title'>WELCOME</p>
                    <p className='Tenant-Reg-Form-Sub-Title'>Million's of data transfer in a second</p>
                    <img src={RegisterImg} className="Tenant-Reg-Form-Bg-Img" />
                </div>
            </Col>
        </Row>
    )
}

export default RegisterForm