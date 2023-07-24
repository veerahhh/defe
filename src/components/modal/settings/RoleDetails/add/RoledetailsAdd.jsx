import React from 'react'
import './RoledetailsAdd.css'
import { Col, Form, Row, Input, Button, List, Select, Checkbox, Collapse } from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RoleDetailsPost } from '../../../../../redux/reducer/settings/RoleDetailsReducer';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

function RoledetailsAdd() {
  const [read, setRead] = useState(false)

  const { Option } = Select
  const [addAccess, setAddAccess] = useState([{ pages: '', read: false, write: false, page_id: 0 }])

  const roleData = useSelector((state) => state.RoleDetails.NewRoleDataGet)
  const pageData = useSelector((state) => state.RoleDetails.PageUrlDataGet)
  const message = useSelector((state) => state.RoleDetails.modal.addRoleDetails)

  const addPageAccess = (e) => {
    setAddAccess([...addAccess, { pages: '', read: false, write: false, page_id: 0 }])
  }
  const removePageAccess = (index) => {
    const pageList = [...addAccess];
    pageList.splice(index, 1);
    setAddAccess(pageList)
  }

  const handleChange = (e, index) => {
    const pageList = [...addAccess];
    pageList[index]['pages'] = e
    setAddAccess(pageList)
    pageData.map((values, data) => {
      if ((values.page_name) === e) {
        const pageListId = [...addAccess];
        pageListId[index]['page_id'] = values.id
        setAddAccess(pageListId)

      }
    })
  }

  const dispatch = useDispatch()

  const [roleDetailState,setRoleDetailState]=useState({
    new_role_name:'',
    new_role_id:'',
    new_role_detail_name:'',
    new_role_detail_description:''
  })

  // const [new_role_name, setNew_role_name] = useState()
  const [searchForm, setSearchForm] = useState(true)
  const [addForm, setAddForm] = useState(false)
  const [dataSearch, setDataSearch] = useState('')
  const [dataList, setDataList] = useState(false)

  // add role details Data's state
  // const [new_role_id, setNew_role_id] = useState()
  // const [new_role_detail_name, setNew_role_detail_name] = useState()
  // const [new_role_detail_description, setNew_role_detail_description] = useState()

  const handleChange1 = (e) => {
    setRoleDetailState({ ...roleDetailState, [e.target.name]: e.target.value })
}

  const newRoleSearchChange = (e) => {
    setDataSearch(e.target.value)
    e.target.value.length > 0 ? setDataList(true) : setDataList(false)
  }

  const onCheckbox = (e, index) => {
    const { name, checked } = e.target;
    const pageList = [...addAccess];
    pageList[index][name] = checked;
    setAddAccess(pageList)
  };

  const onCheckboxWrite = (e, index) => {
    const { name, checked } = e.target;
    const pageList = [...addAccess];
    pageList[index][name] = checked;
    if (checked == true) {
      pageList[index]['read'] = checked;
      pageList[index]['write'] = checked;
      setRead(checked)
    }
    else {
      pageList[index]['write'] = checked;

    }
    setAddAccess(pageList)
  };


  const data = roleData.filter((val) => {
    if (dataSearch === "") {
      return val;
    } else if (val.role_name.toString().toLowerCase().includes(dataSearch.toLowerCase())) {
      return val
    }
  }).map((val) => {
    return {
      role_id: val.id,
      new_role_name: val.role_name,
    }
  })

  const dataSubmit = () => {
    dispatch(RoleDetailsPost({
      role_id: roleDetailState.new_role_id,
      role_name: roleDetailState.new_role_name,
      role_detail_name: roleDetailState.new_role_detail_name,
      role_description: roleDetailState.new_role_detail_description,
      role_handling_pages: addAccess,
      addRoleDetails: false
    }))
  }

  return (
    <div>
      <div className="role-details-overall-container">
        {searchForm &&
          <div className='Pipeline_detail_Search_Sugg_Box'>
            <Input.Search className='Pipeline_detail_Search_Sugg_Inner_Box' onChange={newRoleSearchChange} placeholder='Search for role name...' enterButton />
            {dataList && <div className='Pipeline_detail_Search_List_Title_text'>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item onClick={() => {
                    // setNew_role_name(item.new_role_name)
                    // setNew_role_id(item.role_id)
                    setRoleDetailState({...roleDetailState,new_role_name:item.new_role_name,new_role_id:item.role_id})
                    setSearchForm(false)
                    setAddForm(true)

                  }} className='Pipeline_Search_List' style={{ height: "60px", cursor: 'pointer', userSelect: 'none', fontFamily: "Nunito" }}>
                    <List.Item.Meta
                      title={<p className='Pipeline_Search_List_Title_text'>{item.new_role_name}</p>}
                    />
                  </List.Item>
                )}
              />

            </div>}
          </div>
        }
        {addForm &&
          <Form
            name="basic"
            autoComplete="off"
            layout='vertical'
            style={{ fontFamily: "Nunito" }}
          >
            <Row gutter={[8, 16]}>
              <Col className="gutter-row" span={24} >
                <Form.Item
                  name="User Role Name"
                  label="User Role Name"
                  layout='horizontal'
                >
                  <Input defaultValue={roleDetailState.new_role_name} disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col className="gutter-row" span={12} >
                <Form.Item
                  name="new_role_detail_name"
                  label="Role Detail Name"
                  layout='horizontal'
                  rules={[
                    {
                      required: true,
                      message: 'Please fill your Detail Field',

                    },
                  ]}
                >
                  <Input name="new_role_detail_name" onChange={handleChange1} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12} >
                <Form.Item
                  name="new_role_detail_description"
                  label="Description"
                  layout='horizontal'
                  rules={[
                    {
                      required: true,
                      message: 'Please fill your Description field',

                    },
                  ]}
                >
                  <Input name="new_role_detail_description" onChange={handleChange1} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="handling pages"
              label="Handling pages"
              layout='horizontal'
              rules={[
                {
                  required: true,
                  message: 'Please fill your Handling pages',

                },
              ]}
            >
              <div className='page-border'>
                {addAccess.map((val, index) => {
                  return (
                    <>
                      <Row gutter={[8, 16]}>
                        <Col className='gutter-row' span={10} style={{ margin: '7px 0 0 10px'}} >
                          <Select
                            style={{
                              width: '100%',
                            }}
                            placeholder="select one pages"
                            onChange={(e) => { handleChange(e, index) }}

                          >
                            {pageData.map((item, key) => {
                              return (
                                <Option value={item.page_name} key={key}>
                                  <div className="demo-option-label-item" >
                                    {item.page_name}
                                  </div>
                                </Option>
                              )
                            })}
                          </Select>
                        </Col>
                        <Col className='gutter-row' span={8} style={{ margin: '10px 0', }}  >
                          <Checkbox name='read' onChange={(e) => { onCheckbox(e, index) }} value={val.read} checked={val.read} style={{ margin: '0px 0 0 9px', }} >Read</Checkbox>
                          <Checkbox name='write' onChange={(e) => { onCheckboxWrite(e, index) }} value={val.write} >Write</Checkbox>

                        </Col>
                        <Col className='gutter-row' span={4} style={{ margin: '7px 0 0 0px', padding: '0', display: 'flex', }} >
                          {addAccess.length - 1 === index && <Button type="text" icon={<PlusOutlined />} style={{ border: 'solid 1px blue', backgroundColor: '#0c50a3', color: '#fff', marginRight: '5px' }} onClick={addPageAccess} />}
                          {addAccess.length !== 1 && <Button type="text" icon={<MinusOutlined />} style={{ border: 'solid 1px blue', backgroundColor: '#0c50a3', color: '#fff', }} onClick={removePageAccess} />}
                        </Col>

                      </Row>
                    </>
                  )
                })}
              </div>
            </Form.Item>

            <div className='roledetails_addform_button_cont'>
              <Button type='primary' className='newconn-cncl-btn' onClick={() => {
                setAddForm(false);
                setSearchForm(true)
                setDataSearch('')
                setDataList(false)
                setAddAccess([{ pages: '', read: false, write: false, page_id: 0 }])

              }} >
                Back
              </Button>
              <Button htmlType='submit' type='primary' onClick={dataSubmit} className='newconn-create-btn' >Create</Button>
            </div>
          </Form>
        }
      </div>

    </div>
  )
}

export default RoledetailsAdd;
