import React, { useState, useEffect,useRef } from 'react'
import { Button, Input, Form, Row, Col, DatePicker, Switch,Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import axios from 'axios';
import { connectionDetailPutId } from '../../../../../redux/reducer/connection/ConnectionDetailReducer';
const { RangePicker } = DatePicker;

export default function ConnectiondtlEdit() {

    const connectiondtldata = useSelector((state) => state.ConnectionDetail.getConnectiondtlOneData)
    const dispatch = useDispatch()
    const dateFormat = 'YYYY-MM-DD';
    const [isActive, setIsActive] = useState()
    const [newdates, setNewDates] = useState([])
    const [connString, setConnString] = useState({})
    const [user, setUser] = useState([{ convertDType: "" }])
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false);
    let btnRef = useRef();

    useEffect(() => {
        if (connectiondtldata[0]?.con_str) {
            setConnString(connectiondtldata[0]?.con_str)
        }
    }, [connectiondtldata])

    const ConnData = useSelector((state) => state.Connection.Data)
    console.log(ConnData)

    const UpdateConnection = (e) => {
        dispatch(connectionDetailPutId({
            logo_name: "newlogoname",
            con_str: connString,
            start_date: moment(newdates[0]).format('YYYY-MM-DD'),
            end_date: moment(newdates[1]).format('YYYY-MM-DD'),
            is_active: isActive
        }))
        setConnString({})
    }

    const Connectionname = (e) => {
        const conname = []
        ConnData.map((value) => {
            if (e === (value.id)) {
                conname.push(value.connection_name)
            }
        }
        )
        return conname
    }
    const Connectionparams = (e) => {
        const conname = []
        ConnData.map((value) => {
            conname.push(value.con_str)
        }
        )
        return setConnString(conname)
    }
    const onChange = (checked) => {
        setIsActive(checked)
    };

    const EditValues = (e, key) => {
        const new_obj = { ...connString, [key]: e.target.value }
        return setConnString(new_obj)
    }
console.log(connString)

    function togg() {
        // if (btnRef.current) {
        setLoading(true);
        btnRef.current?.setAttribute("loading", true); // set loading attribute
        axios.post(`${URL}/test_con/`, {
            // connection_id: newconnname,
            con_str: {
                user: connString[0].keyValues,
                password: connString[1].keyValues,
                account: connString[2].keyValues,
                warehouse: connString[3].keyValues,
                database: connString[4].keyValues,
                schema: connString[5].keyValues,
                role: connString[6].keyValues,
            }
        }).then((response) => {
            console.log(response.data)
            if (response.data.false) {
                Modal.error({
                    title: 'Error',
                    content: response.data.false,
                    onOk: () => {

                        setLoading(false); // set loading to false here
                    },
                });
            }
            else {
                Modal.success({
                    title: 'Success',
                    content: response.data.true,
                    onOk: () => {
                        setToggle(!toggle);
                        btnRef.current?.setAttribute("disabled", "disabled");
                        setLoading(false);
                    },
                });
            }
        }).catch((error) => {
            setTimeout(() => {
                setLoading(false);
                Modal.error({
                    title: 'Error',
                    content: 'Connection failed',
                });
            }, 1000);
        });
    }
    return (
        <>
            <div className='NewConn-Container'>
                {connectiondtldata.map((values, key) => {
                    console.log(values)
                    return (
                        <Form
                            name="basic"
                            autoComplete="off"
                            layout='vertical'
                            className='conndlts-Form_Container'
                            key={values.id}
                        // style={{fontFamily:'Nunito'}}
                        >
                            <Row gutter={[0, 0]}>

                                <Col lg={{ span: 15, offset: 0 }}>
                                    <Form.Item
                                        className="reg-lbl"
                                        label="Connection Name"
                                        name="ConnectionName"
                                        initialValue={Connectionname(values.connection_id)}

                                    >
                                        <Input style={{ textTransform: 'capitalize' }} className='newCon-input-feild' disabled placeholder='Enter Your Connection Name' value={values.connection_name} />
                                    </Form.Item>
                                </Col>

                                <Col lg={{ span: 5, offset: 3 }}>
                                    <Form.Item
                                        className="reg-lbl"
                                        label="Status"
                                        name="Status"
                                    >
                                        <Switch defaultChecked={values.is_active} onChange={onChange} />
                                    </Form.Item>
                                </Col>


                                <Col lg={{ span: 15, offset: 0 }}>
                                    <Form.Item
                                        className="reg-lbl"
                                        label="Connection Detail"
                                        name="Connectiondetail"
                                        initialValue={values.connection_detail}

                                    >
                                        <Input style={{ textTransform: 'capitalize' }} className='newCon-input-feild' disabled placeholder='Enter Your Connection Details Name' value={values.connection_detail} />
                                    </Form.Item>
                                </Col>
                                <Col lg={{ span: 15, offset: 0 }}>
                                    <Form.Item
                                        className="reg-lbl"
                                        label="Start Date to End Date"
                                        name="StartDatetoEndDate"
                                        initialValue={[moment(values.start_date, dateFormat), moment(values.end_date, dateFormat)]}
                                        rules={[{ required: true, message: 'Enter Your Date' },
                                        ]} 
                                    >
                                        <RangePicker style={{ width: "100%" }} className='newCon-input-feild' disabled={[true, false]}
                                            onCalendarChange={(value) => {
                                                setNewDates([(value[0]), value[1]]);
                                            }}
                                            value={newdates}
                                        />
                                    </Form.Item>

                                </Col>
                                <Col lg={{ span: 24, offset: 0 }}>
                                    <Form.Item
                                        className="reg-lbl-accordian"
                                        label="Connection String"
                                        name="Database"

                                        rules={[{ required: true, message: 'Enter Your Connection string' },
                                        ]}
                                    >

                                        {/* <div className='accordian-sec'>
                                            <div style={{ display: "flex", gap: "100px", marginLeft: "50px" }}>
                                                <label>Key Parameter</label>
                                                <label >Key Value</label>
                                            </div>
                                            {Object.entries(values.con_str).map(([key, values]) =>
                                                <div className='accordian' >
                                                    <div style={{ marginBottom: "40px" }}>

                                                        <input style={{ textTransform: 'capitalize' }} disabled className='key-inputfld' name='keyParams' defaultValue={key} />
                                                    </div>
                                                    <div>

                                                        <input style={{ textTransform: 'capitalize' }}  className='key-inputfld' name='keyValues' defaultValue={values} onChange={(e) => { EditValues(e, key) }} />
                                                    </div>
                                                </div>
                                            )}

                                        </div> */}

                                        <div className='overallConTab'>
                                            <table className='table'>
                                                <thead>
                                                    <tr className='tr'>
                                                     
                                                        <th className='th'>Key Parameter</th>
                                                        <th className='th'>Key Value</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.entries(values.con_str).map(([key, values]) => {
                                                        console.log(key);
                                                        return (
                                                            <tr className='tr'>  
                                                                <td className='td' disabled name='keyParams'>{key}</td>

                                                                <td className='td' style={{display:'flex',justifyContent:"center", alignItems:'center'}} name='keyValues' onChange={(e) => { EditValues(e, key) }}>
                                                                   <input style={{padding:'5px',width:"330px", border:"none"}} defaultValue={values}/>
                                                                    </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                    </Form.Item>
                                    <div style={{ marginTop: "10px" }} className='newconnDtlEdit-btn'>
                                    {/* <Button htmlType='submit' type='primary'  >Test Connection Edit</Button>
                                        <Button htmlType='submit' type='primary'  onClick={UpdateConnection}>Update</Button> */}

                                             <Button htmlType='submit' type='primary' ref={btnRef} loading={loading} className={toggle === false ? 'newconndtl-create-btn' : 'newconndtl-TestValid-btn1'} onClick={togg}>Test Connection</Button>
                                           {toggle == true && (
                                           <Button htmlType='submit' type='primary' className='newconndtl-create' onClick={UpdateConnection}>Create</Button>
                                         )}

                                    </div>
                                </Col>


                            </Row>
                        </Form>
                    )
                })}

            </div>
        </>
    )
}
