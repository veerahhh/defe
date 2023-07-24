import React,{useEffect,useState} from 'react'
import './SqlExtractEdit.css'
import { Row, Button, Form, Input, Col, DatePicker,Switch} from 'antd'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { sqlExtractGetOne ,sqlExtractPut} from '../../../../../redux/reducer/pipeline/SqlExtract';

function SqlExtractEdit() {
  const dispatch=useDispatch()
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';

  const [databaseName, setDatabaseName] = useState()
  const [sqlvalidation, setSqlValidation] = useState()
  const [sqlstatus, setSqlStatus] = useState()
  const [sequelizeQuery, setSequelizeQuery] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [status, setStatus] = useState()
 
const demo = useSelector((state)=>state.SqlExtract.getOneData)

const switchOnChange = (checked) => { setStatus(checked) };

const datePickerOnChange = (dates, dateStrings) => {
  setStartDate(dateStrings[0])
  setEndDate(dateStrings[1])
}
  const createForm =()=>{
    dispatch(sqlExtractPut({
      database_name: databaseName,
      sql_validation: sqlvalidation,
      sql_status: sqlstatus,
      sequelize_query: sequelizeQuery,
      start_date: startDate,
      end_date: endDate,
      is_active: status,
      EditPop:false,
    }))
  }

  return (
    <div className='sqlExtract_EditForm_Parent_Container'>
   {demo.map((val)=>{
      return(
    <Form name="basic" autoComplete="off" layout='vertical' size='medium' key={val.id} style={{ fontFamily: "Nunito" }}>
 
      <Row gutter={[16, 0]} >
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
          <Form.Item
            label="Database Name"
            name="database name"
          
          >
            <Input style={{textTransform:"capitalize"}}  defaultValue={val.database_name}  onChange={(e) => { setDatabaseName(e.target.value) }} disabled />
          </Form.Item>
        </Col>

        <Col lg={{ span: 12, offset: 0 }}>
          <Form.Item
            label="SQL Validation"
            name="Sql Validate "
         
          >
            <Input style={{textTransform:"capitalize"}}  defaultValue={val.sql_validation} onChange={(e) => { setSqlValidation(e.target.value) }} disabled />
          </Form.Item>
        </Col>
        <Col lg={{ span: 12, offset: 0 }}>
          <Form.Item
            label="SQL Status"
            name="Sql status"
        
          >
            <Input style={{textTransform:"capitalize"}}  defaultValue={val.sql_status} onChange={(e) => { setSqlStatus(e.target.value) }} disabled />
          </Form.Item>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
          <Form.Item
            label="Sequelize Query "
            name="sequelize query"
         
          >
            <Input style={{textTransform:"capitalize"}}  defaultValue={val.sequelize_query} onChange={(e) => { setSequelizeQuery(e.target.value) }} disabled />
          </Form.Item>
        </Col>

        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
          <Form.Item
            label="Start Date - End Date"
            name="StartDateToEndDate"
          >
            <RangePicker disabled={[true, false]} onChange={datePickerOnChange}  defaultValue={[moment(val.start_date, dateFormat), moment(val.end_date, dateFormat)]}   style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Active"
              name="status"
            >
              <Switch defaultChecked={val.is_active} onChange={switchOnChange} />
            </Form.Item>
          </Col>
          <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
        {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 14 }}> */}
          <Button type="primary" htmlType="submit" onClick={createForm} className='sqlExtract_Update_Button'> Update </Button>
          {/* </Col> */}
          </div>
      </Row>
     
    </Form>
       )
      })}
  </div>
  )
}

export default SqlExtractEdit