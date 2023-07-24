import React, { useState } from 'react'
import { Button, Input, Form, Row, Col, DatePicker, Switch, message, Modal, AutoComplete } from 'antd';
import '../../Connpopup.css'
import moment from "moment"
import { useDispatch, useSelector } from 'react-redux'
import { connectionAdd, connectionReducer } from '../../../../../redux/reducer/connection/ConnectionReducer';
import { useEffect } from 'react';


function ConnectionAdd() {

    const dispatch = useDispatch()
    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY-MM-DD';
    const ConnectionAddData = useSelector((state) => state.Connection.Data)
    const Pipelinedata = useSelector((state) => state.Pipeline.Data)


    const [newconnname, setNewConnname] = useState('')
    const [description, setDescription] = useState('')
    const [isActive, setIsActive] = useState(true)
    const [imgname, setImgname] = useState('');
    const [conanmelist, setConanmelist] = useState(false);
    const [dates, setDates] = useState([])
    const [logoname, setlogoname] = useState([])
    const [count, setCount] = useState(1)
    const [dataTypeCount, setDataTypeCount] = useState(1)
    const [connString, setConnString] = useState([{ id: 0, keyPrams: "" }])
    const [dataTypes, setDataTypes] = useState([{ id: 0, datatypes: "" }])
    const [conStrErr, setConSetErr] = useState(false)
    const [preDefineErr, setPreDefineErr] = useState(false)


    const connames = []

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [dataModalOpen, setDataModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setDataModalOpen(false)
        if (connString.length > 0) {
            setConSetErr(false)
        }
        if (dataTypes.length > 0) {
            setPreDefineErr(false)
        }

    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setDataModalOpen(false)
        setConnString([{ id: 0, keyPrams: "" }])
        setDataTypes([{ id: 0, datatypes: "" }])
    };

    const dataModal = () => {
        setDataModalOpen(true);
    };
    const key = 'updatable';
    const Success = () => {
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
            message.success({ content: 'Created Success Fully!', key, duration: 2, });

        }, 1000);
    };

    const AddConnString = () => {
        setCount(count + 1)
        // console.log(count)
        setConnString([...connString, { id: count, keyPrams: "" }]);
        // console.log(setConnString)
    };

    const RemoveConnString = (index) => {
        // console.log(index)
        const connstrglist = [...connString];
        // console.log(connstrglist)
        connstrglist.pop(index, 1);
        setConnString(connstrglist);
    };

    const handleKeyParams = (e, index) => {
        const { name, value } = e.target;
        const connstrglist = [...connString];
        connstrglist[index][name] = value
        setConnString(connstrglist)
    }
    const AddDatatypes = () => {
        setDataTypeCount(dataTypeCount + 1)
        // console.log(dataTypeCount)
        setDataTypes([...dataTypes, { id: dataTypeCount, datatypes: "" }]);
        // console.log(setDataTypes)
    };

    const RemoveDatatypes = (index) => {
        // console.log(index)
        const datatypelist = [...dataTypes];
        // console.log(datatypelist)
        datatypelist.pop(index, 1);
        setDataTypes(datatypelist);
    };

    const handleDatatypes = (e, index) => {
        const { name, value } = e.target;
        const datatypeslist = [...dataTypes];
        datatypeslist[index][name] = value
        setDataTypes(datatypeslist)
    }
  
  useEffect((handleCancel)=>{
    // const handleCancel
  },[])

    const CreateConnection = async (e) => {
        // const keyParam = connString.pop()
        // console.log(keyParam)
        // console.log(connString, isActive)
        if (/^[\w\s-]+$/.test(description) && connString.length > 0 && dataTypes.length > 1) {
            setConanmelist(false)
            setConSetErr(false)
            setPreDefineErr(false)
            dispatch(connectionAdd({
                connection_name: newconnname,
                logo_name: imgname,
                key_param: connString,
                d_type: dataTypes,
                description: description,
                start_date: moment(dates[0]).format('YYYY-MM-DD'),
                end_date: moment(dates[1]).format('YYYY-MM-DD'),
                is_active: isActive
            }))


        }
        else {
            // if (connames.length < 1) {
            //     setConanmelist(false)
            // }
            // else {
                setConanmelist(true)
            // }
            // if (connString.length < 0) {
            //     setConSetErr(false)
            // }
            // else {
                setConSetErr(true)
            // }
            // if (dataTypes.length < 1) {
            //     setPreDefineErr(false)
            // }
            // else {
                setPreDefineErr(true)
            // }
        }
    }
    const handleChange = (value) => {
        console.log(`selected ${value} hiii`);
    };
    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
        setIsActive(checked)
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().startOf('day')
    };
    const imagelist = () => {
        const imagename = imagenames(require.context('../../Logoimg', false, /\.(png|jpe?g|svg)$/));
        console.log(imagename.length)
        for (let i = 0; i < imagename.length; i++) {
            console.log(imagename[i])
        }
    }

    function imagenames(r) {
        const imagelist = [];
        r.keys().map((item, index) => {
            imagelist.push(item.replace('./', ''));
        })
        return imagelist;
    }
    const imagename = imagenames(require.context('../../Logoimg', false, /\.(png|jpe?g|svg)$/));
    //dropdown imglist for Autocomplete options
    {
        imagename.map((list, key) => {
            console.log(list)
            logoname.push({ value: list })
        }
        )
    }
    // console.log(logoname)
    const Conname = (e) => {
        console.log(e.target.value)
        const connames = [];
        ConnectionAddData.map((value) => { connames.push(value.connection_name) })
        console.log(connames)
        const same = connames.includes(e.target.value)
        if (e.target.value !== 0 && same) {
            return setConanmelist(true)
        }
        else {
            setConanmelist(false)
            return setNewConnname(e.target.value)

        }
    }
    ConnectionAddData.map((value) => { connames.push(value.connection_name) })
    function onSelect(value) {
        setImgname(value)
    }

    return (
        <>
            <div className='NewConn-Container'>

                <Form
                    name="basic"
                    autoComplete="off"
                    layout='vertical'
                    className='conn-Form-Container'
                    style={{ fontFamily: 'Nunito' }}
                >
                    <Row gutter={[16, 0]}>

                        <Col lg={{ span: 12, offset: 0 }}>
                            <Form.Item
                                label="Connection Name"
                                name="Connection Name"
                                initialValue={newconnname}
                            // rules={[{ required: true, message: 'Enter Your Connection Name' }]}
                            >
                                <Input style={{ textTransform: 'capitalize' }} placeholder='Enter Your Connection Name' onChange={(e) => (Conname(e))} />
                                {conanmelist && <p className='error'>Connection name already exist</p>}
                            </Form.Item>
                        </Col>
                        <Col lg={{ span: 5, offset: 4 }}>
                            <Form.Item
                                label="Active"
                                name="Active"
                            >
                                <Switch defaultChecked onChange={onChange} />
                            </Form.Item>
                        </Col>
                        <Col lg={{ span: 12, offset: 0 }}>
                            <Form.Item
                                label="Image Name "
                                name="Logoname "
                                rules={[{ required: true, message: 'Enter Your Logo Name' },
                                { pattern: /(.*[a-z]){0}/, message: 'Field must atleast 3 character' }
                                ]}
                            >
                                <AutoComplete
                                    className='conname-inputfeild'
                                    options={logoname}
                                    onSelect={onSelect}
                                    placeholder="Enter Your Logo Name"

                                />

                            </Form.Item>
                        </Col>

                        {/* <div className='flex-thrdcontainer'>
                                <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                                    <Form.Item
                                        label="Active"
                                        name="Active"
                                    >
                                        <Switch defaultChecked onChange={onChange} />
                                    </Form.Item>
                                </Col>
                            </div> */}

                        <Col lg={{ span: 12, offset: 0 }}>
                            <Form.Item
                                className="reg-lbl"
                                label="Description"
                                name="Description"
                                initialValue={description}
                                rules={[{ required: true, message: 'Enter Your Description ' }, { pattern: /^[\w\s-]+$/, message: 'Field does not allow special characters' }]}
                            >
                                <Input style={{ textTransform: 'capitalize' }} className='newCon-input-feild' placeholder='Enter Your Description' onChange={(e) => (setDescription(e.target.value))} />
                            </Form.Item>
                        </Col>


                        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 0 }}>
                            <Form.Item
                                className="reg-lbl"
                                label="Start Date - End Date"
                                name="StartDatetoEndDate"
                                initialValue={dates}
                                rules={[{ required: true, message: 'Enter Your End Date' },

                                ]}
                            >
                                <RangePicker style={{ width: "100%", }} defaultValue={[moment()]} disabledDate={disabledDate} onCalendarChange={(value) => {
                                    console.log(value);
                                    setDates([value[0], value[1]]);
                                }}

                                    value={dates}
                                />
                            </Form.Item>
                        </Col>

                        <div className='flex-twocontainer'>
                            <div className='flex-frstcontainer'>
                                <Col lg={{ span: 24, offset: 0 }} >
                                    {/* <Form.Item
                                        className="reg-lb"
                                        label="Connection String Parameter"
                                        name="Connection String Parameter"
                                        rules={[
                                            { required: true, message: 'Enter Your Connection Parameter' },
                                             { pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
                                        ]}
                                    > */}



                                    <Modal title='Connection String Parameter' style={{ top: 50 }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} bodyStyle={{ height: 300 }} >

                                        <div className='conDtype_Acc'>
                                            {/* <label className='Conn_Title'>Key Parameter </label> */}
                                            {connString.map((x, i) => {
                                                return (
                                                    <div className='flex-twocontainer'>
                                                        {/* <div className='conn-accordian'> */}
                                                        <input autoFocus={true} placeholder='Ex: id,user,password, etc.' style={{ textTransform: 'capitalize' }} className='key-inputfeild' name='keyPrams' value={x.keyPrams} onChange={(e) => { handleKeyParams(e, i) }} />
                                                        {/* </div> */}

                                                        <div className='addrmv-btn-cont'>
                                                            {connString.length - 1 === i && x.keyPrams != "" && <button onClick={AddConnString}>+</button>}
                                                            {connString.length !== 1 && <button onClick={RemoveConnString}>-</button>}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    </Modal>

                                </Col>
                            </div>
                            {/* <div className='flex-seccontainer'> */}
                            {/* <Col > */}
                            {/* <Form.Item
                                        className="reg-lb"
                                        label="Predefined Datatypes"
                                        name="Predefined Datatypes"
                                        rules={[{ required: true, message: 'Enter Your Predefined Datatypes', pattern: /^[a-zA-Z ]*$/, message: 'Enter The Characters' }
                                        ]}
                                    > */}
                            <Col lg={{ span: 14, offset: 0 }} >
                                <Button className='popUp_btn' onClick={showModal}>Add Connection String</Button>
                                {conStrErr && <p className='error'>Please fill  Connection String </p>}
                            </Col>
                            <Col lg={{ span: 14, offset: 0 }} >
                                <Button className='popUp_btn' onClick={dataModal}>Pre-Defined DataTypes</Button>
                                {preDefineErr && <p className='error'>Please fill Pre-Defined DataTypes</p>}
                            </Col>


                            <Modal title='Pre-Defined Datatypes' style={{ top: 50 }} open={dataModalOpen} onOk={handleOk} onCancel={handleCancel} bodyStyle={{ height: 300 }} >
                                <div className='conDtype_Acc'>
                                    {/* <label className='Conn_Title'>DataType </label> */}
                                    {dataTypes.map((x, i) => {
                                        return (
                                            <div className='flex-twocontainer'>
                                                {/* <div className='conn-accordian'> */}
                                                <input autoFocus={true} placeholder='ex: int,float,str,etc.' style={{ textTransform: 'capitalize' }} className='key-inputfeild' name='datatypes' value={x.datatypes} onChange={(e) => { handleDatatypes(e, i) }} />
                                                {/* </div> */}

                                                <div className='addrmv-btn-cont'>
                                                    {dataTypes.length - 1 === i && x.datatypes != "" && <button onClick={AddDatatypes}>+</button>}
                                                    {dataTypes.length !== 1 && <button onClick={RemoveDatatypes}>-</button>}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Modal>
                            {/* </Form.Item> */}
                            {/* </Col> */}
                        </div>
                        {/* </div> */}




                        <div className='newconn-btn-cont'>
                            <Button htmlType='submit' type='primary'  onClick={CreateConnection}>Create Connection</Button>

                        </div>
                    </Row>
                </Form>
            </div>
        </>
    )
}
export default ConnectionAdd