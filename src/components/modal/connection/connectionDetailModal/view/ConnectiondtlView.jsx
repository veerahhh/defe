import React, { useState } from 'react'
import { Input, Form, Row, Col, DatePicker, Switch } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux'
const { RangePicker } = DatePicker;

export default function ConnectiondtlView() {

    const dateFormat = 'YYYY-MM-DD';
    const [newdates, setNewDates] = useState([])

    const ConnData = useSelector((state) => state.Connection.Data)
    const upadateConnectiondtl = useSelector((state) => state.ConnectionDetail.getConnectiondtlOneData)

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

    return (
        <>
            {upadateConnectiondtl.map((values, key) => {

                return (
                    <div className='NewConn-Container'>
                        <Form
                            name="basic"
                            autoComplete="off"
                            layout='vertical'
                            className='conndlts-Form_Container'
                            key={values.id}
                            disabled
                            style={{ fontFamily: "Nunito" }}
                        >
                            <Row gutter={[16, 0]}>

                                <Col lg={{ span: 14, offset: 0 }}>
                                    <Form.Item
                                        className="reg-lbl"
                                        label="Connection Name"
                                        name="ConnectionName"
                                        initialValue={Connectionname(values.connection_id)}
                                    >
                                        <Input style={{ textTransform: 'capitalize' }} className='newCon-input-feild' disabled placeholder='Enter Your Connection Name' value={values.connection_name} />
                                    </Form.Item>
                                </Col>

                                <Col lg={{ span: 5, offset: 4 }}>
                                    <Form.Item
                                        className="reg-lbl"
                                        label="Status"
                                        name="Status"
                                    >
                                        <Switch disabled={true} checked={values.is_active === true ? true : false} />
                                    </Form.Item>
                                </Col>



                                <Col lg={{ span: 14, offset: 0 }}>
                                    <Form.Item
                                        className="reg-lbl"
                                        label="Connection Detail"
                                        name="Connectiondetail"
                                        initialValue={values.connection_detail}
                                        rules={[{ required: true, message: 'Enter Your Connection Details Name ' },
                                        { pattern: /^[a-zA-Z]+$/, message: 'Enter The Characters' }
                                        ]}
                                    >
                                        <Input style={{ textTransform: 'capitalize' }} className='newCon-input-feild' placeholder='Enter Your Connection Details Name' value={values.connection_detail} />
                                    </Form.Item>
                                </Col>
                                <Col lg={{ span: 14, offset: 0 }}>
                                    <Form.Item
                                        // className="reg-lbl"
                                        label="Start Date to End Date"
                                        name="StartDatetoEndDate"
                                        initialValue={[moment(values.start_date, dateFormat), moment(values.end_date, dateFormat)]}
                                        rules={[{ required: true, message: 'Enter Your Date' },
                                        ]}
                                    >
                                        <RangePicker style={{ width: "100%" }}
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
                                            <div style={{display:"flex",gap:"100px",marginLeft:"70px"}}>
                                            <label>Key Parameter</label>      
                                            <label style={{ marginLeft: "24px" }}>Key Value</label>   
                                            </div>
                                                {Object.entries(values.con_str).map(([key, values]) =>
                                                    <>
                                                        <div className='accordian' >

                                                            <div>
                                                                <input  style={{textTransform:'capitalize'}}disabled className='key-inputfld' name='keyParams' defaultValue={key} />
                                                            </div>
                                                            <div>                                                               
                                                                <input style={{textTransform:'capitalize'}} disabled className='key-inputfld' name='keyValues' defaultValue={values} />
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                                }
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

                                                    {Object.entries(values.con_str).map(([key, values]) => {
                                                        console.log(key);
                                                        return (
                                                            <tr className='tr'>
                                                                {/* <td className='td'>{key + 1}</td> */}
                                                                <td className='td'>{key}</td>
                                                                <td className='td'>{values}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </Form.Item>
                                </Col>

                            </Row>
                        </Form>
                    </div>
                )
            })}
        </>
    )
}
