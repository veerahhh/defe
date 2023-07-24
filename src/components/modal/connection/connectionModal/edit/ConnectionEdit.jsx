import React, { useState, useEffect } from 'react'
import { DatePicker, Form, Button } from 'antd';
import { Col, Input, Row, Switch } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux'
import { connectionPutId } from '../../../../../redux/reducer/connection/ConnectionReducer';

function ConnectionEdit() {

  const dispatch = useDispatch()
  const upadateConnection = useSelector((state) => state.Connection.getOneData)

  const [newdates, setNewDates] = useState([])
  const [keyParam, setKeyparam] = useState([])
  const [isActive, setIsActive] = useState()
  const [description, setDescription] = useState("")

  const { RangePicker } = DatePicker;
  const dateFormat = 'YYYY-MM-DD';

  useEffect(() => {
    if (upadateConnection[0]?.key_param) {
      setKeyparam(upadateConnection[0]?.key_param)
    }
  }, [upadateConnection])


  const UpdateConnection = (e) => {
    dispatch(connectionPutId({

      key_param: keyParam,
      start_date: moment(newdates[0]).format('YYYY-MM-DD'),
      end_date: moment(newdates[1]).format('YYYY-MM-DD'),
      is_active: isActive
    }))
  }

  const mappin = (KeyParam) => {
    const param = []
    KeyParam.map((values) => {
      param.push(values.keyPrams)
      const rmvfrst = param.shift()
      return rmvfrst
    })
  }

  const onChange = (checked) => {
    setIsActive(checked)

  }

  const EditKeyParams = (e, index) => {
    const newArr = keyParam.map(obj => {
      if (obj.id === index) {

        return { ...obj, keyPrams: e.target.value };
      }

      return obj;
    });
    setKeyparam(newArr)
  }

  return (
    <div >
      {upadateConnection.map((values) => {

        return (
          <Form
            name="basic"
            autoComplete="off"
            layout='vertical'
            className='conn-Form-Container'
            key={values.id}
            style={{ fontFamily: 'Nunito' }}
          >
            <Row gutter={[16, 0]}>

              {/* <div className='NewConn-Feilds'> */}
              {/* <div className='flex-twocontainer'>
                  <div className='flex-frstcontainer'> */}
              <Col lg={{ span: 12, offset: 0 }}>
                <Form.Item
                  className="reg-lbl"
                  label="Connection Name"
                  name="ConnectionName"

                >
                  <Input style={{ textTransform: 'capitalize' }} className='newCon-input-feild' disabled placeholder='Enter Your Connection Name' defaultValue={values.connection_name} />
                </Form.Item>
              </Col>
              {/* </div> */}
              {/* <div className='flex-sectcontainer'> */}
              <Col lg={{ span: 5, offset: 4 }}>
                <Form.Item
                  className="reg-lbl"
                  label="Status"
                  name="Status"
                >
                  <Switch defaultChecked={values.is_active} onChange={onChange} />
                </Form.Item>
              </Col>
              {/* </div> */}
              {/* </div> */}
              <Col lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  className="reg-lbl"
                  label="Description"
                  name="Description"

                >
                  <Input style={{ textTransform: 'capitalize' }} disabled className='newCon-input-feild' placeholder='Enter Your Description' defaultValue={values.description} onChange={(e) => { setDescription(e.target.value) }} />

                </Form.Item>
              </Col>
              <Col lg={{ span: 24, offset: 0 }}>
                <Form.Item
                  className="reg-lbl"
                  label="Start Date - End Date"
                  name="StartDatetoEndDate"
                  initialValue={[moment(values.start_date, dateFormat), moment(values.end_date, dateFormat)]}

                >
                  <RangePicker style={{ width: "100%", }}
                    onCalendarChange={(value) => {
                      console.log(value);
                      setNewDates([(value[0]), value[1]]);
                    }}
                    disabled={[true, false]}
                    value={newdates}
                  />
                </Form.Item>

              </Col>
              {/* <div className='flex-twocontainer'>
                <div className='flex-frstcontainer'>
                  <Col lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                      className="reg-lb"
                      label="Connection String Parameter"
                      name="Connection String Parameter"
                      rules={[{ required: true, message: 'Enter Your Connection Parameter' }, { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
                      ]}
                    >
                      <div className='conn-accordian-cont' >
                        <label style={{ marginLeft: "20px" }}>Key Parameter </label>
                        {values.key_param.map((values, index) =>
                          <div className='flex-twocontainer'>
                            <div className='conn-accordian' >


                              <input className='key-inputfld' disabled name='keyParams' style={{ textTransform: "capitalize" }} key={index} defaultValue={values.keyPrams} onChange={(e) => { EditKeyParams(e, index) }} />


                            </div>
                          </div>
                        )}
                      </div>

                    </Form.Item>
                  </Col>
                </div>
                <div className='flex-sectcontainer'>
                  <Col  >
                    <Form.Item
                      className="reg-lb"
                      label="Data Types"
                      name="Data Types"
                      rules={[{ required: true, message: 'Enter Your Data Types' }, { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
                      ]}
                    >
                      <div className='conn-accordian-cont' >
                        <label style={{ marginLeft: "20px" }}>Data Types </label>
                        {values.d_type.map((values, index) =>
                          <div className='flex-twocontainer'>
                            <div className='conn-accordian' >

                              <input className='key-inputfld' disabled style={{ textTransform: 'capitalize' }} name='keyParams' key={index} defaultValue={values.datatypes} />

                            </div>
                          </div>
                        )}
                      </div>
                    </Form.Item>
                  </Col>
                </div>
              </div> */}
              {/* <Col> */}
              <div className='overallConTab'>
                <table className='table'>
                  <thead>
                    <tr className='tr'>
                      <th className='th'>S.No</th>
                      <th className='th'>Key Parameter</th>
                      <th className='th'> Data Types</th>


                    </tr>
                  </thead>
                  <tbody>

                    {values.key_param.map((val, index) => {
                      console.log(val);
                      return (
                        <tr key={index} className='tr'>
                          <td className='td'>{index + 1}</td>
                          <td className='td'>{val.keyPrams}</td>
                          <td className='td'>{values.d_type[index]?.datatypes}</td>
                        </tr>
                      );
                    })}






                  </tbody>
                </table>
              </div>
              {/* </Col> */}

              {/* </div> */}

              <div className='newconnEdit-btn'>

                <Button type='primary'  onClick={UpdateConnection}>Update</Button>
              </div>
            </Row>
          </Form>
        )
      })}
    </div>
  )
}

export default ConnectionEdit