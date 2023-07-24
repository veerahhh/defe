import React, { useEffect, useState } from 'react'
import './Transform.css'
import moment from 'moment';
import axios from 'axios';
import { connectionGet } from '../../../../redux/reducer/connection/ConnectionReducer';
import { connectionDetailGet } from "../../../../redux/reducer/connection/ConnectionDetailReducer"
import { Button, Input, Form, Row, Col, DatePicker, Switch, List, Modal, AutoComplete, Table, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { dTransformGet, dTransformPost, DTransAddForm } from '../../../../redux/reducer/transform/DTransform'
import { DTransform } from '../../../../api/BackEndURL'
import {DtranCreatePop} from '../../../../redux/reducer/transform/DTransform'

function Transform() {

    let URL = process.env.REACT_APP_URL
    const dispatch = useDispatch()
    const [transformState, setTransformState] = useState({
        transformName: '',
        configName: '',
        startDate: '',
        endDate: '',
        schemaName: '',
        status: true
    })

    const [user, setUser] = useState([{ convertDType: "" }])
    let key = 'updatable'

    const columns = [
        {
            title: ' All',
            // dataIndex: 'sno',
            width: '50px',
            // render: (text, object, index) => { return index + 1 },
            // filteredValue: [searchText],
            // onFilter: (value, record) => {
            //   return String(record.tablename).toLowerCase().includes(value.toLowerCase());
            // }
        },
        {
            title: 'Names',
            dataIndex: 'tablename',
            // filteredValue:[searchText],
            // onFilter:(value,record)=>{
            //   return String(record.tablename).toLowerCase().includes(value.toLowerCase());
            // }
        }
    ];

    const [inputField, setInputField] = useState([
        { source: '', target: '' }
    ])
    // console.log(currentDate);
    const { RangePicker } = DatePicker;

    const date = moment();

    const currentDate = date.format('YYYY/MM/DD');
    const daterange = currentDate.split('/')
    const [configId, setConfigId] = useState()
    const [formList, setFormList] = useState(false);
    const [formSearch, setFormSerach] = useState('');
    const [searchText, setSearchText] = useState('');
    const [getschemaname, setSchemaname] = useState([])
    // const [getTarname, setTarname] = useState([])
    const [schemaSourceName, setSchemaSourceName] = useState()
    // const [schemaTargetName, setSchemaTargetName] = useState()
    const ConfigData = useSelector((state) => state.Configuration.ConfigGetData)
    const connDltData = useSelector((state) => state.ConnectionDetail.ConData)
    // console.log(DataType)
    const connData = useSelector((state) => state.Connection.Data)
    const addform = useSelector((state) => state.DTransform.newForm.DTransAddForm)
    const Search = useSelector((state) => state.DTransform.newForm.Search)
    const handleSearch = (e) => {
        setFormSerach(e.target.value)
        e.target.value.length > 0 ? setFormList(true) : setFormList(false)
    }

    useEffect(() => {
        axios.get(`${URL}/select_source_schema/2`).then((response) => {
            console.log(response.data)
            setSchemaname(response.data)
        }).catch(error => {
            console.log(error)
        })
        dispatch(connectionGet(true))
        dispatch(connectionDetailGet(true))

    }, [])

    const filteredData = ConfigData.filter((val) => {
        if (val.is_active === true) {
            return val
        } else if (val.id == true) {
            return val
        }
    })

    //source and target connid
    const srcId = []
    const targetId = []

    const configSrcId = ConfigData.filter((val) => {

        if (val.id === configId) {
            srcId.push(val.Source_conn_det_id)
            targetId.push(val.Target_conn_det_id)
            return srcId, targetId
        }
    })
    console.log(srcId, targetId)

    //connDtlid and srcid is equal will push into connection_id
    const connId = []
    const targetConnId = []
    const connDataId = connDltData.filter((val) => {
        if (val.id === srcId[0]) {
            connId.push(val.connection_id)
            return connId
        }
        if (val.id === targetId[0]) {
            targetConnId.push(val.connection_id)
            return targetConnId
        }
    })

    console.log(connId, targetConnId)
    const data = filteredData.filter((val) => {

        if (formSearch === "") {
            return val;
        } else if (val.config_name.toString().toLowerCase().includes(formSearch.toLowerCase())) {
            return val
        }
    }).map((val) => {
        return {
            id: val.id,
            title: val.config_name,
            srcVal: val.source_connection_name,
            targetVal: val.target_connection_name,
            status: val.is_active,
            srcId: val.Source_conn_det_id,
            tarId: val.Target_conn_det_id,
        }
    })
    //conection
    const dataType = []
    const targetDtypeId = []
    const connDataType = connData.filter((val) => {
        if (val.id === connId[0]) {
            dataType.push(val.d_type)
            return dataType
        }
        if (val.id === targetConnId[0]) {
            targetDtypeId.push(val.d_type)
            return targetDtypeId

        }
    })

    const pairSrc = []
    const pairSource = dataType.map((value, key) => {
        (value.map((val, index) => {
            // console.log(val)
            pairSrc.push(val.datatypes)
        }))

    })
    // console.log(pairSrc)

    const type = []
    const pairTarget = []
    const demo = targetDtypeId.map((val, key) => {

        (val.map((values, index) => {

            return (
                type.push({ value: values.datatypes })
            )
        }))
    })


    const obj = {}
    // console.log(obj)
    const handleChangeInput = (index, event) => {
        const values = [...inputField];
        values[index][event.target.name] = event.target.value;
        setInputField(values)
    }

    const [Tablename, setTableName] = useState(false)

    function onSelectSource(value) {
        showModal()
        setSchemaSourceName(value)
        setTableName(true)
        // ListTables(value)
    }


    const table = []

    const ListTables = getschemaname.map((val, key) => {

        if (schemaSourceName == val.schema_names) {

            (val.table_names).map((val, k) => {
                return (table.push({
                    key: k,
                    tablename: val
                }))
            })
        }
    })
    // console.log(table)
    const createSuccess = () => {
        message.success({ content: 'Created SuccessFully!', key, duration: 2, });
    };

    const switchOnChange = (checked) => {
        setTransformState({ ...transformState, status: checked })
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day')
    };
    const datePickerOnChange = (dates, dateStrings) => {
        setTransformState({ ...transformState, endDate: dateStrings[1], startDate: dateStrings[0] })
    }
    // const ColCreateForm = () => {
    //     dispatch(dTransformPost({
    //         config_id: configId,
    //         transform_name: transformState.tableName,
    //         config_name: transformState.configName,
    //         source_table:transformState.schemaTargetName,
    //         target_table:transformState.schemaSourceName,
    //         start_date: transformState.startDate,
    //         end_date: transformState.endDate,
    //         is_active: transformState.status,
    //         all_tables: makeTrue,
    //         // config_id: JSON.parse(sessionStorage.getItem("id")),
    //     }))
    // }
    // console.log(configId)
    const ColCreateForm = async (e) => {
        const conDType = user.shift()
        const removeLastVal = pairSrc.pop()
        user.map((val, key) => {
            pairTarget.push(val.convertDType)
        })
        pairSrc.forEach((element, index) => {
            obj[element] = pairTarget[index]
        })
        // console.log(obj, pairTarget, pairSrc)
        {
            data.map((val) => {
                // console.log(val)
                DTransform.method.post(`${DTransform.URL.post}`, {
                    config_id: configId,
                    transform_name: transformState.tableName,
                    config_name: transformState.configName,
                    source_name: val.srcVal,
                    target_name: val.targetVal,
                    start_date: val.startDate,
                    end_date: transformState.endDate,
                    is_active: transformState.status,
                    schema_name: transformState.schemaName,
                    source_transform_name: schemaSourceName,
                    source_table_name: SelectedTableList,
                    all_tables: makeTrue,
                    tenant_id: JSON.parse(sessionStorage.getItem("id")),
                    dec_name: "dec_name",
                }).then((res) => {
                    createSuccess(true)
                    dispatch((DtranCreatePop({DtranCreatePop:false})))

                })
            })
        }

    }
    useEffect(() => {
        dispatch(dTransformGet(true))
    }, [])
    const schemalist = []
    const collectSchemaList = getschemaname.map((val, key) => {
        return (
            schemalist.push({ value: val.schema_names })
        )
    })

    const tablelist = []

    const [selectedTables, setSelectedTables] = useState([]);
    const [printtableName, setPrintTableName] = useState([])
    const [selectionType, setSelectionType] = useState('checkbox');
    const options = []
    const [option, setOption] = useState([])

    const [makeTrue, setMakeTrue] = useState(false)
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            console.log(selectedRows)
            selectedRows.map((selectedtablename, i) => {
                options.push({ value: selectedtablename.tablename })

                setOption(options)
                tablelist.push(selectedtablename.tablename)

                setPrintTableName(tablelist.join("\n" + ','))
                setSelectedTables([...selectedTables, tablelist]);


                return tablelist
            })

        }
    }
    // console.log(option)


    // console.log(makeTrue)
    const SelectedTableList = selectedTables[selectedTables.length - 1];
    // console.log(option.length)


    function clearTable() {
        setSelectedTables([])
        setPrintTableName([])
        setTableName(false)
        setMakeTrue(false)
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        Makebool()
        getschemaname.map((val, key) => {
            // console.log(val)
            if (schemaSourceName == val.schema_names) {
                (val.table_names).map((val, k) => {
                    return (table.push({
                        key: k,
                        tablename: val
                    }))
                })
            }
        })

        setIsModalOpen(false);
    };
    // console.log(table)

    const handleCancel = () => {
        setSelectedTables([])
        setPrintTableName([])
        setTableName(false)
        setMakeTrue(false)
        setIsModalOpen(false)
        setIsModalOpen(false);
    };
    function Makebool() {
        if (table.length == option.length) {
            setMakeTrue(true)
        }
        else {
            setMakeTrue(false)
        }
    }

    return (
        <div className='overallColAdd'>
            {Search && <div className='SqlExtract_Search_Parent_Container'>

                <Input.Search className='SqlExtract_Add_Search_Input' onChange={handleSearch} placeholder='Please type a Configuration name ' enterButton />

                {formList && <div className='SqlExtract_Add_Search_Sugg_Box'>

                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (

                            <List.Item onClick={() => {
                                setConfigId(item.id)
                                setTransformState({ ...transformState, configName: item.title })
                                setFormList(false)
                                dispatch(DTransAddForm({ Search: false, DTransAddForm: true }))
                                // setconnDtlSerach(false)
                                // setCreateForm(true)
                            }} className='SqlExtract_Search_List' style={{ height: "60px", cursor: 'pointer', userSelect: 'none', textTransform: "capitalize", fontFamily: "Nunito" }}>
                                <List.Item.Meta
                                    title={<p className='SqlExtract_Search_List_Title_text'>{item.title}</p>}
                                    description={<p className={item.status === true ? "Status_Active_Text" : "Status_InActive_Text"}>{item.status === true ? "Active" : "In_Active"}</p>}
                                />
                            </List.Item>
                        )}
                    />

                </div>}

            </div>}
            {addform && <Form
                name="basic"
                autoComplete="off"
                layout='vertical'
                className='FormContainer'
                style={{ fontFamily: 'Nunito' }}

            >
                <Row gutter={[16, 0]}>


                    <Col lg={{ span: 12, offset: 0 }}>
                        <Form.Item
                            label="Transform Name"
                        // name='transform_name'
                        >
                            {/* <Input style={{ textTransform: 'capitalize' }} placeholder='Enter Your Table Name' name='transform_name' onChange={inputHandle} /> */}
                            <Input style={{ textTransform: 'capitalize' }} placeholder='Enter Your Table Name' name='transform_name' onChange={(e) => { setTransformState({ ...transformState, tableName: e.target.value }) }} />
                            {/* {conanmelist && <p className='error'>Connection name already exist</p>} */}
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12, offset: 0 }}>
                        <Form.Item
                            label="Description"
                        // name="Configuration Name"
                        >
                            <Input style={{ textTransform: 'capitalize' }} name='schema_name' onChange={(e) => { setTransformState({ ...transformState, schemaName: e.target.value }) }} />
                            {/* {conanmelist && <p className='error'>Connection name already exist</p>} */}
                        </Form.Item>
                    </Col>

                    <Col lg={{ span: 12, offset: 0 }}>
                        <Form.Item
                            label="Configuration Name"
                        // name="Configuration Name"
                        >
                            <Input style={{ textTransform: 'capitalize' }} name='config_name' defaultValue={transformState.configName} onChange={(e) => { setTransformState({ ...transformState, configName: e.target.value }) }} disabled />
                            {/* {conanmelist && <p className='error'>Connection name already exist</p>} */}
                        </Form.Item>
                    </Col>


                    <Col lg={{ span: 12, offset: 0 }}>
                        <Form.Item
                            label="Source connection"
                            name="SrcConn "
                            rules={[
                                // { required: true, message: 'Please Enter Sql Validation' },
                                // { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
                            ]}
                        >
                            {data.map((item, index) => {
                                // console.log(item)
                                if (item.id == configId) {
                                    return (
                                        <div key={index}>
                                            <Input style={{ textTransform: "capitalize" }} defaultValue={item.srcVal} disabled />
                                        </div>
                                    )
                                }
                            })}
                        </Form.Item>
                    </Col>

                    <Col lg={{ span: 12, offset: 0 }}>
                        <Form.Item
                            label="Target Connection"
                            name="TarConn"
                            rules={[
                                // { required: true, message: 'Please Enter Sql status'},
                                // { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
                            ]}
                        >
                            {data.map((item, index) => {
                                //console.log(item)
                                if (item.id == configId) {
                                    //console.log(item.id)
                                    return (
                                        <div key={index}>
                                            <Input style={{ textTransform: "capitalize" }} defaultValue={item.targetVal} disabled />
                                        </div>
                                    )
                                }
                            })}
                        </Form.Item>
                    </Col>
                    <Col lg={{ span: 12, offset: 0 }}>
                        <Form.Item
                            label="Source Schema Name"
                            name="Source data name"
                            rules={[
                                { required: true, message: 'Please Enter Source Schema name' },
                            ]}
                        >

                            <AutoComplete
                                style={{ width: 270, textTransform: "capitalize" }}
                                className='srcSchema-inputfeild'
                                options={schemalist}
                                onChange={clearTable}
                                onSelect={onSelectSource}
                                name='convertDType'
                                placeholder="Select Source transform"
                                filterOption={(inputValue, type) =>
                                    type.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                        </Form.Item>
                    </Col>



                    {Tablename &&
                        <>
                            <Modal className='schema-table-modal' title="Select The Table" style={{ top: 10 }} open={isModalOpen} width="75vh" maskClosable={false} onOk={handleOk} ariaHideApp={false} onCancel={handleCancel}
                                footer={[
                                    <div className='schema-btn-modal'>
                                        <Button key="No" onClick={handleCancel}>
                                            Cancel
                                        </Button>,
                                        <Button key="Yes" type="primary" onClick={handleOk}>
                                            Ok
                                        </Button></div>]}
                            >
                                <Input.Search onSearch={(value) => { setSearchText(value) }} onChange={(e) => { setSearchText(e.target.value) }} placeholder='Search here' style={{ marginBottom: 10 }} enterButton />
                                <Table className='tab' rowSelection={{
                                    type: selectionType,
                                    ...rowSelection,
                                }} columns={columns} dataSource={table} pagination={{ pageSize: 5 }} size='middle' />
                            </Modal>
                            <Col lg={{ span: 24, offset: 0 }} >
                                <Form.Item label="Selected Table List">
                                    {makeTrue == false && <p className='schema_selected_data'>{printtableName} <b>are selected.</b></p>}
                                    {makeTrue && <p className='schema_selected_data'><b>All tables are selected.</b> </p>}
                                </Form.Item>
                            </Col>
                            {/* <Drawer className='schema-table-modal' onOk={handleOk} onCancel={handleCancel} width="70vh" onClose={handleCancel} ariaHideApp={false}  
        maskClosable={false} title="Select The Table" open={isModalOpen}
         footer={[
          <div className='schema-btn-modal'>
          <Button  key="No" onClick={handleCancel}>
              Cancel
          </Button>,
          <Button  key="Yes" type="primary" onClick={handleOk}>
              Submit
          </Button></div>]}
        
          >
        <Input.Search  onSearch={(value)=>{setSearchText(value)}} onChange={(e)=>{setSearchText(e.target.value)}} placeholder='Search here' style={{marginBottom:10}} enterButton/>
        <Table  className='tab' rowSelection={{
        type: selectionType,
        ...rowSelection,
      }} columns={columns} dataSource={table} pagination={{ pageSize: 5 }} />
    
      </Drawer>    */}

                        </>
                    }


                    <Col lg={{ span: 24, offset: 0 }}>
                        <Form.Item
                            className="reg-lbl"
                            label="Start Date - End Date"
                            name="StartDatetoEndDate"


                        >
                            <RangePicker disabledDate={disabledDate} defaultValue={[moment()]} onChange={datePickerOnChange} dateFormat style={{ width: "100%" }} />
                        </Form.Item>

                    </Col>


                    <Col lg={{ span: 5, offset: 0 }}>
                        <Form.Item
                            className="reg-lbl"
                            label="Status"
                            name="Status"
                        >
                            <Switch defaultChecked onChange={switchOnChange} />
                        </Form.Item>
                    </Col>


                    <div className='Schema_overall_button'>
                        <Button type="primary" onClick={() => {
                            // setconnDtlSerach(true)
                            // setCreateForm(false)
                            dispatch(DTransAddForm({ Search: true, DTransAddForm: false }))
                            setFormSerach('')
                            setFormList(false)
                            clearTable()
                        }} >Back</Button>


                        <Button type="primary" htmlType="submit" onClick={ColCreateForm}> Create Transform</Button>
                    </div>



                </Row>
            </Form>}
        </div>
    )
}

export default Transform