import React, { useEffect, useState } from 'react'
import './PipelineDetailAdd.css'
import { Row, Button, Form, Switch, Input, Col, DatePicker, List, AutoComplete } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { PipelinedetailPost, PplDtlAddForm } from '../../../../../redux/reducer/pipeline/PipelineDetailReducer';
import Item from 'antd/lib/list/Item';


function PipelineDetailAdd() {

  const dispatch = useDispatch()
  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';

  const [pipelineDetails,setPipelineDetails]=useState({
    pipelineName:'',
    pipelineId:'',
    pipelineDetailsName:'',
    targetName:'',
    sourceName:'',
    startDate:'',
    endDate:'',
    sqlExtractName:'',
    sqlExtractId:'',
    status:false,
  })
  
console.log(pipelineDetails);
  const handleChange=(e)=>{
    setPipelineDetails({...pipelineDetails,[e.target.name]:e.target.value})
  }

  const [extractstatus, setExtractStatus] = useState(false)
  const [pipeDtlSerach, setpipeDtlSerach] = useState(true)
  const [createForm, setCreateForm] = useState(false);
  const [formList, setFormList] = useState(false);
  const [sqlFormList, setSqlFormList] = useState(false)

  const [formSearch, setFormSerach] = useState('');
  const [sqlFormSearch, setSqlFormSearch] = useState('')

  const [sqlSearchInput, setSqlSearchInput] = useState(true)
  const [sqlNameDisplay, setSqlNameDisplay] = useState(false)


  const pipelineData = useSelector((state) => state.Pipeline.Data)
  const sqlExtractData = useSelector((state) => state.SqlExtract.getData)
  const addform = useSelector((state)=> state.PipelineDetail.newForm.PplDtlAddForm)
  const Search = useSelector((state)=>state.PipelineDetail.newForm.Search)

  const handleSearch = (e) => {
    setFormSerach(e.target.value)
    e.target.value.length > 0 ? setFormList(true) : setFormList(false)
  }

  const sqlExtractHandleChange = (e) => {
    setSqlFormSearch(e.target.value)
    e.target.value.length > 0 ? setSqlFormList(true) : setSqlFormList(false)
  }

  const sqlNameDisplayHandleChange = (e) => {
    // setSqlExtractName('')
    setPipelineDetails({...pipelineDetails,sqlExtractName:'',sqlExtractId:''})
    setSqlNameDisplay(false);
    setSqlSearchInput(true);
  }


  const filteredData = pipelineData.filter((val) => {
    if (val.is_active === true) {
      return val
    }
  })

  const sqlFilterData = sqlExtractData.filter((val) => {
    if (val.is_active === true) {
      return val
    }
  })

  const data = filteredData.filter((val) => {
    console.log(val.pipeline_name)
    if (formSearch === "") {
      return val;

    } else if (val.pipeline_name.toString().toLowerCase().includes(formSearch.toLowerCase())) {
      return val
    }
  }).map((val) => {
    return {
      id: val.id,
      pipeline_name: val.pipeline_name,
      status: val.is_active,
    }
  })

  const sqlData = sqlFilterData.filter((val) => {
    if (sqlFormSearch === '') {
      return val;
    } else if (val.database_name.toString().toLowerCase().includes(sqlFormSearch.toLocaleLowerCase())) {
      return val
    }
  }).map((val) => {
    return {
      id: val.id,
      tittle: val.database_name,
      status: val.is_active
    }
  })



  const statusSwitch = (checked) => { 
    setPipelineDetails({...pipelineDetails,status:checked})
   };
  const sqlExtractSwitch = (checked) => { setExtractStatus(checked) }
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day')
  };
  const datePickerOnChange = (dates, dateStrings) => {
    setPipelineDetails({...pipelineDetails,startDate:dateStrings[0],endDate:dateStrings[1]})
  }

  const addForm = () => {
    dispatch(PipelinedetailPost({
      pipeline_id: pipelineDetails.pipelineId,
      pipeline_name: pipelineDetails.pipelineName,
      sql_extract_id: pipelineDetails.sqlExtractId,
      sql_extract_name: pipelineDetails.sqlExtractName,
      pipeline_detail_name: pipelineDetails.pipelineDetailsName,
      target_table_name: pipelineDetails.targetName,
      source_table_name: pipelineDetails.sourceName,
      start_date: pipelineDetails.startDate,
      end_date: pipelineDetails.endDate,
      is_active: pipelineDetails.status,
      tenant_id:JSON.parse(sessionStorage.getItem("id")),
    }))

  }

  return (

    <div className='piplineDetailCreate_overall'>

      {Search && <div className='PipelineDetail_Search_Parent_Container'>

        <Input.Search className='PipelineDetail_Add_Search_Input' onChange={handleSearch} placeholder='Search Pipeline Names' enterButton />

        {formList && <div className='PipelineDetail_Add_Search_Sugg_Box'>

          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item onClick={() => {
                // setPipeline_name(item.pipeline_name)
                setPipelineDetails({...pipelineDetails,pipelineId:item.id,pipelineName:item.pipeline_name})
                // setPipelineId(item.id)
                // setpipeDtlSerach(false)
                // setCreateForm(true)
                setFormList(false)
                dispatch(PplDtlAddForm({Search:false, PplDtlAddForm:true}))
              }} className='PipelineDetail_Search_List' style={{ height: "60px", cursor: 'pointer', userSelect: 'none',textTransform:"capitalize" ,fontFamily: "Nunito" }}>
                <List.Item.Meta
                  title={<p className='PipelineDetail_Search_List_Title_text'>{item.pipeline_name}</p>}
                  description={<p className={item.status === true ? "Status_Active_Text" : "Status_InActive_Text"}>{item.status === true ? "Active" : "In_Active"}</p>}
                />
              </List.Item>
            )}
          />

        </div>}

      </div>}

      {addform && <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito" }}>
        <Row gutter={[0, 0]} >

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }}>
            <Form.Item
              style={{ width: "100%" }}
              label="Pipeline Name"
              name="pipeline name"
              rules={[
                {

                },
              ]}
            >
              <Input style={{textTransform:"capitalize"}}  className="Pipeline-Det-Input" defaultValue={pipelineDetails.pipelineName} disabled />
            </Form.Item>
          </Col>

          <Col lg={{ span: 11, offset: 2 }}>
            <Form.Item
              label="Pipeline Detail Name"
              name=" Pipeline Detail Name"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Pipeline Detail Name',
                },
              ]}
            >
              <Input style={{textTransform:"capitalize"}}  className="Pipeline-Det-Input" name='pipelineDetailsName' onChange={handleChange} />
            </Form.Item>
          </Col>

          <Col lg={{ span: 11, offset: 0 }}>

            <Form.Item
              label="Target table Name"
              name="targetName"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Target table Name',
                },
              ]}
            >
              <Input style={{textTransform:"capitalize"}}  className="Pipeline-Det-Input" name='targetName' onChange={handleChange} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 2 }}>
            <Form.Item
              label="Source table Name "
              name="sourceName"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Source table name',
                },
              ]}
            >
              <Input style={{textTransform:"capitalize"}}  className="Pipeline-Det-Input" name='sourceName' onChange={handleChange} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Start Date to End Date"
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

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 5, offset: 0 }}>
            <Form.Item
              label="Extract SQL Name"
              name="extract sql name"
            >
              <Switch defaultChecked={false} onChange={sqlExtractSwitch} />
            </Form.Item>
          </Col>

          {extractstatus && <Col lg={{ span: 11, offset: 8 }}>
            <Form.Item
              key={pipelineDetails.sqlExtractName}
              label="SqlExtract Name"
              name="sqlExtractName">
              {sqlSearchInput && <Input style={{textTransform:"capitalize"}}  onChange={sqlExtractHandleChange} />}
              {sqlNameDisplay && <Input style={{textTransform:"capitalize"}}   defaultValue={pipelineDetails.sqlExtractName} name="sqlExtractName" onChange={sqlNameDisplayHandleChange} />}
            </Form.Item>
            {sqlFormList && <div className='SqlExtract-Form-List'>
              <List
                itemLayout="horizontal"
                dataSource={sqlData}
                renderItem={item => (
                  <List.Item onClick={() => {
                    setPipelineDetails({...pipelineDetails,sqlExtractName:item.tittle,sqlExtractId:item.id})
                    // setSqlExtractId(item.id)
                    setSqlFormList(false)
                    setSqlSearchInput(false)
                    setSqlNameDisplay(true)
                  }} className='PipelineDetail_Search_List' style={{ height: "60px", cursor: 'pointer', userSelect: 'none',textTransform:"capitalize" }}>
                    <List.Item.Meta
                      title={<p className='PipelineDetail_Search_List_Title_text'>{item.tittle}</p>}
                      description={<p className={item.status === true ? "Status_Active_Text" : "Status_InActive_Text"}>{item.status === true ? "Active" : "In_Active"}</p>}
                    />
                  </List.Item>
                )}
              />
            </div>}
          </Col>}

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Status"
              name="status"
            >
              <Switch name="status" onChange={statusSwitch} />
            </Form.Item>
          </Col>

          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 0 }}>
            <Button type="primary" onClick={() => {
              // setpipeDtlSerach(true)
              // setCreateForm(false)
              dispatch(PplDtlAddForm({Search:true, PplDtlAddForm:false}))
              setFormSerach('')
              setFormList(false)
            }} className='PipelineDetail_Back_Button'>Back</Button>
          </Col>
          <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
          {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 4 }}> */}
            <Button type="primary" onClick={addForm} htmlType="submit" className='PipelineDetial_Add_Button'> Create </Button>
          {/* </Col> */}
          </div>
        </Row>
      </Form>}
    </div>
  )

}

export default PipelineDetailAdd