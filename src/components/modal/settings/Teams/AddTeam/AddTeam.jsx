import React from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd'
import '../View/View.css'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {PageUrlGet,TeamsUrlPost} from '../../../../../redux/reducer/settings/TeamsReducer'

const {Option} = Select;
function AddTeam() {

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(PageUrlGet())
    },[])

    const [read, setRead] = useState(false)
    const [teamName, setTeamName] = useState()
    const [addaccordian, setAddAcordian] = useState([{ pages: '', read: false, write: false, page_id: 0 }])
    // selectors
    const pageData = useSelector((state) => state.Teams.PageUrlDataGet)
    const message = useSelector((state) => state.Teams.modal.AddForm)
    // console.log(pageData)

    const addAccordianAccess = (e) => {
        setAddAcordian([...addaccordian, { pages: '', read: false, write: false, page_id: 0 }])
    }
    const removeAccordianAccess = (index) => {
        const listOfPage = [...addaccordian];
        listOfPage.splice(index, 1);
        setAddAcordian(listOfPage)
    }

    const handleChange = (e, index)=>{
        const listOfPage = [...addaccordian];
        listOfPage[index]['pages'] = e
        // console.log(listOfPage)
        setAddAcordian(listOfPage)
        pageData.map((values, data) => {
            if((values.page_name) === e){
                const pageListId = [...addaccordian];
                pageListId[index]['page_id'] = values.id
                // console.log(pageListId)
                setAddAcordian(pageListId)
            }
        })
    }
    const onReadCheckbox = (e, index)=>{
        // console.log(e.checked)
        const { name, checked } = e.target;
        const listOfPage = [...addaccordian];
        listOfPage[index][name] = checked;
        // console.log(listOfPage)
        setAddAcordian(listOfPage)
    }
    const onWriteCheckbox = (e, index)=>{
        // console.log(e.checked)
        const { name, checked } = e.target;
        const listOfPage = [...addaccordian];
        listOfPage[index][name] = checked;
        if (checked == true) {
            listOfPage[index]['read'] = checked;
            listOfPage[index]['write'] = checked;
          setRead(checked)
        }
        else {
            listOfPage[index]['write'] = checked;
    
        }
        // console.log(listOfPage)
        setAddAcordian(listOfPage)
    }

    const onSubmitTeams = ()=>{
        // console.log(teamName)
        dispatch(TeamsUrlPost({
            team_name: teamName,
            role_handling_pages: addaccordian,
            tenant_id:JSON.parse(sessionStorage.getItem("id")),
            AddForm: false
        }))
    }
    const Dropdown = (arr1,arr2)=>{
        console.log(arr1,arr2)
    }
    return (
        <div>
            <Form
                name="basic"
                autoComplete="off"
                layout='vertical'
                style={{ fontFamily: "Nunito" }}
            >
                <Form.Item
                    name="create team"
                    label="Create a Team Name"
                    layout='vertical'
                    rules={[
                        {
                            required: true,
                            message: 'Please fill your Team Name',

                        },
                    ]}
                >
                    <Input style={{width:'300px'}} onChange={(e)=>{setTeamName(e.target.value)}} />
                </Form.Item>

                <Form.Item
                    name="Pages"
                    label="Define Pages"
                    layout='vertical'
                    rules={[
                        {
                            required: true,
                            message: 'Please fill your Team Name',

                        },
                    ]}
                >
                    <div className='page-define-container'>
                        {addaccordian.map((value, index) => {
                            return (
                                <>
                                    <Select className='page-input' 
                                    placeholder='Select one pages'
                                    style={{width:'250px'}}
                                    onChange={(e)=>{handleChange(e, index)}}
                                    >
                                        {pageData.map((value,key)=>{
                                            return(
                                                <Option value={value.page_name} key={key}>{Dropdown(addaccordian,value.page_name)}</Option>
                                            )
                                        })}
                                    </Select> 
                                    <Checkbox name='read' onChange={(e) => {onReadCheckbox(e, index)}} style={{marginLeft:'0px'}} value={value.read}  checked={value.read}>Read</Checkbox>
                                    <Checkbox name='write' onChange={(e) => {onWriteCheckbox(e, index)}} value={value.write} >Write</Checkbox>
                                    {addaccordian.length - 1 === index && <Button type='primary' icon={<PlusOutlined />} className='addminus-btn' onClick={addAccordianAccess} />}
                                    {addaccordian.length !== 1 && <Button type='primary' icon={<MinusOutlined />} className='addminus-btn' onClick={removeAccordianAccess} />}
                                </>
                            )
                        })}
                    </div>
                </Form.Item>

                <Button htmlType='submit' type='primary' onClick={onSubmitTeams} style={{margin:'10% 0 0'}} >Create</Button>
            </Form>
        </div>
    )
}

export default AddTeam