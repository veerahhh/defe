// import React, { useEffect, useState } from 'react'
// import moment from "moment"
// import './RoleAdd.css';
// import { RoleAdd,PageUrlGet } from '../../../../../redux/reducer/settings/RoleReducer';
// import { useDispatch, useSelector } from 'react-redux'
// import { Button, Input, Form, Row, Col, DatePicker, Checkbox, Switch, message, Select } from 'antd';
// import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
// // import {PagesUrlGet} from '../../../../../redux/reducer/settings/PagesReducer'
// function RoleAddModel() {

//     const { Option } = Select
//     const [read, setRead] = useState(false)

//     const dispatch = useDispatch()
//     const { RangePicker } = DatePicker;
//     const dateFormat = 'YYYY-MM-DD';
//     const pageData = useSelector((state) => state.Role.PageUrlDataGet)
//     // console.log(pageData)

//     useEffect(()=>{
//         dispatch(PageUrlGet(true))
//     },[])
//     const [roleState, setRoleState] = useState({
//         newRoleName: '',
//         description: '',
//         isActive: true,
//         startDate: '',
//         endDate: ''
//     })
//     const [addAccess, setAddAccess] = useState([{ pages: '', read: false, write: false, page_id: 0 }])
//     const addPageAccess = (e) => {
//         setAddAccess([...addAccess, { pages: '', read: false, write: false, page_id: 0 }])
//     }
//     const removePageAccess = (index) => {
//         const pageList = [...addAccess];
//         pageList.splice(index, 1);
//         setAddAccess(pageList)
//     }
//     const onCheckbox = (e, index) => {
//         const { name, checked } = e.target;
//         const pageList = [...addAccess];
//         pageList[index][name] = checked;
//         setAddAccess(pageList)
//     };

//     const onCheckboxWrite = (e, index) => {
//         const { name, checked } = e.target;
//         const pageList = [...addAccess];
//         pageList[index][name] = checked;
//         if (checked == true) {
//             pageList[index]['read'] = checked;
//             pageList[index]['write'] = checked;
//             setRead(checked)
//         }
//         else {
//             pageList[index]['write'] = checked;

//         }
//         setAddAccess(pageList)
//     }


//     const handlePage = (e, index) => {
//         const pageList = [...addAccess];
//         pageList[index]['pages'] = e
//         setAddAccess(pageList)
//         pageData.map((values, data) => {
//             console.log(values)
//             if ((values.page_name) === e) {
//                 const pageListId = [...addAccess];
//                 pageListId[index]['page_id'] = values.id
//                 setAddAccess(pageListId)

//             }
//         })
//     }
//     const key = 'updatable';
//     const success = () => {
//         message.loading({ content: 'Loading...', key });
//         setTimeout(() => {
//             message.success({ content: 'Created Success Fully!', key, duration: 2, });

//         }, 1000);
//     };
//     const createRole = async (e) => {
//         if (
//           roleState.newRoleName.trim() === '' ||
//           roleState.description.trim() === '' ||
//           addAccess.some((access) => access.pages === '')
//         ) {
//           message.error('Please fill all fields');
//           return;
//         }
      
//         if (
//           !/^[a-zA-Z ]*$/.test(roleState.newRoleName) ||
//           !/^[a-zA-Z ]*$/.test(roleState.description)
//         ) {
//           message.error('Invalid characters in Role Name or Description');
//           return;
//         }
      
//         dispatch(
//           RoleAdd({
//             role_name: roleState.newRoleName,
//             role_desc: roleState.description,
//             role_handling_pages: addAccess,
//             role_start_date: moment(roleState.startDate).format('YYYY-MM-DD'),
//             role_end_date: moment(roleState.endDate).format('YYYY-MM-DD'),
//             role_status: roleState.isActive,
//           })
//         ).then((response) => {
//           success();
//         });
//       };
      

//     const handleChange = (e) => {
//         setRoleState({ ...roleState, [e.target.name]: e.target.value })
//     }

//     const onChange = (checked) => {
//         setRoleState({ ...roleState, isActive: checked })
//     }

//     return (
//         <div>
//             <div className='NewRole-Container'>
//                 <Form
//                     name="basic"
//                     autoComplete="off"
//                     layout='vertical'
//                     className='NewRole-Form-Container'
//                     style={{ fontFamily: "Nunito" }}
//                 >
//                     <Row gutter={[0, 0]}>
//                         <div className='flex-twocontainer'>
//                             <div className='flex-frstcontainer'>
//                                 <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
//                                     <Form.Item

//                                         label="Role Name"
//                                         name="newRoleName"
//                                         // initialValue={newRoleName}

//                                         rules={[{ required: true, message: 'Enter Your Role Name' },
//                                         { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' },
//                                         { pattern: /(.*[a-z]){1}/, message: 'Field must atleast 3 character' }
//                                         ]}
//                                     >

//                                         <Input name='newRoleName' className='rolename-inputfeild' placeholder='Enter Your Role Name' onChange={handleChange} />
//                                     </Form.Item>
//                                 </Col>
//                             </div>
//                             <div className='flex-thrdcontainer'>
//                                 <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} style={{ right: '9rem' }}>
//                                     <Form.Item
//                                         label="Active"
//                                         name="Active"
//                                     >
//                                         <Switch  onChange={onChange} />
//                                     </Form.Item>
//                                 </Col>
//                             </div>
//                         </div>
//                         <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
//                             <Form.Item
//                                 className="reg-lbl"
//                                 label="Description"
//                                 name="description"
//                                 // initialValue={description}
//                                 rules={[{ required: true, message: 'Enter Your Description ' }, { pattern: /(.*[a-z]){3}/, message: 'Field must atleast 3 character' }, { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }]}
//                             >
//                                 <Input name="description" className='newrole-input-feild' placeholder='Enter Your Description' onChange={handleChange} />
//                             </Form.Item>
//                         </Col>
//                         <Form.Item
//                             name="handling pages"
//                             label="Handling pages"
//                             layout='horizontal'
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please fill your Handling pages',

//                                 },
//                             ]}
//                         >
//                             <div className='pageBorder'>
//                                 {addAccess.map((val, index) => {
//                                     console.log(val)
//                                     return (
//                                         <>
//                                             <Row gutter={[8, 16]}>
//                                                 <Col className='gutter-row' span={10} style={{ margin: '7px 0 0 10px' }} >
//                                                     <Select
//                                                         style={{
//                                                             width: '100%',
//                                                         }}
//                                                         placeholder="select one pages"
//                                                         onChange={(e) => { handlePage(e, index) }}
//                                                     >
//                                                         {pageData.map((item, key) => {
//                                                             console.log(item)
//                                                             return (
//                                                                 <Option value={item.page_name} key={key}>
//                                                                     <div className="demo-option-label-item" >
//                                                                         {item.page_name}
//                                                                     </div>
//                                                                 </Option>
//                                                             )
//                                                         })}
//                                                     </Select>
//                                                 </Col>
//                                                 <Col className='gutter-row' span={8} style={{ margin: '10px 0', }}  >
//                                                     <Checkbox name='read' onChange={(e) => { onCheckbox(e, index) }} value={val.read} checked={val.read} style={{ margin: '0px 0 0 9px', }} >Read</Checkbox>
//                                                     <Checkbox name='write' onChange={(e) => { onCheckboxWrite(e, index) }} value={val.write} >Write</Checkbox>

//                                                 </Col>
//                                                 <Col className='gutter-row' span={4} style={{ margin: '7px 0 0 0px', padding: '0', display: 'flex', }} >
//                                                     {addAccess.length - 1 === index && <Button type="text" icon={<PlusOutlined />} style={{ border: 'solid 1px blue', backgroundColor: '#0c50a3', color: '#fff', marginRight: '5px' }} onClick={addPageAccess} />}
//                                                     {addAccess.length !== 1 && <Button type="text" icon={<MinusOutlined />} style={{ border: 'solid 1px blue', backgroundColor: '#0c50a3', color: '#fff', }} onClick={removePageAccess} />}
//                                                 </Col>

//                                             </Row>
//                                         </>
//                                     )
//                                 })}
//                             </div>
//                         </Form.Item>

//                         <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
//                             <Form.Item
//                                 className="reg-lbl"
//                                 label="Start Date - End Date"
//                                 name="StartDatetoEndDate"
//                                 // initialValue={dates}
//                                 rules={[{ required: true, message: 'Enter Your Date' },

//                                 ]}
//                             >
//                                 <RangePicker className='newrole-input-feild' disabled={[true, false]} onCalendarChange={(value) => {
//                                     setRoleState({ ...roleState, startDate: value[0], endDate: value[1] });
//                                 }}

//                                 // value={dates}
//                                 />
//                             </Form.Item>
//                         </Col>
//                         <div className='newrole-btn-cont'>
//                             <Button htmlType='submit' type='primary' className='newroleAdd-create-btn' onClick={createRole}>Create</Button>
//                         </div>
//                     </Row>
//                 </Form>
//             </div>
//         </div>
//     )

// }
// export default RoleAddModel

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './RoleAdd.css';
import {
  RoleAdd,
  PageUrlGet
} from '../../../../../redux/reducer/settings/RoleReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
  Form,
  Row,
  Col,
  DatePicker,
  Checkbox,
  Switch,
  message,
  Select,
  Modal
} from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

function RoleAddModel() {
  const { Option } = Select;
  const [read, setRead] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';
  const pageData = useSelector((state) => state.Role.PageUrlDataGet);

  useEffect(() => {
    dispatch(PageUrlGet(true));
  }, []);

  const [roleState, setRoleState] = useState({
    newRoleName: '',
    description: '',
    isActive: true,
    startDate: '',
    endDate: ''
  });
  const [addAccess, setAddAccess] = useState([
    { pages: '', read: false, write: false, page_id: 0 }
  ]);

  const addPageAccess = () => {
    setAddAccess([...addAccess, { pages: '', read: false, write: false, page_id: 0 }]);
  };

  const removePageAccess = (index) => {
    const pageList = [...addAccess];
    pageList.splice(index, 1);
    setAddAccess(pageList);
  };

  const onCheckbox = (e, index) => {
    const { name, checked } = e.target;
    const pageList = [...addAccess];
    pageList[index][name] = checked;
    setAddAccess(pageList);
  };

  const onCheckboxWrite = (e, index) => {
    const { name, checked } = e.target;
    const pageList = [...addAccess];
    pageList[index][name] = checked;
    if (checked === true) {
      pageList[index]['read'] = checked;
      pageList[index]['write'] = checked;
      setRead(checked);
    } else {
      pageList[index]['write'] = checked;
    }
    setAddAccess(pageList);
  };

  const handlePage = (e, index) => {
    const pageList = [...addAccess];
    pageList[index]['pages'] = e;
    setAddAccess(pageList);
    pageData.forEach((values) => {
      if (values.page_name === e) {
        const pageListId = [...addAccess];
        pageListId[index]['page_id'] = values.id;
        setAddAccess(pageListId);
      }
    });
  };

  const key = 'updatable';
  const success = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({
        content: 'Created Success Fully!',
        key,
        duration: 2
      });
    }, 1000);
  };

  const createRole = async () => {
    if (
      roleState.newRoleName.trim() === '' ||
      roleState.description.trim() === '' ||
      addAccess.some((access) => access.pages === '')
    ) {
      message.error('Please fill all fields');
      return;
    }

    if (
      !/^[a-zA-Z ]*$/.test(roleState.newRoleName) ||
      !/^[a-zA-Z ]*$/.test(roleState.description)
    ) {
      message.error('Invalid characters in Role Name or Description');
      return;
    }

    dispatch(
      RoleAdd({
        role_name: roleState.newRoleName,
        role_desc: roleState.description,
        role_handling_pages: addAccess,
        role_start_date: moment(roleState.startDate).format('YYYY-MM-DD'),
        role_end_date: moment(roleState.endDate).format('YYYY-MM-DD'),
        role_status: roleState.isActive
      })
    ).then((response) => {
      success();
      hidePopup(); // Hide the modal after successful submission
    });
  };

  const handleChange = (e) => {
    setRoleState({ ...roleState, [e.target.name]: e.target.value });
  };

  const onChange = (checked) => {
    setRoleState({ ...roleState, isActive: checked });
  };

  return (
    <div>
      <div className='NewRole-Container'>
        <Form
          name='basic'
          autoComplete='off'
          layout='vertical'
          className='NewRole-Form-Container'
          style={{ fontFamily: 'Nunito' }}
        >
          <Row gutter={[0, 0]}>
            <div className='flex-twocontainer'>
              <div className='flex-frstcontainer'>
                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                  <Form.Item
                    label='Role Name'
                    name='newRoleName'
                    rules={[
                      { required: true, message: 'Enter Your Role Name' },
                      { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' },
                      { pattern: /(.*[a-z]){1}/, message: 'Field must have at least 3 characters' }
                    ]}
                  >
                    <Input name='newRoleName' className='rolename-inputfeild' placeholder='Enter Your Role Name' onChange={handleChange} />
                  </Form.Item>
                </Col>
              </div>
              <div className='flex-thrdcontainer'>
                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }} style={{ right: '9rem' }}>
                  <Form.Item
                    label='Active'
                    name='Active'
                  >
                    <Switch onChange={onChange} />
                  </Form.Item>
                </Col>
              </div>
            </div>
            <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
              <Form.Item
                className='reg-lbl'
                label='Description'
                name='description'
                rules={[
                  { required: true, message: 'Enter Your Description' },
                  { pattern: /(.*[a-z]){3}/, message: 'Field must have at least 3 characters' },
                  { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
                ]}
              >
                <Input name='description' className='newrole-input-feild' placeholder='Enter Your Description' onChange={handleChange} />
              </Form.Item>
            </Col>
            <Modal visible={isPopupVisible} onCancel={hidePopup} footer={null} width={650} maskClosable={false}>
              <Form.Item
                name='handling pages'
                label='Handling pages'
                layout='horizontal'
                rules={[
                  {
                    required: true,
                    message: 'Please fill in your Handling pages'
                  }
                ]}
              >
                <div className='pageBorder'>
                  {addAccess.map((val, index) => {
                    // console.log(val);
                    return (
                      <React.Fragment key={index}>
                        <Row gutter={[8, 16]}>
                          <Col className='gutter-row' span={10} style={{ margin: '7px 0 0 10px' }}>
                            <Select
                              style={{
                                width: '100%'
                              }}
                              placeholder='Select a page'
                              onChange={(e) => { handlePage(e, index); }}
                            >
                              {pageData.map((item, key) => {
                                console.log(item);
                                return (
                                  <Option value={item.page_name} key={key}>
                                    <div className='demo-option-label-item'>
                                      {item.page_name}
                                    </div>
                                  </Option>
                                );
                              })}
                            </Select>
                          </Col>
                          <Col className='gutter-row' span={8} style={{ margin: '10px 0' }}>
                            <Checkbox name='read' onChange={(e) => { onCheckbox(e, index); }} value={val.read} checked={val.read} style={{ margin: '0px 0 0 9px' }}>Read</Checkbox>
                            <Checkbox name='write' onChange={(e) => { onCheckboxWrite(e, index); }} value={val.write}>Write</Checkbox>
                          </Col>
                          <Col className='gutter-row' span={4} style={{ margin: '7px 0 0 0px', padding: '0', display: 'flex' }}>
                            {addAccess.length - 1 === index && <Button type='text' icon={<PlusOutlined />} style={{ border: 'solid 1px blue', backgroundColor: '#0c50a3', color: '#fff', marginRight: '5px' }} onClick={addPageAccess} />}
                            {addAccess.length !== 1 && <Button type='text' icon={<MinusOutlined />} style={{ border: 'solid 1px blue', backgroundColor: '#0c50a3', color: '#fff' }} onClick={removePageAccess} />}
                          </Col>
                        </Row>
                      </React.Fragment>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <Button onClick={hidePopup} style={{ marginRight: '10px' }}>Cancel</Button>
                  <Button type='primary' onClick={createRole}>Create</Button>
                </div>
              </Form.Item>
            </Modal>

            <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
              <Form.Item
                className='reg-lbl'
                label='Start Date - End Date'
                name='StartDatetoEndDate'
                rules={[{ required: true, message: 'Enter Your Date' }]}
              >
                <RangePicker
                  className='newrole-input-feild'
                  disabled={[true, false]}
                  format={dateFormat}
                  placeholder={['Start Date', 'End Date']}
                  onChange={(dates, dateStrings) => {
                    setRoleState({ ...roleState, startDate: dateStrings[0], endDate: dateStrings[1] });
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}></Col>
          </Row>
          <Row>
            <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
              <div className='NewRole-Button-Container'>
                <Button type='primary' className='NewRole-Button' onClick={showPopup}>
                  Handling Pages
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default RoleAddModel;
