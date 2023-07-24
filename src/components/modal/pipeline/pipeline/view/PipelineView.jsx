import React from 'react'
import './PipelineView.css'
import { Row, Switch, Form, Input, Col, DatePicker } from 'antd'
import { useSelector } from 'react-redux'

function PipelineView() {

  const { RangePicker } = DatePicker;
  const PipeGetOneData = useSelector((state) => state.Pipeline.GetOneData)
  const configurationGetAll = useSelector((state) => state.Configuration.ConfigGetData)

  const configName = (e) => {
    const configname = []
    configurationGetAll.map((value) => {
      if (e == value.id) {
        configname.push(value.config_name)
      }
    }
    )
    return configname
  }

  return (
    <div className='PipeLine_ViewForm_Parent_Contaiiner'>

      <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito" }}>
        {PipeGetOneData.map((val, key) => {
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

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Description"
                  name="description"
                >
                  <Input style={{textTransform:"capitalize"}}  placeholder={val.Description} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="E-mail"
                  name="email"
                >
                  <Input  placeholder={val.email} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Configuration Name"
                  name=" configurationName"
                >
                  <Input style={{textTransform:"capitalize"}}  placeholder={configName(val.config_id)} disabled />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Start Date - End Date"
                  name="StartDateToEndDate"
                >
                  <RangePicker placeholder={[(val.Start_date), (val.End_date)]} disabled={[true, true]} style={{ width: "100%" }} />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  label="Active"
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

export default PipelineView
