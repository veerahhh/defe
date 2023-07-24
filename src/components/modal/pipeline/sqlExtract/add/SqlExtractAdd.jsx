import React, { useEffect, useState } from 'react'
import './SqlExtractAdd.css'
import { Row, Button, Form, Switch, Input, Col, DatePicker, List } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { sqlExtractPost,SqlAddForm } from '../../../../../redux/reducer/pipeline/SqlExtract'
import moment from 'moment';

function SqlExtractAdd() {
  const dispatch = useDispatch()
  const { RangePicker } = DatePicker; 
  const dateFormat = 'YYYY-MM-DD';

  const [sqlExtractState, setSqlExtractState] = useState({
    databaseName:'',
    sqlvalidation: '',
    sqlstatus: '',
    sequelizeQuery: '',
    startDate: '',
    endDate: '',
    status: false
  })
  
  const [connDtlSerach, setconnDtlSerach] = useState(true)
  const [createForm, setCreateForm] = useState(false);
  const [formList, setFormList] = useState(false);
  const [formSearch, setFormSerach] = useState('');

  const SqlData = useSelector((state) => state.ConnectionDetail.ConData)
  const addform = useSelector((state)=> state.SqlExtract.newForm.SqlAddForm)
  const Search = useSelector((state)=>state.SqlExtract.newForm.Search)

  const handleChange = (e) => {
    setSqlExtractState({ ...sqlExtractState, [e.target.name]: e.target.value })
  }

  const handleSearch = (e) => {
    setFormSerach(e.target.value)
    e.target.value.length > 0 ? setFormList(true) : setFormList(false)
  }

  const filteredData = SqlData.filter((val) => {
    if (val.is_active === true) {
      return val
    }
  })

  const data = filteredData.filter((val) => {
    if (formSearch === "") {
      return val;
    } else if (val.connection_detail.toString().toLowerCase().includes(formSearch.toLowerCase())) {
      return val
    }
  }).map((val) => {
    return {
      title: val.connection_detail,
      status: val.is_active,
    }
  })


  const switchOnChange = (checked) => {
    setSqlExtractState({ ...sqlExtractState, status: checked })
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day')
  };
  const datePickerOnChange = (dates, dateStrings) => {
    // setSqlExtractState({ ...sqlExtractState, startDate: dateStrings[0] })
    setSqlExtractState({ ...sqlExtractState, endDate: dateStrings[1],startDate:dateStrings[0] })
  }

  const addForm = () => {
    dispatch(sqlExtractPost({
      database_name: sqlExtractState.databaseName,
      sql_validation: sqlExtractState.sqlvalidation,
      sql_status: sqlExtractState.sqlstatus,
      sequelize_query: sqlExtractState.sequelizeQuery,
      start_date: sqlExtractState.startDate,
      end_date: sqlExtractState.endDate,
      is_active: sqlExtractState.status,
      tenant_id:JSON.parse(sessionStorage.getItem("id")),
      CreatePop: false
    }))
  }
  return (
    <div className='sqlExtractCreate_overall'>

      {Search && <div className='SqlExtract_Search_Parent_Container'>

        <Input.Search className='SqlExtract_Add_Search_Input' onChange={handleSearch} placeholder='Please type a Connection Details ' enterButton />

        {formList && <div className='SqlExtract_Add_Search_Sugg_Box'>

          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item onClick={() => {
                // setDatabaseName(item.title)
                setSqlExtractState({...sqlExtractState, databaseName:item.title})
                setFormList(false)
                dispatch(SqlAddForm({Search:false, SqlAddForm:true}))
                // setconnDtlSerach(false)
                // setCreateForm(true)
              }} className='SqlExtract_Search_List' style={{ height: "60px", cursor: 'pointer', userSelect: 'none' ,textTransform:"capitalize", fontFamily: "Nunito"}}>
                <List.Item.Meta
                  title={<p className='SqlExtract_Search_List_Title_text'>{item.title}</p>}
                  description={<p className={item.status === true ? "Status_Active_Text" : "Status_InActive_Text"}>{item.status === true ? "Active" : "In_Active"}</p>}
                />
              </List.Item>
            )}
          />

        </div>}

      </div>}

      {addform && <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito" }}>
        <Row gutter={[16, 0]} >
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 0 }}>
            <Form.Item
              label="Database Name"
              name="database name"
              rules={[
                {

                },
              ]}
            >
              <Input style={{textTransform:"capitalize"}}  defaultValue={sqlExtractState.databaseName} disabled />
            </Form.Item>
          </Col>

          <Col lg={{ span: 11, offset: 0 }}>
            <Form.Item
              label="SQL Validation"
              name="sqlvalidation"
              rules={[
                {
                  required: true,
                  message: 'Please Enter SQL Validation',
                },
              ]}
            >
              <Input style={{textTransform:"capitalize"}}  name="sqlvalidation" onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col lg={{ span: 11, offset: 0 }}>
            <Form.Item
              label="SQL Status"
              name="sqlstatus"
              rules={[
                {
                  required: true,
                  message: 'Please Enter SQL status',
                },
              ]}
            >
              <Input style={{textTransform:"capitalize"}}  name="sqlstatus" onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 0 }}>
            <Form.Item
              label="Sequelize Query "
              name="sequelizeQuery"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Sequelize query',
                },
              ]}
            >
              <Input style={{textTransform:"capitalize"}}  name="sequelizeQuery" onChange={handleChange} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 0 }}>
            <Form.Item
              label="Start Date - End Date"
              name="StartDateToEndDate"
              rules={[
                {
                  required: true,
                  message: 'Please Select End Date',
                },
              ]}
            >
              <RangePicker disabledDate={disabledDate} defaultValue={[moment()]} onChange={datePickerOnChange} dateFormat style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Active"
              name="status"
            >
              <Switch onChange={switchOnChange} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 0 }}>
            <Button type="primary" onClick={() => {
              // setconnDtlSerach(true)
              // setCreateForm(false)
              setFormSerach('')
              setFormList(false)
              dispatch(SqlAddForm({Search:true, SqlAddForm:false}))
            }} className='SqlExtract_Back_Button'>Back</Button>
          </Col>
          <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
          {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 4 }}> */}
            <Button type="primary" onClick={addForm} htmlType="submit" className='SqlExtract_Add_Button'> Create </Button>
          {/* </Col> */}
          </div>
        </Row>
      </Form>}
    </div>
  )
}

export default SqlExtractAdd