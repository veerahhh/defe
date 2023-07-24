import React from 'react'
import './ConfigDataMapView.css'
import { Row, Button, Form, Input, Col, AutoComplete } from 'antd'
// import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
// import {DataTypePut} from '../../../../../redux/reducer/configuration/DataTypeReducer'
// import { useState,useEffect } from 'react';

function ConfigDataMapView() {
  const demo = useSelector((state)=> state.DataType.getOneData)
  const DataType = useSelector((state) => state.Connection.Data)
  // const dTypeConfig = useSelector((state) => state.Configuration.ConfigGetData)
  const connDltData = useSelector((state) => state.ConnectionDetail.ConData)

  return (
  
    <div className='Dtype_EditForm_Parent_Container'>
{demo.map((val, key) => {
        // console.log(val.datatype)
        return (
      <Form name="basic"  style={{fontFamily:'Nunito'}} autoComplete="off" layout='vertical' size='medium'key={demo.id}>
        <Row gutter={[16, 0]} >
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Database Name"
              name="database name"
 
              rules={[

              ]}
            >
              <Input style={{textTransform:'capitalize'}}  disabled defaultValue={val.config_name}/>
            </Form.Item>
          </Col>
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Data Mapping Name"
              name="data name"
              rules={[
                // { required: true, message: 'Please Enter data mapping name' },

              ]}
            >
              <Input style={{textTransform:'capitalize'}}  disabled defaultValue={val.datatype_mapping_name} />
            </Form.Item>
          </Col>

          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Source connection"
              name="SrcConn "
              rules={[
                
              ]}
            >
             
             <Input  disabled defaultValue={val.source_name}/>

            </Form.Item>
          </Col>
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Target Connection"
              name="TarConn"
              rules={[
                
              ]}
            >
             <Input style={{textTransform:'capitalize'}}  disabled defaultValue={val.target_name}/>
            </Form.Item>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Pre-defined Data Type"
              name="predatatype"
              rules={[
                
              ]}
            >
              <div className='dType_view_overall'> 
                    <div className='dType_box' >
                  {Object.entries(val.datatype).map(value=>
                           <div className='dType_boxOne'key={value}>
                              <div>
                                <input style={{ textAlign: "center", marginLeft: "5px", padding: "5px", marginTop: "10px",textTransform:"capitalize" }}
                                  className='dType_input'
                                  name='source'
                                  label="Source Dtype"
                                  defaultValue={value[0]}
                                  disabled
                                />
                              </div>
                              <Form.Item   rules={[{   transform: (v) => v.toUpperCase(),}]}>
                                <AutoComplete disabled
                              
                                  style={{ width: 200,textTransform:"capitalize" }}
                                  className='datatype-inputfeild'
                                  // options={type}
                                  // onSelect={onSelect} 
                                  defaultValue={value[1]}
                                  name='convertDType'
                                  placeholder="Enter Your Target Datatype"
                                  // filterOption={(inputValue, type) =>
                                  //   type.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                  // }
                                />
                              </Form.Item>
                            </div>
                              )} 
                    </div>
                   
              </div>
            </Form.Item>
            
          </Col>

         

        </Row>
      </Form>
      
      )
    })} 
    </div>
  )
}

export default ConfigDataMapView