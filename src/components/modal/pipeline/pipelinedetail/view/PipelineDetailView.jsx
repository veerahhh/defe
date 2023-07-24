import React from 'react'
import './PipelineDetailView.css'
import { Col, Form, Row, Input, DatePicker, Switch } from 'antd';
import { useSelector } from 'react-redux'

function ViewdetailPipelline() {

    const { RangePicker } = DatePicker;
    const pipeDetailGetOneData = useSelector((state) => state.PipelineDetail.getOneData)

    const PipeData = useSelector((state) => state.Pipeline.Data)
    const SqlExtractData = useSelector((state) => state.SqlExtract.getData)

    return (
        <div className='Pipldtl_ViewForm_Parent_Container'>
            <Form name="basic" autocomplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito" }}>
                {pipeDetailGetOneData.map((val, key) => {
                    return (
                        <Row gutter={[16, 0]}>
                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Pipeline Name"
                                    name="pipeline name"
                                >
                                    <Input style={{textTransform:"capitalize"}}  placeholder={val.pipeline_name} disabled />
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 5, offset: 1, }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Pipeline Details Name"
                                    name="pipelinedetailsname"
                                >
                                    <Input style={{textTransform:"capitalize"}}  placeholder={val.pipeline_detail_name} disabled />
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 5, offset: 1, }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Target Table Name"
                                    name="targettable name"
                                >
                                    <Input style={{textTransform:"capitalize"}}  placeholder={val.target_table_name} disabled />
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Source Table Name"
                                    name="sourcetable name"
                                >
                                    <Input style={{textTransform:"capitalize"}}  placeholder={val.source_table_name} disabled />
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Sql Extract Name"
                                    name="sql extract name"
                                >
                                    <Input style={{textTransform:"capitalize"}}  disabled placeholder={val.sql_extract_name} />
                                </Form.Item>
                            </Col>


                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Start Date to End Date"
                                    name="StartDateToEndDate"
                                >
                                    <RangePicker placeholder={[(val.start_date), (val.end_date)]} disabled={[true, true]} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>


                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Status"
                                    name="status"
                                >
                                    <Switch disabled={true} checked={val.is_active === true ? true : false} />
                                </Form.Item>
                            </Col>
                        </Row>
                    )
                })}
            </Form>
        </div>
    )

}
export default ViewdetailPipelline
