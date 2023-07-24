import React, { useState, useEffect, useRef } from 'react'
import { Button, Input, Form, Row, Col, DatePicker, Switch, AutoComplete, message, Modal } from 'antd';
import { AiOutlineClose } from 'react-icons/ai';
// import Aws from '../../Logoimg/Snowflake.png'
import '../../Connpopup.css'
import axios from 'axios';
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import { connectionDetailAdd } from '../../../../../redux/reducer/connection/ConnectionDetailReducer';

export default function ConnectiondtlAdd() {
    let URL = process.env.REACT_APP_URL
    const dispatch = useDispatch()
    const { RangePicker } = DatePicker;
    const [newconnname, setNewConnname] = useState('')
    const [condtlsname, setCondtlsname] = useState('')
    const [logoname, setLogoname] = useState('')
    const [preview, setPreview] = useState(null);
    const [dates, setDates] = useState([])
    const [isActive, setIsActive] = useState(true)
    const [conNamelist, setConNamelist] = useState([])
    const [keyPrams, setKeyParams] = useState([])
    const [openNewConn, setOpenNewConn] = useState(false)
    const [connStrings, setconnStrings] = useState([{ keyValues: "" }])
    const [errConnStr, setErrConnStr] = useState(false)
    const [previewtxt, setPreviewtxt] = useState(true)
    const [toggle, setToggle] = useState(false)
    const[alt,setAlt]=useState("")
    let btnRef = useRef();
    const errstr = []

    const upadateConnection = useSelector((state) => state.Connection.getOneData)
    const ConnectionnamelistData = useSelector((state) => state.Connection.Data)
    const [connid, setConId] = useState()
    const [loading, setLoading] = useState(false);

    const Previouspage = () => {
        setOpenNewConn(false)
        setKeyParams([])
        setConNamelist([])
        setToggle(false)
        setLoading(false);
    }

    // const connectionId = newconnname;  
    // let conStrData;
    // if (connectionId === 'Snowflake.png') {
    //   conStrData = {
    //     user: connStrings[0].keyValues,
    //     password: connStrings[1].keyValues,
    //     account: connStrings[2].keyValues,
    //     warehouse: connStrings[3].keyValues,
    //     database: connStrings[4].keyValues,
    //     schema: connStrings[5].keyValues,
    //     role: connStrings[6].keyValues,
    //   };
    // } else if (connectionId === 'sql') {
    //   conStrData = {
     
    //     server: connStrings[0].keyValues,
    //     driver: connStrings[1].keyValues,
    //     port:connStrings[2].keyValues,
    //     username:connStrings[3].keyValues,
    //     password: connStrings[4].keyValues,
    //     database:connStrings[0].keyValues,
    
    //   };
    // }
  
    function togg() {
        setLoading(true);
        btnRef.current?.setAttribute("loading", true); 
        if(alt=='Snowflake.png'){
            // console.log('1')
            axios.post(`${URL}/test_con/`, {
                connection_id: newconnname,
                con_str: {
                    user: connStrings[0].keyValues,
                    password: connStrings[1].keyValues,
                    account: connStrings[2].keyValues,
                    warehouse: connStrings[3].keyValues,
                    database: connStrings[4].keyValues,
                    schema: connStrings[5].keyValues,
                    role: connStrings[6].keyValues,
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
            
        } else if(alt=='Oracle.png'){
            // console.log('orac')
            axios.post(`${URL}/test_con/`, {
                connection_id: newconnname, 
                con_str: {
                    user: connStrings[0].keyValues,
                    password: connStrings[1].keyValues,
                    database:connStrings[2].keyValues,
                    host: connStrings[3].keyValues,
                    port: connStrings[4].keyValues,
                    }
                
            }).then((response) => {
                console.log(response.data)
                if (response.data.false) {
                    Modal.error({
                        title: 'Oracle ',
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
                        title: 'Oracle Error',
                        content: 'Connection failed',
                    });
                }, 1000);
            });
        }
        
        
        else if(alt==='Other.jpg'){
            // console.log('3')
            axios.post(`${URL}/test_con/`, {
                connection_id: newconnname,
                con_str: {
                    username: connStrings[4].keyValues,
                    password: connStrings[5].keyValues,
                    driver: connStrings[0].keyValues,
                    port: connStrings[2].keyValues,
                    database: connStrings[3].keyValues,
                    server: connStrings[1].keyValues,
                    // role: connStrings[6].keyValues,
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
       
    }
    
    const CreateConnectionDetail = async (e) => {
        const pair = keyPrams.map((item, index) => {
            console.log(index, item)
            return ({ [item.keyPrams]: connStrings[index].keyValues })
        })
        console.log(pair)
        let finalObj = {};
        for (let i = 0; i < pair.length; i++) {
            Object.assign(finalObj, pair[i]);
        }
        console.log(finalObj)
        ConnstrError()
        // && errConnStr==false
        console.log(keyPrams.length)
        if (/^[a-zA-Z ]*$/.test(condtlsname)) {
            dispatch(connectionDetailAdd({
                connection_id: newconnname,
                connection_detail: condtlsname,
                con_str: finalObj,
                end_date: moment(dates[1]).format('YYYY-MM-DD'),
                is_active: isActive,
                tenant_id: JSON.parse(sessionStorage.getItem("id")),


            }))
        }
        // else {
        //     alert("Please Fill Input Fields")
        // }
    }


    const ConnstrError = () => {
        if (keyPrams.length > errConnStr)
            setErrConnStr(true)
    }

    const openConnectionDetailPopup = (val) => {
        ConnectionNamesList(val.target.alt)
        setAlt(val.target.alt)
        setLogoname(val.target.alt)
        setPreview(val.target.currentSrc)
        setOpenNewConn(true)
        setPreviewtxt(true)

    }
// console.log(alt)
    function onSelect(value) {
        const id = ConnectionnamelistData.map((values, key) => {
            if (value === values.connection_name) {
                values.key_param.map((values, index) => {
                    keyPrams.push(values)
                    setPreviewtxt(false)
                })
                return setNewConnname(values.id)
            }
        }
        )
    }


    const ConnectionNamesList = (e) => {
        const logo = e
        const name = ConnectionnamelistData.map((values, key) => {
            if (logo === values.logo_name) {
                setConId(values.id)
                return conNamelist.push({ value: values.connection_name })
            }
        }
        )

    }

    function importAll(r) {
        const imagelist = [];
        r.keys().map((item, index) => { imagelist[item.replace('./', '')] = r(item); });
        return imagelist;
    }

    const images = importAll(require.context('../../Logoimg', false, /\.(png|jpe?g|svg)$/));

    const [disable, setdisable] = useState(false)

    const SetKeyvalue = (err) => {
        errstr.push(err)
        setconnStrings([...connStrings, { keyValues: "" }]);
        console.log(connStrings)
    }
    const RemoveConnString = index => {
        const connstrglist = [...connStrings];
        connstrglist.splice(index, 1);
        setconnStrings(connstrglist);
    };
    const handleKeyValues = (e, index) => {
        const { name, value } = e.target;
        const connstrglist = [...connStrings];
        connstrglist[index][name] = value
        setconnStrings(connstrglist)
    }
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setIsActive(checked)
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day')
    };


  
    return (
        <>
            <div className='NewConn-Container'>
                {!openNewConn &&
                    <>
                        <p style={{ textAlign: "center", fontFamily: 'Nunito' }}>Please Select the Connection</p>
                        <div className='Connimg-Container' style={{ height: "400px", fontFamily: 'Nunito' }} >
                            {Object.entries(images).map(([key, values]) => {
                                { console.log(key) }
                                return (
                                    <div>
                                        <img style={{ width: 120, fontFamily: 'Nunito', height: 90, padding: "20px", cursor: 'pointer' }} alt={key} onClick={openConnectionDetailPopup} src={values} />
                                        <p>{key}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </>}
                {openNewConn && <div>

                    <Form
                        name="basic"
                        autoComplete="off"
                        layout='vertical'
                        // className='conndlts-Form_Container'
                        style={{ fontFamily: 'Nunito' }}
                    >
                        <Row gutter={[0, 0]} className='conndlts-Form_Container'>
                          
                            <Col lg={{ span: 14, offset: 0 }}>
                                <Form.Item
                                    className="reg-lbl"
                                    label="Connection Name"
                                    name="ConnectionName"
                                    rules={[{ required: true, message: 'Enter Your Connection Name' },
                                    ]}
                                >
                                    <AutoComplete
                                     

                                        className='newCon-input-feild'
                                        options={conNamelist}
                                        onSelect={onSelect}
                                        placeholder="Enter Your Connection Name"
                                    />
                                </Form.Item>
                            </Col>
                         
                            <Col lg={{ span: 5, offset: 3 }}>
                                <Form.Item
                                    className="reg-lbl"
                                    name="Database"
                                >
                                    <div className='dragdropimg'>
                                        <img className='uploadlogo' src={preview} alt={preview.name} />
                                    </div>
                                </Form.Item>

                            </Col>
                       
                        
                            <Col lg={{ span: 14, offset: 0 }}>
                                <Form.Item
                                    className="reg-lbl"
                                    label="Connection Detail Name"
                                    name="ConnectionDetailName"
                                    initialValue={condtlsname}

                                    rules={[{ required: true, message: 'Enter Your Connection Detail Name' },
                                    { pattern: /(.*[a-z]){3}/, message: 'Field must atleast 3 character' },
                                    { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
                                    ]}
                                >
                                    <Input style={{ textTransform: 'capitalize' }} className='newCon-input-feild' placeholder='Enter Your Connection Name' onChange={(e) => (setCondtlsname(e.target.value))} />
                                </Form.Item>
                            </Col>
                     
                            <Col lg={{ span: 14, offset: 0 }}>
                                <Form.Item
                                    // className="reg-lbl"
                                    label="Start Date to End Date"
                                    name="StartDatetoEndDate"
                                    initialValue={dates}
                                    rules={[{ required: true, message: 'Enter Your End Date' },

                                    ]}
                                >
                                    <RangePicker style={{ width: "100%" }} disabledDate={disabledDate} onCalendarChange={(value) => {
                                        console.log(value);
                                        setDates([value[0], value[1]]);
                                    }}
                                        value={dates}
                                    />
                                </Form.Item>
                            </Col>
                            <Col lg={{ span: 5, offset: 2 }}>
                                <Form.Item
                                    label="Active"
                                    name="Active"
                                // style={{ marginTop: "15px" }}
                                >
                                    <Switch defaultChecked onChange={onChange} />
                                </Form.Item>
                            </Col>
                            <Col lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    className="reg-lbl-accordian"
                                    label="Connection String"
                                    name="Database"
                                // rules={[{ required: true, message: 'Enter Your Connection string' },
                                // ]}
                                >

                                    {/* <div className='accordian-sec'>
                                       { previewtxt&& <p style={{marginTop:"60px"}}>Please select the connection name</p>}
                                           {!previewtxt&& ConnectionnamelistData.map((values) => {
                                                if (newconnname === values.id) return (
                                                    <div className='flex-twocontainers'>
                                                        
                                                        <div className='flex-frstcontainer'>
                                                        <label>Key Parameter </label>
                                                        <><br/>
                                                            {values.key_param.map((values, index) => { return (<input style={{ textAlign: "center", marginLeft: "5px", padding: "5px", marginTop: "20px" }} disabled name='keyParams' defaultValue={(values.keyPrams)} />) })}
                                                            </>
                                                        </div>
                                                        <div className='flex-sectcontainer'>
                                                            <label style={{ marginRight: "40px" }}>Key Value </label>
                                                            {connStrings.map((x, i) => {
                                                                return (
                                                                    <div key={i} style={{ textAlign: "center", marginTop: "20px", display: "flex" }}>
                                                                        <input style={{ textAlign: "center", marginLeft: "5px" , padding:"5px"}} placeholder="Enter the value" disabled={disable} name='keyValues' value={x.keyValues} onChange={(e) => { handleKeyValues(e, i) }} />
                                                                        <div className="addrmv-btn-cont">
                                                                            {connStrings.length - 1 === i && connStrings.length <= values.key_param.length-1 && <button style={{ marginLeft: "5px" }} onClick={SetKeyvalue(values.key_param.length)}>+</button>}
                                                                        </div>                                                                       
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                    )
                                            })}
                                            </div> */}
                                    <div className='overallConTab'>
                                        <table className='table'>
                                            <thead>
                                                <tr className='tr'>
                                                    {/* <th className='th'>S.No</th> */}
                                                    <th className='th'>Key Parameter</th>
                                                    <th className='th'>Key Value</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                            { previewtxt&& <p style={{marginTop:"60px", textAlign: "center"}}>Please select the connection name</p>}
                                           {!previewtxt&& ConnectionnamelistData.map((values) => {
                                                if (newconnname === values.id) return (
                                                    <tr  className='' style={{border:"1px solid transparent"}}>
                                                        <td disable>
                                                        {values.key_param.map((values, index) => { return (<input className='td' style={{ display:'flex',textAlign: "center",width:"330px",padding:'10px'}} disabled name='keyParams' defaultValue={(values.keyPrams)} />) })}
                                                        </td>
                                                        <td>
                                                        {connStrings.map((x, i) => {
                                                                return (
                                                                    <div key={i} style={{ textAlign: "center", display: "flex",marginRight:'-10px' }}>
                                                                        <input className='td' style={{ display:'flex',textAlign: "center",width:"250px", padding:"10px"}} placeholder="Enter the value" disabled={disable} name='keyValues' value={x.keyValues} onChange={(e) => { handleKeyValues(e, i) }} />
                                                                        <div className="addrmv-btn-cont">
                                                                            {connStrings.length - 1 === i && connStrings.length <= values.key_param.length-1 && <button style={{ marginLeft: "5px" }} onClick={SetKeyvalue(values.key_param.length)}>+</button>}
                                                                        </div>                                                                       
                                                                    </div>
                                                                )
                                                            })}
                                                        </td>
                                                    </tr>
                                               )
                                            })}
                                           
                                            </tbody>
                                        </table>
                                    </div>

                                    
                                </Form.Item>
                            </Col>
                         

                        </Row>
                        <div className='newconndtls-btn-cont'>
                            <Button type='primary' className='newconndtl-back-btn' onClick={Previouspage}>Back</Button>
                            <Button htmlType='submit' type='primary' ref={btnRef} loading={loading} className={toggle === false ? 'newconndtl-create-btn' : 'newconndtl-TestValid-btn1'} onClick={togg}>Test Connection</Button>
                            {toggle == true && (
                                <Button htmlType='submit' type='primary' className='newconndtl-create' onClick={CreateConnectionDetail}>Create</Button>
                            )}
                        </div>
                    </Form>
                </div>
                }
            </div>
        </>
    )
}
