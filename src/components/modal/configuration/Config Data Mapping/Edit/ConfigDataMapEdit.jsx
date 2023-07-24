import React from 'react'
import './ConfigDataMapEdit.css'
import { Row, Button, Form, Input, Col, message, Select } from 'antd'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { DataTypePut, DataTypeGet } from '../../../../../redux/reducer/configuration/DataTypeReducer'
import { useState, useEffect } from 'react';
import { connectionGet } from '../../../../../redux/reducer/connection/ConnectionReducer'
import { connectionDetailGet } from "../../../../../redux/reducer/connection/ConnectionDetailReducer"

function ConfigDataMapEdit() {
  const dispatch = useDispatch()
  const connData = useSelector((state) => state.Connection.Data)  
  const dtypes = []
  const { Option } = Select
  const getOneData = useSelector((state) => state.DataType.getOneData)
  console.log(getOneData)
  const connDltData = useSelector((state) => state.ConnectionDetail.ConData)
//   const [duplicate,setDuplicate]=useState([])
// const [user, setUser] = useState(dtypes)

 
// console.log(user,dtypes)

  useEffect(() => {
    dispatch(connectionGet(true))
    dispatch(connectionDetailGet(true))
    dispatch(DataTypeGet(true))
  }, [])

  // const type = []
  // const [conid,setConid]=useState([])
  // // console.log(conid)
  //  const dtypelength= connData.map((val,i)=>{    
  //   // const findlen = []
  //    if(conid==val.id){
  //     // console.log(val.dtype.length)
  //     const lens = val.d_type.length
    
  //     return lens
  //     }
  // }) 
 
//   const findlenofdtype = dtypelength[0]

//   const demo = (e,dtype) => {  
//     // console.log(dtype)
//     if(dtypes.length<=0){
//     dtypes.push(dtype)
    
//     connDltData.map((values, i) => {
//          if (e == values.id)
//         connData.map((val) => {
//           if (val.id == values.connection_id) {
//             // console.log(conid)
//             if(conid<=2){
//             setConid(val.id)           
//           }                      //findlengthofDtype(val.id)                   
//             val.d_type.map((v) => {                       
//               Object.entries(v).map((i) => {   
//                 // console.log(i)                                      
//                 if (typeof (i[1]) !== "number" && duplicate !== i[1] && type.length <= findlenofdtype-1){
//                    duplicate.push(i[1])
//                   //  console.log(type.push({value: i[1]}))
//                    return (type.push({value: i[1] }))
                 
//                 //}
//                  }
//                 //  console.log(type)   
//               }
//               )
//             })
//           }
//         })
//     })
// }
//   }



  //   function onSelect(value) {
 
  //   Object.entries(dtypes[0]).map((v,k)=>{
  //     v.map((index,k)=>{
  //       if(k==0){
  //         const new_obj = { ...user, [index]: value}
  //         return setUser(new_obj)
  //       }
  
  //     })
      
  //   })
  
  // }
  // console.log(user)

  const handleData=()=>{
    message.info('This update module in progress...');
  }
  return (
    <div className='Dtype_EditForm_Parent_Container'>

      {getOneData.map((val) => {
        // console.log(val)
        return (
          <Form name="basic" autoComplete="off" layout='vertical' size='medium' key={val.id}  style={{fontFamily:'Nunito'}}>
            <Row gutter={[16, 0]} >
              <Col lg={{ span: 22, offset: 0 }}>
                <Form.Item
                  label="Database Name"
                  name="database name"
                  // initialValue={DatabaseName(val.id)}
                  rules={[
                  ]}

                >
                      <Input style={{textTransform:'capitalize'}} disabled defaultValue={val.config_name} />

                </Form.Item>

              </Col>

              <Col lg={{ span: 22, offset: 0 }}>
                <Form.Item
                  label="Data Mapping Name"
                  name="data name"
                  rules={[
                    // { required: true, message: 'Please Enter data mapping name' },
                  ]}
                >
                  <Input style={{textTransform:'capitalize'}} disabled defaultValue={val.datatype_mapping_name} />
                </Form.Item>
              </Col>

              <Col lg={{ span: 11, offset: 0 }}>
                <Form.Item
                  label="Source connection"
                  name="SrcConn "
                  rules={[
                  ]}
                >
                <Input style={{textTransform:'capitalize'}} disabled defaultValue={val.source_name} />
                </Form.Item>

              </Col>

              <Col lg={{ span: 11, offset: 0 }}>
                <Form.Item
                  label="Target Connection"
                  name="TarConn"
                  rules={[
                  ]}
                >
                  <Input style={{textTransform:'capitalize'}} disabled defaultValue={val.target_name} />
                </Form.Item>
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 22, offset: 0 }}>
                <Form.Item
                  label="Pre-defined Data Type"
                  name="predatatype"
                  rules={[
                  ]}
                >
                  <div className='dType_acc_overall'>
                    <div className='dType_box'>
                      {Object.entries(val.datatype).map((item, key) => {
                        return (
                          <div className='dType_boxOne' key={key}>
                            <div>
                              <input style={{ textAlign: "center", marginLeft: "5px", padding: "5px", marginTop: "10px" ,textTransform:'capitalize'}}
                                className='dType_input'
                                name='source'
                                label="Source Dtype"
                                defaultValue={item[0]}
                                disabled
                              />
                            </div>
                            <Form.Item className='d_type_select' >
                              <Select
                                style={{
                                  width: '150px',textTransform:"capitalize"
                                }}
                                placeholder="select Datatype"
                                defaultValue={item[1]}
                                // onSelect={onSelect}
                                // options={type}
                                // onChange={demo(val.target_id,val.datatype)}
                                // onSelect={onSelect(item[0],item[1])}
                               >
                           </Select>
                         
                           </Form.Item>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </Form.Item>
              </Col>
              <div className='dataType_Edit_Buttn'>  
        
                <Button type="primary" htmlType="submit"  onClick={handleData} > Update </Button>
         
              </div>
            </Row>
          </Form>
        )
      })}
    </div>
  )
}



export default ConfigDataMapEdit