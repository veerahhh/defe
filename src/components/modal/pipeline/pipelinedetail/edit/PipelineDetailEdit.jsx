import React, { useState, useEffect } from 'react'
import { Button, Input, Form, Row, Col, DatePicker, message, Switch } from 'antd';
import './PipelineDetailEdit.css'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { PipelinedetailPut } from '../../../../../redux/reducer/pipeline/PipelineDetailReducer';

function PiplineDetailEdit(props) {
    const pipeDetailGetOneData = useSelector((state) => state.PipelineDetail.getOneData)
    const dispatch = useDispatch()
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD';

    const [pipedetailname, setPipedetailName] = useState()
    const [targettable, setTargetTable] = useState()
    const [sourcetable, setSourceTable] = useState()
    const [endDate, setEndDate] = useState()
    const [isActive, setIsActive] = useState()

    const pipeData = useSelector((state) => state.Pipeline.Data)
    const sqlExtractData = useSelector((state) => state.SqlExtract.getData)

    const pipeName = (e) => {
        const Pipename = []
        pipeData.map((value) => {
            if (e == (value.id)) {
                Pipename.push(value.pipeline_name)
            }
        }
        )
        return Pipename
    }

    const SqlName = (e) => {
        const sqlName = []
        sqlExtractData.map((val) => {
            if (e == (val.id)) {
                sqlName.push(val.database_name)
            }
        })
        return sqlName
    }

    const datePickerOnChange = (dates, dateStrings) => {
        setEndDate(dateStrings[1])
    };

    const switchOnChange = (checked) => {
        setIsActive(checked)
    }

    const update = () => {
        dispatch(PipelinedetailPut({
            "pipeline_detail_name": pipedetailname,
            "target_table_name": targettable,
            "source_table_name": sourcetable,
            "end_date": endDate,
            "is_active": isActive
        }))
    }

    return (
        <div className='PipelineDetail_EditForm_Parent_Container'>
            {pipeDetailGetOneData.map((val, key) => {

                return (
                    <Form name="basic" autoComplete="off" layout='vertical' size='medium' key={val.id} style={{ fontFamily: "Nunito" }} >
                        <Row gutter={[16, 0]}>

                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Pipeline Name"
                                    name="pipeline name"
                                >
                                    <Input style={{textTransform:"capitalize"}}  disabled defaultValue={val.pipeline_name} />
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="PipelineDetails Name"
                                    name="pipelineDetails name"
                                >
                                    <Input style={{textTransform:"capitalize"}}  defaultValue={val.pipeline_detail_name} onChange={(e) => { setPipedetailName(e.target.value) }} />
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Target Table Name"
                                    name="targettable name"
                                >
                                    <Input style={{textTransform:"capitalize"}}  onChange={(e) => { setTargetTable(e.target.value) }} defaultValue={val.target_table_name} />
                                </Form.Item>
                            </Col>
                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Source Table Name"
                                    name="source table name"
                                >
                                    <Input style={{textTransform:"capitalize"}}  onChange={(e) => { setSourceTable(e.target.value) }} defaultValue={val.source_table_name} />
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Sql Extract Name"
                                    name="sql extract name"
                                >
                                    <Input style={{textTransform:"capitalize"}}  disabled defaultValue={val.sql_extract_name} />
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                                <Form.Item
                                    label="Start Date - End Date"
                                    name="StartDateToEndDate"
                                >
                                    <RangePicker onChange={datePickerOnChange} defaultValue={[moment(val.start_date, dateFormat), moment(val.end_date, dateFormat)]} disabled={[true, false]} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>

                            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }} >
                                <Form.Item
                                    label="Status"
                                    name='isChecked'
                                >
                                    <Switch onChange={switchOnChange} defaultChecked={val.is_active} />
                                </Form.Item>
                            </Col>

                            <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
                            {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 14 }}> */}
                                <Button onClick={update} type="primary" htmlType="submit" className='PipelineDetail_Update_Button'> Update </Button>
                            {/* </Col> */}
                            </div>
                        </Row>
                    </Form>
                )
            })}
        </div>

    )
}




export default PiplineDetailEdit
