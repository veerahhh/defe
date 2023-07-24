import React from 'react'
import '../../schedule.css'
import { Form, Row, Col, Input, DatePicker, Switch, Button, message } from 'antd';
import { useState } from 'react';
import { ScheduleDependencyPost, AddFormOpen } from '../../../../../redux/reducer/schedule/ScheduleDependency'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const { RangePicker } = DatePicker;

function ScheduleDependencyAdd() {

    const dispatch = useDispatch()

    const [scheduleDependency, setScheduleDependency] = useState({
        pipe_Sched_Dep_Name: '',
        parent_Sched_Name: '',
        child_Sched_Name: '',
        pipe_Sched_Dep_start_date: '',
        pipe_Sched_Dep_end_date: '',
        pipe_Sched_Dep_status: false
    })
    
    // const [pipe_Sched_Dep_Name, setPipe_Sched_Dep_Name] = useState('')
    // const [parent_Sched_Name, setParent_Sched_Name] = useState('')
    // const [child_Sched_Name, setChild_Sched_Name] = useState('')
    // const [pipe_Sched_start_date, setStartDate] = useState()
    // const [pipe_Sched_end_date, setEndDate] = useState()
    // const [pipe_Sched_Dep_status, setPipe_Sched_Dep_status] = useState(false)

    const addModalOpen = useSelector((state) => state.ScheduleDependency.newForm.AddForm)

    const addModalClose = () => {
        dispatch(AddFormOpen())
    }

    const handleChange = (e) => {
        setScheduleDependency({ ...scheduleDependency, [e.target.name]: e.target.value })
    }
    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day')
      };

    const datePickerOnChange = (dates, dateStrings) => {
        console.log(dateStrings[0])
        console.log(dateStrings[1])

        // setScheduleDependency({ ...scheduleDependency, pipe_Sched_Dep_start_date: dateStrings[0] })
        setScheduleDependency({ ...scheduleDependency, pipe_Sched_Dep_start_date: dateStrings[0] ,pipe_Sched_Dep_end_date: dateStrings[1] })
    };


    const onSwitch = (checked) => {
        setScheduleDependency({ ...scheduleDependency, pipe_Sched_Dep_status: checked });
    };

    const handleSubmit = () => {
        dispatch(ScheduleDependencyPost(
            {
                pipeline_schedule_dependency_name: scheduleDependency.pipe_Sched_Dep_Name,
                parent_schedule_name: scheduleDependency.parent_Sched_Name,
                child_schedule_name: scheduleDependency.child_Sched_Name,
                start_date: scheduleDependency.pipe_Sched_Dep_start_date,
                end_date: scheduleDependency.pipe_Sched_Dep_end_date,
                is_active: scheduleDependency.pipe_Sched_Dep_status,
                AddForm: false,
                tenant_id:JSON.parse(sessionStorage.getItem("id")),
            }
        ))
    }

    return (
        <div>
            <div className='sched_add_dep_overall_container'>
                <div className='sched_adddep_form_container'>
                    <Form
                        name="basic"
                        autoComplete="off"
                        layout='vertical'
                    >
                        <Row gutter={[8, 16]}>
                            <Col className="gutter-row" span={24}>
                                <Form.Item
                                    name='pipeline_schedule_dependency_name'
                                    label="Pipeline Schedule Dependency Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter The Schedule Dependency Name',

                                        },
                                    ]}
                                >
                                    <Input style={{textTransform:"capitalize"}} name="pipe_Sched_Dep_Name" placeholder="Pipeline Schedule Dependency Name" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[8, 16]}>
                            <Col className="gutter-row" span={24}>
                                <Form.Item
                                    name='parent_schedule_name'
                                    label="Parent Schedule Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter The Parent Schedule Name',

                                        },
                                    ]}
                                >
                                    <Input style={{textTransform:"capitalize"}} name="parent_Sched_Name" placeholder="Parent Schedule Name" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={24}>
                                <Form.Item
                                    name='child_schedule_name'
                                    label="Child Schedule Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter The Child Schedule Name',

                                        },
                                    ]}
                                >
                                    <Input style={{textTransform:"capitalize"}} name="child_Sched_Name" placeholder="Child Schedule Name" onChange={handleChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[8, 16]}>
                            <Col className="gutter-row" span={24}>
                                <Form.Item
                                    name="start-date_end-date"
                                    label="Start Date - End Date"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Enter The End Date',

                                        },
                                    ]}
                                >
                                    <RangePicker defaultValue={[moment()]} disabledDate={disabledDate} onChange={datePickerOnChange} style={{ width: "100%" }} />

                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="gutter-row" span={8}>
                                <Form.Item
                                    name="is_active"
                                    label="Active"
                                >
                                    <Switch  onChange={onSwitch} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
                            <Button htmlType='submit' type='primary' className='sched_adddep_form_button_cont' onClick={handleSubmit}>Create</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ScheduleDependencyAdd