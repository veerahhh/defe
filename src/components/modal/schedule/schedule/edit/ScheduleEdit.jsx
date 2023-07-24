import React from 'react'
import { Col, Form, Row, Input, Button, DatePicker, Switch, Checkbox, TimePicker, List } from 'antd';
import '../../schedule.css'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Schedule_Edit, EditSchedForm } from '../../../../../redux/reducer/schedule/ScheduleReducer'
import { useState } from 'react';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function ScheduleEdit() {

    const [pipe_sched_name, setPipe_sched_name] = useState()
    const [pipe_sched_detail_name, setPipe_sched_detail_name] = useState()
    const [pipe_sched_description, setPipe_sched_description] = useState()
    const [pipe_sched_start_date, setPipe_sched_start_date] = useState()
    const [pipe_sched_end_date, setPipe_sched_end_date] = useState()
    const [pipe_sched_time, setPipe_sched_time] = useState()
    const [pipe_sched_status, setPipe_sched_status] = useState()
    const [pipe_sched_run_imme_time, setPipe_sched_run_imme_time] = useState()


    const dispatch = useDispatch()
    const schedOneData = useSelector((state) => state.Schedule.getOneData)

    const datePickerOnChange = (dates, dateStrings) => {
        setPipe_sched_end_date(dateStrings[1])
    };

    const onTimeChange = (time, timeString) => {
        setPipe_sched_time(timeString)
    };

    const checkChange = (checked) => {
        setPipe_sched_status(checked)
    };

    const onChange = (e) => {
        setPipe_sched_run_imme_time(e.target.checked)
    };

    const handleSubmit = () => {
        dispatch(Schedule_Edit(
            {
                pipeline_schedule_name: pipe_sched_name,
                pipeline_detail_name: pipe_sched_detail_name,
                pipeline_schedule_desc: pipe_sched_description,
                pipeline_schedule_start_date: pipe_sched_start_date,
                pipeline_schedule_end_date: pipe_sched_end_date,
                pipeline_schedule_time: pipe_sched_time,
                pipeline_status: pipe_sched_status,
                pipeline_schedule_run_imme: pipe_sched_run_imme_time,
                EditSchedForm: false,
            }
        ))
    }

    return (

        <div>
            <div className='sched_addform_overall_container'>
                {
                    schedOneData.map((value, key) => {
                        return (
                            <div className='sched_addform_container'>
                                <Form
                                    name="basic"
                                    autoComplete="off"
                                    layout='vertical'
                                    key={value.id}
                                    style={{ fontFamily: "Nunito" }}
                                >
                                    <Row gutter={[8, 16]}>
                                        <Col className="gutter-row" span={24} >
                                            <Form.Item
                                                name="Pipeline Schedule Name"
                                                label="Pipeline Schedule Name"
                                                layout='horizontal'
                                            >
                                                <Input style={{textTransform:"capitalize"}} defaultValue={value.pipeline_schedule_name} onChange={(e) => { setPipe_sched_name(e.target.value) }} disabled />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[8, 16]}>
                                        <Col className="gutter-row" span={12}>
                                            <Form.Item
                                                name="Pipeline Detail Name"
                                                label="Pipeline Detail Name"

                                            >
                                                <Input style={{textTransform:"capitalize"}} disabled placeholder="Pipeline Detail Name" defaultValue={value.pipeline_detail_name} onChange={(e) => { setPipe_sched_detail_name(e.target.value) }} />
                                            </Form.Item>
                                        </Col>
                                        <Col className="gutter-row" span={12}>
                                            <Form.Item
                                                name="Schedule Description"
                                                label="Schedule Description"

                                            >
                                                <Input style={{textTransform:"capitalize"}} placeholder="Schedule Description" defaultValue={value.pipeline_schedule_desc} onChange={(e) => { setPipe_sched_description(e.target.value) }} disabled />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[8, 16]}>
                                        <Col className="gutter-row" span={12}>
                                            <Form.Item name="start date - end date" label="Start date - End date"
                                            >
                                                <RangePicker disabled={[true, false]} defaultValue={[moment(value.pipeline_schedule_start_date, dateFormat), moment(value.pipeline_schedule_end_date, dateFormat)]} onChange={datePickerOnChange} style={{ width: "100%" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col className="gutter-row" span={12} offset={0}>
                                            <Form.Item
                                                name="note"
                                                label="Schedule Time"

                                            >
                                                <TimePicker defaultValue={moment((value.pipeline_schedule_time), 'HH:mm:ss')} style={{ width: '100%' }} onChange={onTimeChange} disabled />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={[8, 16]}>
                                        <Col className="gutter-row" span={6} offset={1} >
                                            <Form.Item
                                                name="Active"
                                                label="Active"
                                            >
                                                <Switch defaultChecked={value.pipeline_status} onChange={checkChange} />
                                            </Form.Item>
                                        </Col>
                                        <Col className="gutter-row" span={12} ><br />
                                            <Checkbox disabled defaultChecked={value.pipeline_schedule_run_imme} onChange={onChange} >Run Immediate</Checkbox>
                                        </Col>
                                    </Row>
                                    <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
                                        <Button htmlType='submit' type='primary' className='newconn-create-btn' onClick={handleSubmit} >Update</Button>
                                    </div>
                                </Form>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ScheduleEdit