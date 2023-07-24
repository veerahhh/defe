import React from 'react'
import { Col, Form, Row, Input, Button, DatePicker, Switch, Checkbox, TimePicker, List } from 'antd';
import '../../schedule.css'
import { useSelector } from 'react-redux';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

function ScheduleView() {

    const schedOneData = useSelector((state) => state.Schedule.getOneData)

    return (
        <div>
            <div className='sched_addform_overall_container'>
                {schedOneData.map((value, key) => {
                    return (
                        <div className='sched_addform_container'>
                            <Form
                                name="basic"
                                autoComplete="off"
                                layout='vertical'
                                key={value.id}
                                disabled
                                style={{ fontFamily: "Nunito" }}
                            >
                                <Row gutter={[8, 16]}>
                                    <Col className="gutter-row" span={24} >
                                        <Form.Item
                                            name="Pipeline Detail Name"
                                            label="Pipeline Schedule Name"
                                            layout='horizontal'
                                        >
                                            <Input style={{textTransform:"capitalize"}} defaultValue={value.pipeline_schedule_name} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[8, 16]}>
                                    <Col className="gutter-row" span={12}>
                                        <Form.Item
                                            name="Schedule Name"
                                            label="Pipeline Detail Name"

                                        >
                                            <Input style={{textTransform:"capitalize"}} defaultValue={value.pipeline_detail_name} />
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" span={12}>
                                        <Form.Item
                                            name="Schedule Description"
                                            label="Schedule Description"
                                        >
                                            <Input defaultValue={value.pipeline_schedule_desc} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[8, 16]}>
                                    <Col className="gutter-row" span={12}>
                                        <Form.Item name="start date - end date" label="Start date - End date"
                                        >
                                            <RangePicker defaultValue={[moment(value.pipeline_schedule_start_date, dateFormat), moment(value.pipeline_schedule_end_date, dateFormat)]} style={{ width: "100%" }} />
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" span={12} offset={0}>
                                        <Form.Item
                                            name="note"
                                            label="Schedule Time"
                                        >
                                            <TimePicker defaultValue={moment((value.pipeline_schedule_time), 'HH:mm:ss')} style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={[8, 16]}>
                                    <Col className="gutter-row" span={6} offset={1} >
                                        <Form.Item
                                            name="Active"
                                            label="Active"
                                        >
                                            <Switch checked={value.pipeline_status} />
                                        </Form.Item>
                                    </Col>
                                    <Col className="gutter-row" span={12} ><br />
                                        <Checkbox checked={value.pipeline_schedule_run_imme}  >Run Immediate</Checkbox>
                                    </Col>
                                </Row>

                                <div className='sched_addform_button_cont'>
                                </div>

                            </Form>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ScheduleView