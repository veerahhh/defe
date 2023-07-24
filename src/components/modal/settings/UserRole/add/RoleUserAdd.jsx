import React, { useState, useEffect } from 'react'
import './RoleUserAdd.css'
import moment from 'moment';
import { Row, Button, Form, Input, Col, DatePicker, Switch, List, Select, AutoComplete } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AddForm, UserRoleAdd } from '../../../../../redux/reducer/settings/UserRoleReducer'

function RoleUserAdd() {

    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD';

    const[userRoleState,setUserRoleState]=useState({
        username:'',
        startDate:'',
        endDate:'',
        status:true
    })
    
    // const [username, setuserName] = useState()
    // const [rolename, setrolename] = useState()
    // const [startDate, setStartDate] = useState()
    // const [endDate, setEndDate] = useState()
    // const [status, setStatus] = useState(true)

    const [dataList, setDataList] = useState(false)
    const [dataSearch, setDataSearch] = useState('')
    const [roleNameList, setRolenamelist] = useState('')

    const dispatch = useDispatch()

    const searchForm = useSelector((state) => state.UserRole.modal.Search)
    const addForm = useSelector((state) => state.UserRole.modal.AddForm)
    const userData = useSelector((state) => state.User.Data)
    const getRoleName = useSelector((state) => state.UserRole.RoleName)

    const rolenamelist = []

    const getrole = getRoleName.map((list) => { return rolenamelist.push({ value: list.role_name }) })

    const userRoleSearchOnChange = (e) => {
        setDataSearch(e.target.value)
        e.target.value.length !== 0 ? setDataList(true) : setDataList(false)
    }

    const data = userData.filter((val) => {
        if (dataSearch === "") {
            return val;
        } else if (val.first_name.toString().toLowerCase().includes(dataSearch.toLowerCase())) {
            return val
        }
    }).map((val) => {
        return {
            title: val.first_name,
            id: val.id,
            status: val.is_active,
        }
    })

    const switchOnChange = (checked) => { 
        setUserRoleState({...userRoleState,status:checked}) 
    };

    // const datePickerOnChange = (dates, dateStrings) => {
    //     console.log(dateStrings)
    //     setUserRoleState({...userRoleState,startDate:dateStrings[]})
    //     setUserRoleState({...userRoleState,endDate:dateStrings[1]})
    // };
    const datePickerOnChange = (dates, dateStrings) => {
        setUserRoleState({ ...userRoleState, endDate: dateStrings[1], startDate: dateStrings[0] })
    };

    const formSubmit = () => {

        if(userRoleState.username.length!==0 &&userRoleState.endDate.length!==0&&roleNameList.length!==0){

            console.log(userRoleState.startDate)
        dispatch(UserRoleAdd({

            user_name: userRoleState.username,
            role_name: roleNameList,
            start_date: userRoleState.startDate,
            end_date: userRoleState.endDate,
            is_active: userRoleState.status,
        }))
    }

    }

    function onSelect(value) {
        setRolenamelist(value)
    }

    return (
        <div>
            <div className='Userrole_AddForm_Parent_Contaiiner'>

                {searchForm && <div className='Userrole_Search_Parent_Container'>
                    <Input.Search className='Userrole_Add_Search_Input' onChange={userRoleSearchOnChange} placeholder='Please Type User Name ' enterButton />

                    {dataList && <div className='Userrole_Add_Search_Sugg_Box'>
                        {console.log(data)}
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item onClick={() => {
                                    // setuserName(item.title)
                                    setUserRoleState({...userRoleState,username:item.title})
                                    dispatch(AddForm({ Search: false, AddForm: true }))
                                }} className='Userrolee_Search_List' style={{ height: "60px", cursor: 'pointer', userSelect: 'none',fontFamily: "Nunito"  }}>
                                    <List.Item.Meta
                                        title={<p className='Userrole_Search_List_Title_text'>{item.title}</p>}
                                        description={<p className={item.status === true ? "Status_Active_Text" : "Status_InActive_Text"}>{item.status === true ? "Active" : "In_Active"}</p>}
                                    />
                                </List.Item>
                            )}
                        />

                    </div>}

                </div>}



                {addForm && <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito" }}>
                    <Row gutter={[16, 0]}>
                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                            <Form.Item
                                label="User Name"
                                name="name"
                            >
                                <Input defaultValue={userRoleState.username} disabled />

                            </Form.Item>
                        </Col>
                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                            <Form.Item
                                label="Role Name"
                                name=" Role Name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Enter Role Name',
                                    },
                                ]}
                            >
                                <AutoComplete
                                    style={{
                                        width: 200,
                                    }}

                                    className='conname-inputfeild'
                                    options={rolenamelist}
                                    onSelect={onSelect}
                                    placeholder="Enter Your Role Name"

                                />


                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                            <Form.Item
                                label="Start Date - End Date"
                                name="StartDateToEndDate"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please Select EndDate',
                                    },
                                ]}
                            >
                                <RangePicker disabled={[true, false]} defaultValue={[moment()]} onChange={datePickerOnChange} style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                            <Form.Item
                                label="Active"
                                name="status"
                            >
                                <Switch defaultChecked={true} onChange={switchOnChange} />
                            </Form.Item>
                        </Col>

                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 0 }}>
                            <Button type="primary" onClick={() => {
                                dispatch(AddForm({ Search: true, AddForm: false }))
                                setDataSearch('');
                                setDataList(false)
                            }} className='User_Back_Button'>Back</Button>
                        </Col>

                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 4 }}>
                            <Button onClick={formSubmit} type="primary" htmlType="submit" className='User_Add_Button'> Create </Button>
                        </Col>
                    </Row>
                </Form>}
            </div>
        </div>
    )
}

export default RoleUserAdd