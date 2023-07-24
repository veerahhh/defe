import React, { useState } from 'react';
import { Col, Form, Row, Input, Button,message, DatePicker, Switch, Checkbox, TimePicker, List } from 'antd';
import moment from 'moment';
import '../../schedule.css'
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { ScheduleAddForm, SchedulePost, ScheduleTimePost } from '../../../../../redux/reducer/schedule/ScheduleReducer'
import {ScheduleTrigger} from '../../../../../api/BackEndURL'
const { RangePicker } = DatePicker;

function ScheduleAdd() {
  // let URL = process.env.REACT_APP_URL
  const dispatch = useDispatch()
 
  const [scheduleState,setScheduleState]=useState({
    pipeline_detail_id:'',
    pipe_detail_name:'',
    pipe_sched_name:'',
    pipe_sched_start_date:'',
    pipe_sched_end_date:'',
    pipe_sched_time:'',
    pipe_sched_description:'',
    pipe_sched_run_immediate:false,
    pipe_sched_status: false
  })
  const [hr, setHr]= useState()
  const [min, setmin]= useState()
  const [sec, setsec]= useState()
  // const [pipe_sched_name, setPipe_sched_name] = useState()
  // const [pipe_sched_start_date, setPipe_sched_start_date] = useState()
  // const [pipe_sched_end_date, setPipe_sched_end_date] = useState()
  // const [pipe_sched_time, setPipe_sched_time] = useState()
  // const [pipe_sched_description, setPipe_sched_description] = useState()
  // const [pipe_sched_run_immediate, setPipe_sched_run_immediate] = useState(false)
  //const [pipe_sched_status, setPipe_sched_status] = useState()


  // const [pipeline_detail_id, setPipeline_detail_id] = useState()
  // const [pipe_detail_name, setPipe_detail_name] = useState()
  // const [searchForm, setSearchForm] = useState(true)
  // const [addForm, setAddForm] = useState(false)
  const [dataSearch, setDataSearch] = useState('')
  const [dataList, setDataList] = useState(false)

  const pipelinedetailData = useSelector((state) => state.Schedule.pipeGetData)
  const listData = useSelector((state) => state.Schedule.newForm.AddForm)
  const addScheduleForm = useSelector((state) => state.Schedule.newForm.ScheduleAdd)
  const search = useSelector((state) => state.Schedule.newForm.search)

  const handleChange = (e) => {
    setScheduleState({ ...scheduleState, [e.target.name]: e.target.value })
  }
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf('day')
  };
  const datePickerOnChange = (dates, dateStrings) => {
    // setScheduleState({...scheduleState,pipe_sched_start_date:dateStrings[0]})
    setScheduleState({...scheduleState,pipe_sched_start_date:dateStrings[0],pipe_sched_end_date:dateStrings[1]})
  };
  const pipelineSearchOnChange = (e) => {
    setDataSearch(e.target.value)
    e.target.value.length > 0 ? setDataList(true) : setDataList(false)
  }

  const filteredData = pipelinedetailData.filter((val) => {
    if (val.is_active === true) {
      return val
    }
  })

  const data = filteredData.filter((val) => {
    if (dataSearch === "") {
      return val;
    } else if (val.pipeline_detail_name.toString().toLowerCase().includes(dataSearch.toLowerCase())) {
      return val
    }
  }).map((val) => {
    return {
      pipe_detail_id: val.id,
      pipe_detail_name: val.pipeline_detail_name,
      status: val.is_active,
    }
  })

  const onChange = (time, timeString) => {
    const st = timeString.split(':')
    setHr(st[0])
    setmin(st[1])
    setsec(st[2])
    setScheduleState({...scheduleState,pipe_sched_time:timeString})
  };
  const createSuccess = () => {
    message.success({ content: 'Created SuccessFully!',  duration: 2, });
  };

  const onSwitch = (checked) => {
    setScheduleState({...scheduleState,pipe_sched_status:checked});
  };

  const onCheckbox = (e) => {
    // console.log(e.target.checked)
    setScheduleState({...scheduleState,pipe_sched_run_immediate:e.target.checked})
  };

  const handleSubmit = () => {
    dispatch(ScheduleTimePost(
      {
        minutes:min,
        hours:hr,
        seconds:sec,
        end_date:scheduleState.pipe_sched_end_date,
        run_imm:scheduleState.pipe_sched_run_immediate
      }))
    dispatch(SchedulePost(
      {
        pipeline_det_id:scheduleState.pipeline_detail_id,
        pipeline_detail_name:scheduleState.pipe_detail_name,
        pipeline_schedule_name: scheduleState.pipe_sched_name,
        pipeline_schedule_desc: scheduleState.pipe_sched_description,
        pipeline_schedule_start_date: scheduleState.pipe_sched_start_date,
        pipeline_schedule_end_date: scheduleState.pipe_sched_end_date,
        pipeline_schedule_time: scheduleState.pipe_sched_time,
        pipeline_status: scheduleState.pipe_sched_status,
        pipeline_schedule_run_imme: scheduleState.pipe_sched_run_immediate,
        tenant_id:JSON.parse(sessionStorage.getItem("id")),
        AddForm: false
      }
    )).then((res)=>{
      console.log(res.payload.data.id)
          dispatch(ScheduleAddForm({ ScheduleAddForm: false }))
          ScheduleTrigger.method.get(`${ScheduleTrigger.URL.get}/${res.payload.data.id}`).then((res) => {
            console.log(res.data.id)
            console.log("c")
          })
          console.log("a")
    }) 
    // createSuccess(true)
    setDataList(false)
  }
// console.log(scheduleState,"ScheduleTrigger")
  return (
    <div>
      <div className='sched_addform_overall_container_'>
        {search &&
          <div className='Pipeline_detail_Search_Sugg_Box_'>
            <Input.Search className='Pipeline_detail_Search_Sugg_Inner_Box_' onChange={pipelineSearchOnChange} placeholder='Pipeline Detail Name' enterButton />
            {dataList && <div className='Pipeline_detail_Search_List_Title_text_'>

              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item onClick={() => {
                    // setPipe_detail_name(item.pipe_detail_name)
                    // setPipeline_detail_id(item.pipe_detail_id)
                    setScheduleState({...scheduleState,pipe_detail_name:item.pipe_detail_name,pipeline_detail_id:item.pipe_detail_id})
                    setDataList(false)
                    // setAddForm(true)
                    dispatch(ScheduleAddForm({search:false, ScheduleAdd: true}))
                  }} className='Pipeline_Search_List' style={{ height: "60px", cursor: 'pointer', userSelect: 'none',textTransform:"capitalize",fontFamily: "Nunito"  }}>
                    <List.Item.Meta
                      title={<p className='Pipeline_Search_List_Title_text'>{item.pipe_detail_name}</p>}
                      description={<p className={item.status === true ? "Status_Active_Text" : "Status_InActive_Text"}>{item.status === true ? "Active" : "In_Active"}</p>}
                    />
                  </List.Item>
                )}
              />

            </div>}
          </div>}

        {addScheduleForm && <div className='sched_addform_container'>
          <Form
            name="basic"
            autoComplete="off"
            layout='vertical'
            style={{ fontFamily: "Nunito" }}
          >
            <Row gutter={[8, 16]}>
              <Col className="gutter-row" span={24} >
                <Form.Item
                  name="Pipeline Detail Name"
                  label="Pipeline Detail Name"
                  layout='horizontal'
                >
                  <Input style={{textTransform:"capitalize"}}  defaultValue={scheduleState.pipe_detail_name} disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name='Schedule_Name'
                  label="Schedule Name"
                  rules={[
                    {
                      required: true,
                      message: 'Enter The Schedule Name',

                    },
                  ]}
                >
                  <Input style={{textTransform:"capitalize"}}  name="pipe_sched_name" onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12}>
                <Form.Item
                  name='Schedule_Description'
                  label="Schedule Description"
                  rules={[
                    {
                      required: true,
                      message: 'Enter The Schedule Description',

                    },
                  ]}
                >
                  <Input style={{textTransform:"capitalize"}} name="pipe_sched_description" onChange={handleChange} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col className="gutter-row" span={12}>
                <Form.Item name="start-date_end-date" label="Start date - End date"
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
              <Col className="gutter-row" span={12} offset={0}>
                <Form.Item
                  name="note"
                  label="Schedule Time"
                  rules={[
                    {
                      required: true,
                      message: 'Enter The Schedule Time',

                    },
                  ]}
                >
                  <TimePicker onChange={onChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 16]}>
              <Col className="gutter-row" span={6} offset={1} >
                <Form.Item
                  name="pipeline_status"
                  label="Active"
                >
                  <Switch  onChange={onSwitch} />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={12} ><br />
                <Form.Item
                    name="pipe_sched_run_immediate"
                  >
                  <Checkbox onChange={onCheckbox} >Run Immediate</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <div className='sched_addform_button_cont'>
              <Button type='primary'  onClick={() => {
                // setSearchForm(true);
                // setAddForm(false);
                dispatch(ScheduleAddForm({search: true,ScheduleAdd: false}))
                setDataSearch('');
                setDataList(false)
              }}
              >
                Back
              </Button>
              <Button htmlType='submit' type='primary'  onClick={handleSubmit}>Create</Button>
            </div>
          </Form>
        </div>
        }

      </div>
    </div>
  )
}

export default ScheduleAdd