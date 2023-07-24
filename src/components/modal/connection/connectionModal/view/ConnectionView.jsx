import React, { useState, useEffect } from 'react'
import { DatePicker, Form, Switch } from 'antd';
import { useParams } from 'react-router-dom';
import { Upload, Col, Input, Row } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'

function ConnectionView() {

  const [newdates, setNewDates] = useState([])

  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';

  const upadateConnection = useSelector((state) => state.Connection.getOneData)

  return (
    <div >
      {upadateConnection.map((values, key) => {
        return (
          <Form
            name="basic"
            autoComplete="off"
            layout='vertical'
            className='conn-Form-Container'
            key={values.id}
            style={{fontFamily: 'Nunito'}}
          >
            <Row gutter={[16, 0]}>

              
                    <Col  lg={{ span: 12, offset: 0 }}>
                      <Form.Item
                        className="reg-lbl"
                        label="Connection Name"
                        name="ConnectionName"

                      >
                        <Input  style={{textTransform:'capitalize'}} className='newCon-input-feild' disabled placeholder='Enter Your Connection Name' defaultValue={values.connection_name} />
                      </Form.Item>
                    </Col>
                
                    <Col  lg={{ span: 5, offset: 4 }}>
                      <Form.Item
                        className="reg-lbl"
                        label="Status"
                        name="Status"
                      >
                        <Switch disabled={true} checked={values.is_active === true ? true : false} />
                      </Form.Item>
                    </Col>
                 
               

                <Col lg={{ span: 24, offset: 0 }}>
                  <Form.Item
                    className="reg-lbl"
                    label="Description"
                    name="Description"
                    initialValue={values.description}
                    rules={[{ required: true, message: 'Enter Your Description ' },
                    { pattern: /^[a-zA-Z]+$/, message: 'Enter The Characters' }
                    ]}
                  >

                    <Input  style={{textTransform:'capitalize'}} className='newCon-input-feild' disabled placeholder='Enter Your Description' value={values.description} />
                  </Form.Item>
                </Col>
                <Col  lg={{ span: 24, offset: 0 }}>

                  <Form.Item
                    className="reg-lbl"
                    label="Start Date - End Date"
                    name="StartDatetoEndDate"
                    initialValue={[moment(values.start_date, dateFormat), moment(values.end_date, dateFormat)]}
                    rules={[{ required: true, message: 'Enter Your Date' },
                    ]}
                  >
                    <RangePicker style={{width:"100%",}}   
                      disabled
                      onCalendarChange={(value) => {
                        console.log(value);
                        setNewDates([value[0], value[1]]);
                      }}
                      value={newdates}
                    />
                  </Form.Item>

                </Col>
                {/* <div className='flex-twocontainer'>
                  <div className='flex-frstcontainer'>
                <Col  lg={{ span: 24, offset: 0 }}>
                  <Form.Item
                    className="reg-lb"
                    label="Connection String Params"
                    name="Connection String Params"
                    rules={[{ required: true, message: 'Enter Your Connection Name' }, { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
                    ]}
                  >
                    <div className='conn-accordian-cont'  >
                    <label style={{marginLeft:"20px"}}>Key Parameter </label>
                      {values.key_param.map((values, index) =>
                        <div className='flex-twocontainer'>
                          <div className='conn-accordian' >
                            
                              <input className='key-inputfld' disabled name='keyParams' style={{textTransform:"capitalize"}} key={index} defaultValue={values.keyPrams} />
                         
                          </div>
                        </div>
                      )}
                    </div>
                  </Form.Item>
                </Col>
                </div>
                  <div className='flex-sectcontainer'>
                <Col lg={{ span: 24, offset: 0 }}>
                  <Form.Item
                    className="reg-lb"
                    label="Data Types"
                    name="Data Types"
                    rules={[{ required: true, message: 'Enter Your Data Types' }, { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
                    ]}
                  >
                    <div className='conn-accordian-cont'>
                    <label style={{marginLeft:"20px"}}>Data Types </label>
                      {values.d_type.map((values, index) =>
                        <div className='flex-twocontainer'>
                          <div className='conn-accordian'>
                           
                              <input className='key-inputfld' disabled name='keyParams' style={{textTransform:"capitalize"}} key={index} defaultValue={values.datatypes}  />
                      
                          </div>
                        </div>
                      )}
                    </div>                    
                  </Form.Item>
                </Col>
              </div>
              </div> */}
             <div className='overallConTab' disabled>
                <table className='table'>
                  <thead>
                    <tr className='tr'>
                      <th className='th'>S.No</th>
                      <th className='th'>Key Parameter</th>
                      <th className='th'> Data Types</th>


                    </tr>
                  </thead>
                  <tbody>

                    {values.key_param.map((val, index) => {
                      console.log(val);
                      return (
                        <tr key={index} className='tr'>
                          <td className='td'>{index + 1}</td>
                          <td className='td'>{val.keyPrams}</td>
                          <td className='td'>{values.d_type[index]?.datatypes}</td>
                        </tr>
                      );
                    })}






                  </tbody>
                </table>
              </div>
            </Row>
          </Form>
        )
      })}
    </div>
  )
}

export default ConnectionView