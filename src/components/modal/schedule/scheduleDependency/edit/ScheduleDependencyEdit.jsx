import React from 'react'
import { Form, Row, Col, Input, DatePicker, Switch, Button, message } from 'antd';
import { useState, useEffect } from 'react';
import { ScheduleDependencyGetOne, Sched_schedule_Edit, EditForm } from '../../../../../redux/reducer/schedule/ScheduleDependency';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function ScheduleDependencyEdit({ scheddepgetoneData }) {

    const [pipe_sched_dep_name, setPipe_sched_dep_name] = useState()
    const [parent_sched_name, setParent_sched_name] = useState()
    const [child_sched_name, setChild_sched_name] = useState()
    const [pipe_Sched_start_date, setStartDate] = useState()
    const [pipe_Sched_end_date, setEndDate] = useState()
    const [pipe_sched_dep_status, setPipe_sched_dep_status] = useState()

    const dispatch = useDispatch();
    const editModalOpen = useSelector((state) => state.ScheduleDependency.newForm.EditForm)

    const editModalClose = () => {
        dispatch(EditForm())
    }

    const datePickerOnChange = (dates, dateStrings) => {
        setEndDate(dateStrings[1])
    };

    const onSwitch = (checked) => {
        setPipe_sched_dep_status(checked)
    };

    const updateSubmit = () => {
        dispatch(Sched_schedule_Edit({
            pipeline_schedule_dependency_name: pipe_sched_dep_name,
            parent_schedule_name: parent_sched_name,
            child_schedule_name: child_sched_name,
            start_date: pipe_Sched_start_date,
            end_date: pipe_Sched_end_date,
            is_active: pipe_sched_dep_status,
            EditForm: false
        }))
    }
    return (
        <div>
            <div className='shed_dep_edit_overall_container'>
                <div className='sched_editep_form_container'>
                    {
                        scheddepgetoneData.map((val, key) => {
                            return (
                                <Form
                                    name="basic"
                                    autoComplete="off"
                                    layout='vertical'
                                    key={val.id}
                                >
                                    <Row gutter={[8, 16]} >
                                        <Col className="gutter-row" span={24}>
                                            <Form.Item
                                                name="Pipeline Schedule Dependency Name"
                                                label="Pipeline Schedule Dependency Name"
                                            >
                                                <Input style={{textTransform:"capitalize"}} disabled defaultValue={val.pipeline_schedule_dependency_name} onChange={(e) => { setPipe_sched_dep_name(e.target.value) }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[8, 16]}>
                                        <Col className="gutter-row" span={24}>
                                            <Form.Item
                                                name="Parent Schedule Name"
                                                label="Parent Schedule Name"
                                            >
                                                <Input style={{textTransform:"capitalize"}} disabled placeholder="input placeholder" defaultValue={val.parent_schedule_name} onChange={(e) => { setParent_sched_name(e.target.value) }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="gutter-row" span={24}>
                                            <Form.Item
                                                name="Child Schedule Name"
                                                label="Child Schedule Name"

                                            >
                                                <Input style={{textTransform:"capitalize"}} disabled placeholder="input placeholder" defaultValue={val.child_schedule_name} onChange={(e) => { setChild_sched_name(e.target.value) }} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[8, 16]}>
                                        <Col className="gutter-row" span={24}>
                                            <Form.Item
                                                name="start date"
                                                label="Start Date - End Date"
                                            >
                                                <RangePicker disabled={[true, false]} defaultValue={[moment(val.start_date, dateFormat), moment(val.end_date, dateFormat)]} onChange={datePickerOnChange} style={{ width: "100%" }} />

                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="gutter-row" span={8}>
                                            <Form.Item
                                                name="status"
                                                label="Active"

                                            >
                                                <Switch defaultChecked={val.is_active} onChange={onSwitch} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <div className='sched_editdep_form_button_cont'>
                                        <Button htmlType='submit' type='primary' style={{marginLeft:"80%"}} className='newconn-create-btn'  onClick={updateSubmit} >Update</Button>
                                    </div>
                                </Form>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ScheduleDependencyEdit