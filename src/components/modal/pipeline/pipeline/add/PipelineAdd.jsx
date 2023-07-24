import React, { useState, useEffect } from 'react'
import './PipelineAdd.css'
import moment from 'moment';
import { Row, Button, Form, Input, Col, DatePicker, Switch, List } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { pipelineAdd, AddForm } from '../../../../../redux/reducer/pipeline/PipelineReducer'

function PipelineAdd() {

    const dispatch = useDispatch()
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD';

    const [pipelineState, setPipelineState] = useState({
        configurationId: '',
        configurationName: '',
        name: '',
        description: '',
        email: '',
        startDate: '',
        endDate: '',
        status: false
    })

   

    const [error, setError] = useState({
        email: false
    })


    console.log(pipelineState)
    // const [configurationId, setConfigurationId] = useState()
    // const [configurationName,setConfigurationName]=useState('')
    const [dataList, setDataList] = useState(false)
    const [dataSearch, setDataSearch] = useState('')

    const configData = useSelector((state) => state.Configuration.ConfigGetData)
    const searchForm = useSelector((state) => state.Pipeline.modal.Search)
    const addForm = useSelector((state) => state.Pipeline.modal.AddForm)


    const pipelineSearchOnChange = (e) => {
        setDataSearch(e.target.value)
        e.target.value.length !== 0 ? setDataList(true) : setDataList(false)
    }

    const handleChange = (e) => {
        setPipelineState({ ...pipelineState, [e.target.name]: e.target.value })
    }

    const filteredData = configData.filter((val) => {
        if (val.is_active === true) {
            return val
        }
    })

    const data = filteredData.filter((val) => {
        if (dataSearch === "") {
            return val;
        } else if (val.config_name.toString().toLowerCase().includes(dataSearch.toLowerCase())) {
            return val
        }
    }).map((val) => {
        return {
            title: val.config_name,
            id: val.id,
            status: val.is_active,
        }
    })

    const switchOnChange = (checked) => {
        setPipelineState({ ...pipelineState, status: checked })
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day')
      };
    const datePickerOnChange = (dates, dateStrings) => {
        setPipelineState({ ...pipelineState, endDate: dateStrings[1], startDate: dateStrings[0] })
    };

    useEffect(() => {
        if (pipelineState.email.length > 0) {
            if ((!/\S+@\S+\.\S+/.test(pipelineState.email)) !== true) {
                setError({ ...error, email: false })
            } else {
                setError({ ...error, email: true })
            }
        } else {
            setError({ ...error, email: false })
        }
    }, [pipelineState])

    console.log((!/\S+@\S+\.\S+/.test(pipelineState.email)) !== true)

    const formSubmit = () => {
        if (pipelineState.name.length !== 0 && (!/\S+@\S+\.\S+/.test(pipelineState.email)) !== true && pipelineState.endDate.length !== 0 ) {
            dispatch(pipelineAdd({
                pipeline_name: pipelineState.name,
                Description: pipelineState.description,
                email: pipelineState.email,
                config_id: pipelineState.configurationId,
                Start_date: pipelineState.startDate,
                End_date: pipelineState.endDate,
                is_active: pipelineState.status,
                tenant_id:JSON.parse(sessionStorage.getItem("id")),
            }))
        }
        setDataList(false) 
    }

    const cancle=()=>{
        setDataList(false)
    }

    return (
        <div className='PipeLine_AddForm_Parent_Contaiiner'>

            {searchForm && <div className='Pipeline_Search_Parent_Container'>

                <Input.Search className='Pipeline_Add_Search_Input' onChange={pipelineSearchOnChange} placeholder='Please Type Configuration Name ' enterButton />

                {dataList && <div className='Pipeline_Add_Search_Sugg_Box'>

                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                            <List.Item onClick={() => {
                                // setConfigurationId(item.id)
                                // setConfigurationName(item.title)
                                setDataList(false)
                                setPipelineState({ ...pipelineState, configurationId: item.id, configurationName: item.title })
                                dispatch(AddForm({ Search: false, AddForm: true }))
                            }} className='Pipeline_Search_List' style={{ height: "60px", cursor: 'pointer', userSelect: 'none',textTransform:"capitalize" , fontFamily:'Nunito'}}>
                                <List.Item.Meta
                                    title={<p className='Pipeline_Search_List_Title_text'>{item.title}</p>}
                                    description={<p className={item.status === true ? "Status_Active_Text" : "Status_InActive_Text"}>{item.status === true ? "Active" : "In_Active"}</p>}
                                />
                            </List.Item>
                        )}
                    />

                </div>} 

            </div>}



            {addForm && 
            <Form name="basic" autoComplete="off" layout='vertical' size='medium' style={{ fontFamily: "Nunito" }}>
                <Row gutter={[16, 0]}>
                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 0 }}>
                        <Form.Item
                            label="Pipeline Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Pipeline Name',
                                },
                            ]}
                        >
                            <Input style={{textTransform:"capitalize"}}  name="name" onChange={handleChange} />
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 11, offset: 2 }}>
                        <Form.Item
                            label="Description"
                            name="description"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message: 'Please Enter Description',
                            //     },]}
                        >
                            <Input style={{textTransform:"capitalize"}}  name="description" onChange={handleChange} />
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                        <Form.Item
                            label="E-mail"
                            name="email"
                            rules={[
                                { required: true, message: "Plese Enter Email" },
                            ]}
                        >
                            <Input name="email" onChange={handleChange} />
                        </Form.Item>
                        {error.email && <p className='error' style={{ margin: "-20px 0 5px 0" }}>Please Enter Valid E-mail</p>}
                    </Col>

                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                        <Form.Item
                            label="Configuration Name"
                            name="configurationName"
                        >
                            <Input style={{textTransform:"capitalize"}}  name="configurationName" defaultValue={pipelineState.configurationName} disabled />
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
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
                            <RangePicker disabledDate={disabledDate} defaultValue={[moment()]} onChange={datePickerOnChange} style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                        <Form.Item
                            label="Active"
                            name="status"
                        >
                            <Switch  onChange={switchOnChange} />
                        </Form.Item>
                    </Col>

                    <Col xs={{ span: 5, offset: 1 }} lg={{ span: 10, offset: 0 }}>
                        <Button type="primary" onClick={() => {
                            dispatch(AddForm({ Search: true, AddForm: false }))
                            setDataSearch('');
                            setDataList(false)
                            // setPipelineState(pipelineState)
                        }} className='Pipeline_Back_Button'>Back</Button>
                    </Col>

                    <div style={{display:"flex",width:"97%",justifyContent:"flex-end"}}>
                        <Button onClick={formSubmit} type="primary" htmlType="submit" className='Pipeline_Add_Button'> Create </Button>
                        </div>
                </Row>
            </Form>}
        </div>
    )
}

export default PipelineAdd
