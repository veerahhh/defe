import React, { useState, useEffect } from 'react'
import './Profile.css'
import { Avatar, Form, Input, Col, Row, Divider, Button } from 'antd'
import * as Md from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { profileGet, profileUpdate } from '../../redux/reducer/profile/ProfileReducer'

function Profile() {
    const dispatch = useDispatch()
    const [enableEdit, setEnableEdit] = useState(true)
    const data = useSelector((state) => state.Profile.Data)

    const [profileDetails, setProfileDetails]=useState({
        first_name:"",
        last_name:"",
        phone_number:"",
        alternate_phonenumber:"",
        addressline_one:"",
        addressline_two:"",
        countryor_city:"",
        postalcode:"",
        company_name:"",
        company_type:"",
    })

    const handleChange=(e)=>{
        const {name, value}=e.target;
        setProfileDetails((prev)=>{
            return{...prev,[name]:value};
        });
    };

    const editForm = () => {
        enableEdit === false ? setEnableEdit(true) : setEnableEdit(false)
    }

    useEffect(() => {
        dispatch(profileGet(true))
    }, [])

    const update = () => {
        dispatch(profileUpdate({ 

            first_name:profileDetails.first_name,
            last_name: profileDetails.last_name,
            phone_number: profileDetails.phone_number,
            alternate_phonenumber: profileDetails.alternate_phonenumber,
            addressline_one: profileDetails.addressline_one,
            addressline_two: profileDetails.addressline_two,
            countryor_city:profileDetails. countryor_city,
            postalcode: profileDetails.postalcode,
            company_name: profileDetails.company_name,
            company_type: profileDetails.company_type
        }))
    }

    return (
        <div className='User-Profile-Parent-Container'>
            <div className='User-Profile-Header-Container'>
                <p className='User-Profile-Header-Text'>{enableEdit === true ? "User Profile" : "Edit User Profile"}</p>
                <div className='User-Profile-Edit-Enable-Button' onClick={editForm}>
                    <Md.MdEdit size={18} className='User-Profile-Edit-Enable-Icon' />
                </div>
            </div>
            <div className='User-Profile-Body-Container'>
                <main className='User-Profile-Main-Container-One'>
                    <div className='User-Profile-Avatar-Container'>
                        <Avatar size={120} className='User-Profile-Avatar' src="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_960_720.png" />
                        <div className='User-Profile-Avatar-Bg'></div>
                    </div>
                    <div className='User-Profile-Detail-Container'>
                        <p className='User-Profille-Name-Tag'>{data.first_name}{data.last_name}</p>
                        <Form name="basic" autoComplete="off" layout='vertical' size='medium' className='User-Profile-Form-Container' key={data.id}>

                            <Row gutter={[16, 0]}>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="First Name"
                                        name="first_name"
                                    >
                                        <Input disabled={enableEdit} name="first_name" defaultValue={data.first_name} className='User-Form-Input-Field' onChange={handleChange} />
                                    </Form.Item>
                                </Col>

                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="Last Name"
                                        name="last_name"
                                    >
                                        <Input disabled={enableEdit} name="last_name" defaultValue={data.last_name} className='User-Form-Input-Field' onChange={handleChange} />
                                    </Form.Item>
                                </Col>

                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="E-mail"
                                        name="email}"
                                    >
                                        <Input disabled name="email}" defaultValue={data.email} className='User-Form-Input-Field' />
                                    </Form.Item>
                                </Col>

                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="Phone Number"
                                        name="phone_number"
                                    >
                                        <Input disabled={enableEdit} name="phone_number" defaultValue={data.phone_number} className='User-Form-Input-Field' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="Alternate Phone Number"
                                        name="alternate_phonenumber"
                                    >
                                        <Input disabled={enableEdit} name="alternate_phonenumber" defaultValue={data.alternate_phonenumber} className='User-Form-Input-Field' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="Category"
                                        name="category"
                                    >
                                        <Input disabled defaultValue={data.category} className='User-Form-Input-Field' />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 1 }} style={{ display: ((data.category == "individual" ? "none" : "block")) }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="Company Name"
                                        name="company_name"
                                    >
                                        <Input disabled={enableEdit} name="company_name" defaultValue={data.company_name} className='User-Form-Input-Field' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }} style={{ display: ((data.category == "individual" ? "none" : "block")) }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="Company Type"
                                        name="company_type"
                                    >
                                        <Input disabled={enableEdit} name="company_type" className='User-Form-Input-Field' defaultValue={data.company_type} onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="Address Line 1"
                                        name="addressline_one"
                                    >
                                        <Input disabled={enableEdit} name="addressline_one" defaultValue={data.addressline_one} className='User-Form-Input-Field' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="Address Line 2"
                                        name="addressline_two"
                                    >
                                        <Input disabled={enableEdit} name="addressline_two" defaultValue={data.addressline_two} className='User-Form-Input-Field' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="Country / City"
                                        name="countryor_city"
                                    >
                                        <Input disabled={enableEdit} name="countryor_city" defaultValue={data.countryor_city} className='User-Form-Input-Field' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }}>
                                    <Form.Item
                                        className='User-Profile-Form-Item'
                                        label="Postal Code"
                                        name="postalcode"
                                    >
                                        <Input disabled={enableEdit} name="postalcode" defaultValue={data.postalcode} className='User-Form-Input-Field' onChange={handleChange} />
                                    </Form.Item>
                                </Col>
                                <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 1 }}>
                                    <Button type='primary' className='User-Profile-Update-Button' onClick={update} style={{ display: ((enableEdit === true ? "none" : "block")) }}>Update</Button>
                                </Col>
                            </Row>

                        </Form>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Profile