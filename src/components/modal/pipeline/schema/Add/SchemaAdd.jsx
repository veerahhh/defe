import React from 'react'
import { useState, useEffect } from 'react'
import './SchemaAdd.css'
import { message, Modal } from 'antd'
import axios from 'axios'
import moment from 'moment';
import { Row, Button, Form, Select, Input, Col, List, DatePicker, Drawer, Space, Switch, AutoComplete, Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { connectionGet } from '../../../../../redux/reducer/connection/ConnectionReducer';
import { connectionDetailGet } from "../../../../../redux/reducer/connection/ConnectionDetailReducer"
import { DataTypeGet, DataTypePost } from "../../../../../redux/reducer/configuration/DataTypeReducer"
import { SchemaMigrateCreatePop, SchemaAddForm, SchemaMigrateTableCreatePop } from '../../../../../redux/reducer/pipeline/SchemamigReducer';
import { SchemaMigrate, SchemaTrigger } from '../../../../../api/BackEndURL'

// const { TextArea } = Input;

export default function SchemaAdd() {

  let URL = process.env.REACT_APP_URL
  const dispatch = useDispatch()
  const [configId, setConfigId] = useState()
  const [schemaName, setSchemaName] = useState()
  const [schemaSourceName, setSchemaSourceName] = useState()
  const [schemaTargetName, setSchemaTargetName] = useState()
  const [email, setEmail] = useState()
  const [connDtlSerach, setconnDtlSerach] = useState(true)
  const [searchText, setSearchText] = useState('');
  const [databaseName, setDatabaseName] = useState()
  const [formList, setFormList] = useState(false);
  const [formSearch, setFormSerach] = useState('');
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [status, setStatus] = useState()

  const [user, setUser] = useState([{ convertDType: "" }])
  let key = 'updatable'


  const { RangePicker } = DatePicker;

  const date = moment();

  const currentDate = date.format('YYYY/MM/DD');

  // const month =moment().month();
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

  console.log(currentDate);
  const daterange = currentDate.split('/')

  const month = daterange[1]
  const day = daterange[2]
  const year = daterange[0]
  // console.log(daterange)

  // console.log(day)

  const [inputField, setInputField] = useState([
    { source: '', target: '' }
  ])

  const dTypeConfig = useSelector((state) => state.Configuration.ConfigGetData)
  console.log(dTypeConfig)
  const connDltData = useSelector((state) => state.ConnectionDetail.ConData)
  const DataType = useSelector((state) => state.DataType.DataTypeGetData)
  // console.log(DataType)
  const connData = useSelector((state) => state.Connection.Data)
  const addform = useSelector((state) => state.SchemaMigration.newForm.SchemaAddForm)
  const Search = useSelector((state) => state.SchemaMigration.newForm.Search)
  const [getschemaname, setSchemaname] = useState([])
  const [getTarname, setTarname] = useState([])
  // console.log(connDetlData)

  useEffect(() => {
    axios.get(`${URL}/select_source_schema/2`).then((response) => {
      // console.log(response.data)
      setSchemaname(response.data)
    }).catch(error=>{
      console.log(error)
    })
    dispatch(connectionGet(true))
    dispatch(connectionDetailGet(true))
    dispatch(DataTypeGet(true))
  }, [])

  useEffect(() => {
    axios.get(`${URL}/select_target_schema/2`).then((res) => {
      // console.log(res.data)
      setTarname(res.data)
    }).catch(error=>{
      console.log(error)
    })
    dispatch(connectionGet(true))
    dispatch(connectionDetailGet(true))
    dispatch(DataTypeGet(true))
  }, [])

  const handleSearch = (e) => {
    setFormSerach(e.target.value)
    e.target.value.length > 1 ? setFormList(true) : setFormList(false)
  }

  // filtering the status
  const filteredData = dTypeConfig.filter((val) => {
    if (val.is_active === true) {
      return val
    }
  })

  //source and target connid
  const srcId = []
  const targetId = []

  const configSrcId = dTypeConfig.filter((val) => {

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

  console.log(connId,targetConnId)

  const data = filteredData.filter((val) => {
    if (formSearch === "") {
      return val;
    }
    else if (val.config_name.toString().toLowerCase().includes(formSearch.toLowerCase())) {
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
    // console.log(val)
    (val.map((values, index) => {
      // console.log(values.datatypes)
      return (
        type.push({ value: values.datatypes })
      )
    }))
  })
  // console.log(pairTarget)
  // console.log(data)

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
  function onSelectTarget(value) {
    setSchemaTargetName(value)

  }

  const table = []
  // const [keys, setKeys] = useState(0)
  const ListTables = getschemaname.map((val, key) => {
    console.log(val)
    if (schemaSourceName == val.schema_names) {
      // console.log(val.table_names)
      (val.table_names).map((val, k) => {
        return (table.push({
          key: k,
          tablename: val
        }))
      })
    }
  })


  const tarTable = []
  // const [srckeys, setSrcKeys] = useState(0)
  const TarTables = getTarname.map((val, key) => {
    console.log(val)
    if (schemaTargetName == val.schema_names) {
      // console.log(val.table_names)
      (val.table_names).map((val, k) => {
        return (tarTable.push({
          key: k,
          tablename: val
        }))
      })
    }
  })




  const datePickerOnChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0])
    setEndDate(dateStrings[1])
  }
  const switchOnChange = (checked) => {
    setStatus(checked)
  };

  const createSuccess = () => {
    message.success({ content: 'Created SuccessFully!', key, duration: 2, });
  };


  const CreateDataType = async (e) => {
    const conDType = user.shift()
    const removeLastVal = pairSrc.pop()
    user.map((val, key) => {
      pairTarget.push(val.convertDType)
    })
    pairSrc.forEach((element, index) => {
      obj[element] = pairTarget[index]
    })
    console.log(obj, pairTarget, pairSrc)
    {
      data.map((val) => {
        SchemaMigrate.method.post(`${SchemaMigrate.URL.post}`, {
          config_id: configId,
          config_name: databaseName,
          source_name: val.srcVal,
          target_name: val.targetVal,
          start_date: val.startDate,
          end_date: endDate,
          status: status,
          email:email,
          target_schema_name: schemaTargetName,
          source_schema_name: schemaSourceName,
          schema_name: schemaName,
          source_table_name: SelectedTableList,
          Play: false,
          all_tables: makeTrue,
          tenant_id: JSON.parse(sessionStorage.getItem("id")),
          dec_name: "dec_name",
        }).then((res) => {
          createSuccess(true)
          dispatch(SchemaMigrateCreatePop({ SchemaMigrateCreatePop: false }))
          SchemaTrigger.method.put(`${SchemaTrigger.URL.put}/${res.data.data.id}`).then((res) => {
          })
          console.log(res.data.data.id)
        })
      })
    }

  }
  const schemalist = []

  const collectSchemaList = getschemaname.map((val, key) => {
    console.log(val)
    return (
      schemalist.push({ value: val.schema_names })
    )
  })
  const Tarschemalist = []

  const collectTArSchemaList = getTarname.map((item, key) => {

    return (
      Tarschemalist.push({ value: item.schema_names })
    )
  })
  const tablelist = []
  // console.log({ schemaTargetName: schemaTargetName }, { schemaSourceName: schemaSourceName })
  const [selectedTables, setSelectedTables] = useState([]);
  const [printtableName, setPrintTableName] = useState([])
  const [selectionType, setSelectionType] = useState('checkbox');
  const options = []
  const [option, setOption] = useState([])
  // console.log(option)
  const [makeTrue, setMakeTrue] = useState(false)
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      // console.log(selectedRows)
      selectedRows.map((selectedtablename, i) => {
        options.push({ value: selectedtablename.tablename })
        // console.log(options)
        setOption(options)
        tablelist.push(selectedtablename.tablename)
        // console.log(tablelist)
        setPrintTableName(tablelist.join("\n" + ','))
        setSelectedTables([...selectedTables, tablelist]);
        // console.log(option.length)
        // console.log(table.length)

        return tablelist
      })

    }
  }


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
      if (schemaSourceName == val.schema_names) {
        (val.table_names).map((val, k) => {
          return (table.push({
            key: k,
            tablename: val
          }))
        })
      }
    })
    getTarname.map((item, key) => {
      if (schemaTargetName == item.schema_names) {
        (item.table_names).map((val, k) => {
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
    <div className='SchemaCreate_overall'>
      {Search && <div className='Schema_Search_Parent_Container'>
        <Input.Search className='Schema_Add_Search_Input' onChange={handleSearch} placeholder='Please type Configuration Name ' enterButton />
        {formList && <div className='Schema_Add_Search_Sugg_Box'>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item onClick={() => {
                setConfigId(item.id)
                setDatabaseName(item.title)
                setFormList(false)
                dispatch(SchemaAddForm({ Search: false, SchemaAddForm: true }))
                //   setconnDtlSerach(false)
                //   setCreateForm(true)

              }} className='dataType_Search_List' style={{ height: "60px", cursor: 'pointer', userSelect: 'none', textTransform: 'capitalize', fontFamily: 'Nunito' }}>
                <List.Item.Meta
                  title={<p className='dataType_Search_List_Title_text'>{item.title}</p>}
                  description={<p className={item.status === true ? "Status_Active_Text" : "Status_InActive_Text"}>{item.status === true ? "Active" : "In_Active"}</p>}
                />
              </List.Item>
            )}
          />

        </div>}
      </div>}
      {addform && 
      <Form className='schemaForm' style={{ fontFamily: 'Nunito' }} name="basic" autoComplete="off" layout='vertical' size='medium'>
        <Row gutter={[16, 0]} >
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Configuration Name"
              name="Configuration name"
              // initialValue={databaseName}
              rules={[
                // { required: true, message: 'Please Enter database name' },
                // { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
              ]}
            >
              <Input style={{ textTransform: "capitalize" }} defaultValue={databaseName} disabled />
            </Form.Item>
          </Col>
          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Schema Name"
              name="Schema Name"
              rules={[
                { required: true, message: 'Please Enter Schema Name address' },
                // { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
              ]}
            >
              <Input onChange={((e) => { setSchemaName(e.target.value) })} />
            </Form.Item>
          </Col>
          {/* <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                { required: true, message: 'Please Enter Email Name address' },
                // { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
              ]}
            >
              <Input onChange={((e) => { setEmail(e.target.value) })} />
            </Form.Item>
          </Col> */}
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
              {/* <Input onChange={(e) => { setSchemaName(e.target.value) }} /> */}
              <AutoComplete
                style={{ width: 200, textTransform: "capitalize" }}
                className='srcSchema-inputfeild'
                options={schemalist}
                onChange={clearTable}
                onSelect={onSelectSource}
                name='convertDType'
                placeholder="Enter Your Source Schema"
                filterOption={(inputValue, type) =>
                  type.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
          </Col>

          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Target Schema Name"
              name="Target data name"
              rules={[
                { required: true, message: 'Please Enter Target Schema name' },
              ]}
            >
              {/* <Input onChange={(e) => { setSchemaName(e.target.value) }} /> */}
              <AutoComplete
                style={{ width: 200, textTransform: "capitalize" }}
                className='tarSchema-inputfeild'
                options={Tarschemalist}
                onSelect={onSelectTarget}
                name='convertDType'
                placeholder="Enter Your target Schema"
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

          <Col lg={{ span: 12, offset: 0 }}>
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
              <RangePicker onChange={datePickerOnChange} disabled={[true, false]} defaultValue={[moment()]} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col lg={{ span: 5, offset: 3 }}>
            <Form.Item
              label="Active"
              name="status"
            >
              <Switch defaultChecked onChange={switchOnChange} />
            </Form.Item>
          </Col>
   <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                { required: true, message: 'Please Enter Email Name address' },
                // { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
              ]}
            >
              <Input onChange={((e) => { setEmail(e.target.value) })} />
            </Form.Item>
          </Col>



          <div className='Schema_overall_button'>
            <Button type="primary" onClick={() => {
              // setconnDtlSerach(true)
              // setCreateForm(false)
              dispatch(SchemaAddForm({ Search: true, SchemaAddForm: false }))
              setFormSerach('')
              setFormList(false)
              clearTable()
            }} >Back</Button>


            <Button type="primary" htmlType="submit" onClick={CreateDataType}> Create </Button>
          </div>
        </Row>
      </Form>}
    </div>

  )
}