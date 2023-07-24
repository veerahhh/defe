import React, { useState, useEffect } from 'react'
import './ColumnAdd.css'
// import moment from 'moment';
import { Button, Input, Form, Row, Col, Radio, Typography, Steps, Select, Modal, Upload } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { columnGet, columnPost } from '../../../../redux/reducer/decisionhub/Column'
import TextArea from 'antd/lib/input/TextArea';
import { DoubleRightOutlined, PlusOutlined, DeleteOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import FormItem from 'antd/es/form/FormItem';



function ColumnAdd() {

    const dispatch = useDispatch()
    const colData = useSelector((state) => state.Column.ColumnGetData)
    console.log(colData)

    const [formFilled, setFormFilled] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { Step } = Steps;
    const [currentStep, setCurrentStep] = useState(0);
    const [formCount, setFormCount] = useState(0)
    const [modalForm ,setModalForm] = useState(false);
  


      const handleChange = ({ file, fileList }) => {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  };
      


//   const handleChange = (info) => {
//     console.log(info.file, info.fileList);
    
//     if (info.file.status === 'done') {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === 'error') {
//       console.log(info.file.error);
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   };


    // const handleFileUpload = (file) => {
    //     console.log('Uploaded file:', file);
    // };

    // const customRequest = (options) => {
    //     const { file } = options;
    //     handleFileUpload(file);
    // };
   
    const modalpopup = () => {
        setIsPopupVisible(true);
        setCurrentStep(currentStep + 1);
    };

    const hidePopup = () => {
        setIsPopupVisible(false);
    };

    const repeatColumns = () => {
        setFormCount((prev) => prev + 1)
    }
    const deleteRepeatColumns = () => {
        setFormCount((prev) => prev - 1)
    }


    const objectFormHandle = (e) => {
        Form.setFieldsValue({ [e.target.name]: e.target.value });
    };
    const handleBack = () => {
        setCurrentStep(currentStep - 1);
        setIsPopupVisible(false);
        setFormFilled(false);
    };


    const handleFormValuesChange = (changedValues, allValues) => {
        if (allValues.display_name && allValues.description && allValues.radio) {
            setFormFilled(true);
        } else {
            setFormFilled(false);
        }
    };

    const handleModalChange = (changedValues, allValues)=>{
        if (allValues.database_type && allValues.data_type && allValues.constraints && allValues.Default) {
            setModalForm(true);
        } else {
            setModalForm(false);
        }  
    }

    const handleCreateObject = () => {
        setIsPopupVisible(false);
        setCurrentStep(2);
    };


    useEffect(() => {
        dispatch(columnGet(true))
    }, [])

    return (
        <div className='overallColAdd'>
            <div className='stepeer'>
                <Steps current={currentStep}>
                    <Step title={<div className='stepper_title'>Basic</div>}
                        description={currentStep === 0 && 'Add name and description.'} />
                    <Step title={<div className='stepper_title'>Define Structure</div>}
                        description={currentStep === 1 && 'Provide details of the selected source.'} />
                    <Step title={<div className='stepper_title'>Import</div>}
                        description={currentStep === 2} />
                </Steps>

            </div>
            <div style={{ margintop: '60px' }}>
                {currentStep == 0 &&
                    <Form className='Form_Obj' layout="vertical" name="Form" autoComplete="off" onValuesChange={handleFormValuesChange}  >

                        <Col lg={{ span: 20, offset: 0 }} style={{ marginBottom: '-30px', marginTop:'-20px' }}>
                            <Typography className='Display_title'>Display Name</Typography>
                            <Form.Item name="display_name"
                                rules={[{ required: true, message: 'Please Enter Display Name' }]}>
                                <Input name='display_name' className='Display-Form-Input' placeholder='Enter Display name' onChange={objectFormHandle} size="large" />
                            </Form.Item>
                        </Col>
                        <br />
                        <Col lg={{ span: 20, offset: 0 }}>
                            <Typography className='Display_title'>Description</Typography>
                            <Form.Item name="description"
                                rules={[{ required: true, message: 'Please Enter description' }]}>
                                <TextArea name='description' type="text" className='Description-Form-text' placeholder='Enter Description' onChange={objectFormHandle} />
                            </Form.Item>
                        </Col>

                        <br />
                        <Col lg={{ span: 14, offset: 0 }}>
                            <Form.Item name="radio"
                                rules={[{ required: true, message: 'Please Enter description' }]}>
                                <Radio.Group className='Display_title_normal' >
                                    <Radio value='Manual'>Manual</Radio>
                                    <Upload  onChange={handleChange}>
                                    <Radio value='CSV'>CSV</Radio>
                                    </Upload>
                                    
                                </Radio.Group>
                            </Form.Item>
                        </Col>
                        <br />
                        <Col xs={{ span: 24, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                            <div className='Next-Button-Container'>
                                <Button type='primary' className='Next-Button' disabled={!formFilled} onClick={modalpopup}>
                                    Next
                                </Button>
                            </div>
                        </Col>

                    </Form>
                }
                {currentStep == 1 && (
                    <Modal visible={isPopupVisible} closable={false} className='Modal-popup' onCancel={hidePopup} footer={[<Button className='form_btn' disabled={!modalForm} type="primary" onClick={handleCreateObject}>Create Object</Button>,
                    <Button className='form_btn' type="primary" onClick={handleBack}>Back</Button>]} width={770} maskClosable={false}>
                        <div className='object-form-container' >
                            <div className='form_box'>
                                <Typography className='form_title'>Define Structure</Typography>
                            </div>
                            <div className="pageBorder">
                                {[...Array(formCount + 1).keys()].map((item, index) => (
                                    <Form
                                        className='Form_Obj'
                                        layout="horizontal"
                                        name="Form"
                                        autoComplete="off"
                                        onValuesChange={handleModalChange}>
                                    
                                        <Row gutter={[24, 0]}>
                                            <Col lg={{ span: 12, offset: 0 }}>
                                                <Typography className='Display_title'>Attribute Name</Typography>
                                                <Form.Item
                                                name='database_type'
                                                rules={[{ required: true, message: 'Please Enter the Attribute Name' }]}>
                                                <Input name='attribute_name' className="input_name" placeholder='Enter Attribute Name' />
                                                </Form.Item>
                                            </Col>
                                            <Col lg={{ span: 12, offset: 0 }}>
                                                <Typography className='Display_title'>DataType</Typography>
                                                <Form.Item
                                                name='data_type'
                                                rules={[{ required: true, message: 'Please select the data type' }]}>
                                                <Select
                                                    placeholder='Select DataType'
                                                    style={{ width: '100%' }}
                                                    options={[
                                                        { label: 'Text', value: 'decimal' },
                                                        { label: 'DateTime', value: 'datetime' },
                                                    ]} />
                                                    </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={[24, 0]}>
                                            <Col lg={{ span: 12, offset: 0 }}>
                                                <Typography className='Display_title'>Constrains</Typography>
                                                <Form.Item
                                                name='constraints'
                                                rules={[{ required: true, message: 'Please select the Constrains' }]}>
                                                <Select
                                                    placeholder='Select Constraints'
                                                    style={{ width: '100%' }}
                                                    options={[
                                                        { label: 'Required', value: 'required' },
                                                        { label: 'Not Required', value: 'not required' },
                                                        { label: 'Primary', value: 'primary' },
                                                        { label: 'Unique', value: 'unique' },
                                                    ]} />
                                                    </Form.Item>
                                            </Col>
                                            <Col lg={{ span: 12, offset: 0 }}>
                                                <Typography className='Display_title'>Default</Typography>
                                                <Form.Item
                                                name='Default'
                                                rules={[{ required: true, message: 'Please Enter the Database Name' }]}>
                                                <Input name='defaultVal' placeholder='Enter Database Name' />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {/* <div className='reference_container pl2'>
                                            <Typography className='Display_title_normal'>Reference Mapping</Typography>
                                            <Row gutter={[24, 0]}>

                                                <Col lg={{ span: 8, offset: 0 }}>
                                                    <Typography className='Display_title'>Foreign Table</Typography>
                                                    <Select
                                                        placeholder='Select Model Name'
                                                        style={{ width: '100%' }}
                                                    />
                                                </Col>
                                                <Col lg={{ span: 8, offset: 0 }}>
                                                    <Typography className='Display_title'>Foreign Attribute</Typography>
                                                    <Select
                                                        placeholder='Select Columns'
                                                        style={{ width: '100%' }}
                                                        options={[
                                                            { label: 'int', value: 'int' },
                                                        ]}
                                                    />
                                                </Col>
                                                <Col lg={{ span: 7, offset: 0 }}>
                                                    <Typography style={{ color: '#e1e1e1' }} className='Display_title'>Mapping Type</Typography>
                                                    <Select
                                                        placeholder='Select Table'
                                                        style={{ width: '100%' }}
                                                        options={[
                                                            { label: 'int', value: 'int' },
                                                        ]}
                                                    />
                                                </Col>
                                            </Row>
                                        </div> */}
                                        {formCount === index ? <Button type="primary" className="form-button" icon={<PlusOutlined />} onClick={repeatColumns} >Add item</Button> :
                                            <Button danger type="primary" className="form-button" icon={<DeleteOutlined />} onClick={deleteRepeatColumns}>Remove row</Button>}
                                            
                                    </Form>
                                ))}
                            </div>
                        </div>
                    </Modal>)}
                {currentStep == 2 && (
                    <div className='import_container'>
                        <div className="object_success_container"></div>
                        <Typography style={{ fontFamily: 'Nunito Sans', fontWeight: '700', fontSize: '16px', margin: '20px 26% 0' }}>Object created successfully</Typography>
                        <span style={{ fontFamily: 'Nunito Sans', fontSize: '13px', margin: '0px 20%', color: '#667085', lineHeight: '5px' }}>You can start importing data into the object</span>
                        {/* <Upload customRequest={customRequest} showUploadList={false}>
                            <Button
                                style={{ margin: '20px 0 0 140px' }}
                                type="primary"
                                icon={<DownloadOutlined style={{ width: '25px', height: '20px' }} />}>
                                Import Data
                            </Button>
                        </Upload> */}

                        <Upload  onChange={handleChange}>
                            <Button style={{ margin: '20px 0 0 140px' }} type='primary' icon={<DownloadOutlined  style={{ width: '25px', height: '20px' }} />}>Import Data</Button>
                        </Upload>
                        {/* <Button type='link' style={{ margin: '20px 0 0 130px' }} className='source_data_btn'> Back to Data Science</Button> */}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ColumnAdd