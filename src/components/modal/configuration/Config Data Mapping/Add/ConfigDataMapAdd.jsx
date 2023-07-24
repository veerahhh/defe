import React, { useState, useEffect } from 'react'
import './ConfigDataMapAdd.css'
import { Row, Button, Form, Select, Input, Col, List, AutoComplete } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { connectionGet } from '../../../../../redux/reducer/connection/ConnectionReducer'
import { connectionDetailGet } from "../../../../../redux/reducer/connection/ConnectionDetailReducer"
import { DataTypeGet, DataTypePost, DTypeAddForm } from "../../../../../redux/reducer/configuration/DataTypeReducer"


function ConfigDataMapAdd() {
  const dispatch = useDispatch()
  const [configId, setConfigId] = useState()
  const [dataMapName, setDataMapName] = useState()
  const [connDtlSerach, setconnDtlSerach] = useState(true);
  const [createForm, setCreateForm] = useState(false);
  const [databaseName, setDatabaseName] = useState('')
  const [formList, setFormList] = useState(false);
  const [formSearch, setFormSerach] = useState('');
  const [user, setUser] = useState([{ convertDType: "" }])



  // console.log(configId)
  const dTypeConfig = useSelector((state) => state.Configuration.ConfigGetData)
  const connDltData = useSelector((state) => state.ConnectionDetail.ConData)
  const DataType = useSelector((state) => state.DataType.DataTypeGetData)
  // console.log(DataType)
  const connData = useSelector((state) => state.Connection.Data)
  //  console.log(dTypeConfig,connDltData,DataType,connData)
  const addform = useSelector((state) => state.DataType.newForm.DTypeAddForm)
  const Search = useSelector((state) => state.DataType.newForm.Search)

  useEffect(() => {
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
  //source and target of connId
  const srcId = []
  const targetId = []

  const configSrcId = dTypeConfig.filter((val) => {


    if (val.id === configId) {
      srcId.push(val.Source_conn_det_id)
      targetId.push(val.Target_conn_det_id)
      return srcId, targetId
    }
  })
  // console.log(srcId, targetId)

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

  // console.log(connId,targetConnId)

  const data = filteredData.filter((val) => {
    if (formSearch === "") {
      return val;
    }
    else if (val.config_name.toString().toLowerCase().includes(formSearch.toLowerCase())) {
      return val
    }
  }).map((val) => {
    // console.log(val)
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

  //drop down data from Connection
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
  // console.log(dataType,targetDtypeId)

  //changing object data to array
  const pairSrc = []
  const pairSource = dataType.map((value, key) => {
    (value.map((val, index) => {
      console.log(val)
      pairSrc.push(val.datatypes)
    }))

  })
  // console.log(pairSrc)

  const type = []
  const pairTarget = []
  const demo = targetDtypeId.map((val, key) => {
    // console.log(val)
    (val.map((values, index) => {
      console.log(values.datatypes)
      return (
        type.push({ value: values.datatypes })
      )
    }))
  })
  // console.log(pairTarget,type)
  // console.log(data)

  const obj = {}

  function onSelect(value) {
    setUser([...user, { convertDType: value }]);

  }
  // console.log(user)

  const CreateDataType = async (e) => {
    const conDType = user.shift()
    const removeLastVal = pairSrc.pop()
    if (databaseName.length > 0) {
      user.map((val, key) => {
        pairTarget.push(val.convertDType)
      })
      pairSrc.forEach((element, index) => {
        obj[element] = pairTarget[index]
      })
      console.log(obj, pairTarget, pairSrc)
      {
        data.map((val) => {
          // console.log({val:val.id,config:configId})
          if (val.id == configId) {
            return (
              dispatch(DataTypePost({
                config_id: configId,
                datatype_mapping_name: dataMapName,
                config_name: databaseName,
                source_name: val.srcVal,
                target_name: val.targetVal,
                source_id: val.srcId,
                target_id: val.tarId,
                tenant_id: JSON.parse(sessionStorage.getItem("id")),
                datatype: obj,
              }))
            )
          }
        })
      }
    }
    // window.location.reload()
  }

  return (

    <div className='dataTypeCreate_overall'>

      {Search && <div className='dataType_Search_Parent_Container'>

        <Input.Search className='dataType_Add_Search_Input' onChange={handleSearch} placeholder='Please type Configuration Name ' enterButton />

        {formList && <div className='dataType_Add_Search_Sugg_Box'>

          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item onClick={() => {
                setConfigId(item.id)
                setDatabaseName(item.title)
                setFormList(false)
                dispatch(DTypeAddForm({ Search: false, DTypeAddForm: true }))
                // setconnDtlSerach(false)
                // setCreateForm(true)
              }} className='dataType_Search_List' style={{ height: "60px", cursor: 'pointer', userSelect: 'none', textTransform:"capitalize",fontFamily:'Nunito'}}>
                <List.Item.Meta
                  title={<p className='dataType_Search_List_Title_text'>{item.title}</p>}
                  description={<p className={item.status === true ? "Status_Active_Text" : "Status_InActive_Text"}>{item.status === true ? "Active" : "In_Active"}</p>}
                />
              </List.Item>
            )}
          />

        </div>}
      </div>}

      {addform && <Form name="basic" autoComplete="off" layout='vertical' size='medium'  style={{fontFamily:'Nunito'}}>
        <Row gutter={[16, 0]} >
          <Col xs={{ span: 5, offset: 0 }} lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Database Name"
              name="Database_Name"
            // initialValue={databaseName}

            >
              <Input style={{ textTransform: 'capitalize' }} defaultValue={databaseName} disabled />
            </Form.Item>
          </Col>


          <Col lg={{ span: 12, offset: 0 }}>
            <Form.Item
              label="Source connection"
              name="SrcConn "

            >
              {data.map((item, index) => {
                // console.log(item)
                if (item.id == configId) {
                  return (
                    <div key={index}>
                      <Input style={{ textTransform: 'capitalize' }} defaultValue={item.srcVal} disabled />
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

            >
              {data.map((item, index) => {
                //console.log(item)
                if (item.id == configId) {
                  //console.log(item.id)
                  return (
                    <div key={index}>
                      <Input style={{ textTransform: 'capitalize' }} defaultValue={item.targetVal} disabled />
                    </div>
                  )
                }
              })}
            </Form.Item>
          </Col>
          <Col lg={{ span: 24, offset: 0 }}>
            <Form.Item
              label="Data Mapping Name"
              name="datatype_mapping_name"
              rules={[
                {
                  required: true,
                  message: 'Please Enter Data Mapping Name',

                },
              ]}
            >
              <Input style={{ textTransform: "capitalize" }} onChange={(e) => { setDataMapName(e.target.value) }} />
            </Form.Item>
          </Col>
          <Col xs={{ span: 5, offset: 1 }} lg={{ span: 20, offset: 0 }}>
            <Form.Item
              label="Pre-defined Data Type"
              name="datatype"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please enter datatypes',
              //     transform: (v) => v.toUpperCase(),
              //   },

              // ]}
            >
              <div className='dType_acc_overall'>
                {dataType.map((val, index) => {
                  // console.log(val)
                  return (
                    <div className='dType_box' key={index}>
                      <div>
                        {val.map((values, key) => {
                          //  console.log(values)
                          return (
                            <div className='dType_boxOne' key={key}>
                              <div>
                                <input style={{ textAlign: "center", padding: "3px", marginTop: "10px" ,textTransform:'capitalize'}}
                                  className='dType_input'
                                  name='source'
                                  label="Source Dtype"
                                  defaultValue={(values.datatypes)}
                                  disabled
                                />
                              </div>
                              <Form.Item
                         
                              >
                                <AutoComplete 
                                 style={{ width: 200, }}
                                  className='datatype-inputfeild'
                                  options={type}
                                  onSelect={onSelect}
                                  name='convertDType'
                                  placeholder="Enter Your Target Datatype"
                                  filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                  }

                                />
                              </Form.Item>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )

                })}
              </div>
            </Form.Item>
          </Col>
          <div className='datatype_overall_button'>
            <Button type="primary" onClick={() => {
              // setconnDtlSerach(true)
              // setCreateForm(false)
              dispatch(DTypeAddForm({ Search: true, DTypeAddForm: false }))
              setFormSerach('')
              setFormList(false)
            }}>Back</Button>

            <Button type="primary" htmlType="submit"  onClick={CreateDataType}> Create </Button>

          </div>
        </Row>
      </Form>}

    </div>

  )
}

export default ConfigDataMapAdd