import React from 'react'
import {Form, Row, Col, Input, DatePicker, Switch, Button} from 'antd';
import {AiOutlineClose} from 'react-icons/ai'
import { useState, useEffect } from 'react';
import { ScheduleDependencyGetOne,ViewForm } from '../../../../../redux/reducer/schedule/ScheduleDependency';
import { useDispatch, useSelector } from 'react-redux';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function ScheduleDependencyView({scheddepgetoneData}) {

    const dispatch = useDispatch();
    const viewModalOpen=useSelector((state)=>state.ScheduleDependency.newForm.ViewForm)

    const viewModalClose=()=>{
        dispatch(ViewForm())
      }
      
  return (
    <div>
         <div className='shed_dep_view_overall_container'>
          <div className='sched_viewdep_form_container' >
            {
                scheddepgetoneData.map((value,key)=>{
                    return(
                        <Form
                            name="basic"
                            autoComplete="off"
                            layout='vertical'
                            key={value.id}
                        >
                                <Row gutter={[8, 16]}>
                                    <Col className="gutter-row" span={24}>
                                        <Form.Item
                                        name="Pipeline Schedule Dependency Name"
                                        label="Pipeline Schedule Dependency Name"
                                        >
                                            <Input style={{textTransform:"capitalize"}} placeholder={value.pipeline_schedule_dependency_name} disabled />
                                        </Form.Item>               
                                    </Col>        
                                </Row>

                                <Row gutter={[8, 16]}>
                                    <Col className="gutter-row" span={24}>
                                        <Form.Item
                                            name="Parent Schedule Name"
                                            label="Parent Schedule Name"
                            
                                        >
                                            <Input style={{textTransform:"capitalize"}} placeholder={value.parent_schedule_name} disabled />
                                        </Form.Item>               
                                    </Col>        
                                </Row>

                                <Row>
                                    <Col className="gutter-row" span={24}>
                                        <Form.Item
                                        name="Child Schedule Name"
                                        label="Child Schedule Name"
                                        >
                                            <Input style={{textTransform:"capitalize"}} placeholder={value.child_schedule_name} disabled />
                                        </Form.Item>               
                                    </Col>     
                                </Row>

                                <Row gutter={[8, 16]}>
                                    <Col className="gutter-row" span={24}>
                                        <Form.Item 
                                            name="start date"
                                            label="Start date - End Date"
                                        
                                        >
                                            <RangePicker disabled={[false, false]}  style={{ width: "100%" }} placeholder={[value.start_date,value.end_date]} />

                                        </Form.Item>          
                                    </Col>
                                </Row>

                                <Row>
                                    <Col className="gutter-row" span={8}>
                                        <Form.Item
                                            name="status"
                                            label="Active"
                                        >
                                            <Switch defaultChecked={value.is_active} disabled />
                                        </Form.Item>             
                                    </Col>             
                                </Row>
                        </Form>
                    )
                })
            }
          </div>
        </div>
    </div>
  )
}

export default ScheduleDependencyView