import React, { Fragment, useState, useEffect } from 'react'
import { Modal, Table, Button, Spin, Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import * as Fa from 'react-icons/fa';
import { Excel } from "antd-table-saveas-excel";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuditSearchGet } from '../../../redux/reducer/audit/AuditReducer';
import { SchemaMigrateGet } from '../../../redux/reducer/pipeline/SchemamigReducer'
import { Form, Row, Col, Input, Drawer, Space } from 'antd'
// import './popUp/PopUp.css'
import './UtilityTool.css'
import { Dropdown, Select } from 'antd';
import Loader from '../../../components/loader/Loader';
import Header from "../../header/Header";


export default function Viewsrc() {
    const dispatch = useDispatch()

    let URL = process.env.REACT_APP_URL

    const [draw, setDrawer] = useState(false);
    const [spin, setspin] = useState(false)
    const openDrawer = () => {
        setDrawer(true);

    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const handleClose = () => {
        setDrawer(false);
        setEnableTable(false)
        setEnableForm(false)
    };
    useEffect(() => {
        dispatch(AuditSearchGet(true))
        dispatch(SchemaMigrateGet(true))
        // dispatch(ConnectionDetailGet(true))
    }, [])
    const demo = useSelector((state) => state.Audit.AuditGetData)
    // console.log(demo)

    const [isLoading, setIsLoading] = useState(false);

    const auditGetLoader = useSelector((state) => state.Audit.loader.Loader);

    // console.log("auditGetLoader value:", auditGetLoader);
    //     if (auditGetLoader) {
    //     console.log("Loader is being rendered");
    //     } else {
    //     console.log("Loader is not being rendered");
    // }

    const postgresscolumns = [
        {
            title: 'S.No.',
            dataIndex: 'id',
            key: 'sno',
            width: '100px'
        },
        {
            title: 'Database',
            dataIndex: 'database',
            key: 'database',
            width: '100px'

        },
        {
            title: 'Schema',
            dataIndex: 'schema',
            key: 'schema',
            width: '100px'
        },
        {
            title: 'Table Name',
            dataIndex: 'table',
            key: 'tablename',
            width: '100px'
        },
        {
            title: 'Table Size',
            dataIndex: 'table_size',
            key: 'tablesize',
            width: '100px'
        },
        // {
        //     title: 'Column Name',
        //     dataIndex: 'column_name',
        //     key: 'column'table_size,
        // },
        {
            title: 'Source ',
            dataIndex: 'source',
            key: 'srcdatatype',
            width: '100px'
        },
        {
            title: 'Target ',
            dataIndex: 'target',
            key: 'tgtdatatype',
            width: '100px'
        },
        {
            title: 'Row Count',
            dataIndex: 'row_count',
            key: 'rowcount',
            width: '100px'
        },
        // {
        //     title: 'Source DB',
        //     dataIndex: 'datatype',
        //     key: 'srcdb',
        // },
        // {
        //     title: 'Target DB',
        //     dataIndex: 'target_data_type',
        //     key: 'tgtdb',
        // },
        // {
        //     title: 'Original position',
        //     dataIndex: 'orginal_position',
        //     key: 'originalposition',
        // },
    ];
    const postgresscolumns2 = [
        {
            title: 'S.No.',
            dataIndex: 'id',
            key: 'sno',
        },
        {
            title: 'Database',
            dataIndex: 'database',
            key: 'database',
            width: '100px'
        },
        {
            title: 'Schema',
            dataIndex: 'schema',
            key: 'schema',
        },
        {
            title: 'Table Name',
            dataIndex: 'table',
            key: 'tablename',
        },
        {
            title: 'Table Size',
            dataIndex: 'table_size',
            key: 'tablesize',
        },
        {
            title: 'Column Name',
            dataIndex: 'column_name',
            key: 'column',
        },
        {
            title: 'Source ',
            dataIndex: 'source',
            key: 'srcdatatype',
        },
        {
            title: 'Target ',
            dataIndex: 'target',
            key: 'tgtdatatype',
        },
        {
            title: 'Row Count',
            dataIndex: 'row_count',
            key: 'rowcount',
        },
        {
            title: 'Source DB',
            dataIndex: 'datatype',
            key: 'srcdb',
        },
        {
            title: 'Target DB',
            dataIndex: 'target_data_type',
            key: 'tgtdb',
        },
        {
            title: 'Original position',
            dataIndex: 'orginal_position',
            key: 'originalposition',
        },
    ];
    const sqlcolumns = [
        {
            title: 'S.No.',
            dataIndex: 'id',
            key: 'sno',
            width: '100px'
        },
        {
            title: 'Schema',
            dataIndex: 'schema',
            key: 'schema',
            width: '100px'
        },
        {
            title: 'Table Name',
            dataIndex: 'table',
            key: 'tablename',
            width: '100px'
        },
        {
            title: 'Table Size',
            dataIndex: 'table_size',
            key: 'tablesize',
            width: '100px'
        },
        // {
        //     title: 'Column Name',
        //     dataIndex: 'column_name',
        //     key: 'column'table_size,
        // },
        {
            title: 'Source ',
            dataIndex: 'source',
            key: 'srcdatatype',
            width: '100px'
        },
        {
            title: 'Target ',
            dataIndex: 'target',
            key: 'tgtdatatype',
            width: '100px'
        },
        {
            title: 'Row Count',
            dataIndex: 'row_count',
            key: 'rowcount',
            width: '100px'
        },
        // {
        //     title: 'Source DB',
        //     dataIndex: 'datatype',
        //     key: 'srcdb',
        // },
        // {
        //     title: 'Target DB',
        //     dataIndex: 'target_data_type',
        //     key: 'tgtdb',
        // },
        // {
        //     title: 'Original position',
        //     dataIndex: 'orginal_position',
        //     key: 'originalposition',
        // },
    ];
    const sqlcolumns2 = [
        {
            title: 'S.No.',
            dataIndex: 'id',
            key: 'sno',
        },

        {
            title: 'Schema',
            dataIndex: 'schema',
            key: 'schema',
        },
        {
            title: 'Table Name',
            dataIndex: 'table',
            key: 'tablename',
        },
        {
            title: 'Table Size',
            dataIndex: 'table_size',
            key: 'tablesize',
        },
        {
            title: 'Column Name',
            dataIndex: 'column_name',
            key: 'column',
        },
        {
            title: 'Source ',
            dataIndex: 'source',
            key: 'srcdatatype',
        },
        {
            title: 'Target ',
            dataIndex: 'target',
            key: 'tgtdatatype',
        },
        {
            title: 'Row Count',
            dataIndex: 'row_count',
            key: 'rowcount',
        },
        {
            title: 'Source DB',
            dataIndex: 'datatype',
            key: 'srcdb',
        },
        {
            title: 'Target DB',
            dataIndex: 'target_data_type',
            key: 'tgtdb',
        },
        {
            title: 'Original position',
            dataIndex: 'orginal_position',
            key: 'originalposition',
        },
    ];
    const columns = [
        {
            title: 'S.No.',
            dataIndex: 'id',
            render: (text, object, index) => { return index + 1 },
            width: '100px'
        },
        {
            title: "Table Name",
            dataIndex: "tableName",
            responsive: ["sm"]
        },
        {
            title: "Column Name",
            dataIndex: "tableSchema",
            responsive: ["sm"]
        },
        {
            title: "Data Type",
            dataIndex: "tableCatalog",
            responsive: ["sm"]
        },
        {
            title: "Ordinal Position",
            dataIndex: "bytes",


        },
        {
            title: "Row Count",
            dataIndex: "rowCount",


        }
    ];

    const [listofsource, setListOFSource] = useState([])
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    // const ConfigData = useSelector((state) => state.Audit.ConfigGetData)
    // const ConfigGetLoader = useSelector((state) => state.Audit.loader.Loader)

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        // console.log('Clicked cancel button');
        setOpen(false);
    };
    const subAction = useSelector((state) => state.Header.ActionButton.status)
    // console.log(subAction)
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [password, setPassword] = useState();
    const [account, setAccount] = useState();
    const [warehouse, setWarehouse] = useState();
    const [schema, setSchema] = useState();
    const [role, setRole] = useState();
    const [database, setDatabase] = useState();
    const [enableForm, setEnableForm] = useState(false);
    const [enableTable, setEnableTable] = useState(false);
    const [chngeHeader, setChangeHeader] = useState(true)
    const [conndetails, setconndetails] = useState(false)
    const [hostset, sethostset] = useState(false)
    const [portset, setPortset] = useState(false)
    const [host, sethost] = useState(false)
    const [port, setPort] = useState(false)

    const [snowsubmit, setsnowsubmit] = useState(false)
    const [sqlsubmit, setsqlsubmit] = useState(false)
    const [postgressubmit, setpostgressubmit] = useState(false)
    const [sheet1, setSheet1] = useState([])
    const [sheet2, setSheet2] = useState([])
    const [selectedValue, setSelectedVal] = useState('')

    const enabledata = () => {
        setEnableForm(false)
        setEnableTable(false)
        setconndetails(false)
        setChangeHeader(true)
    };
    const onChange = (value) => {

        // console.log(`selected ${value}`);
        setSelectedVal(value)
        if (value == "SnowFlake") {
            setEnableForm(true)
            setpostgressubmit(false)
            setconndetails(true)
            setEnableTable(false)
            setChangeHeader(false)
            sethostset(false)
            setPortset(false)
            setsnowsubmit(true)
            setsqlsubmit(false)

        }
        if (value == "Postgres") {
            setpostgressubmit(true)
            setsnowsubmit(false)
            sethostset(true)
            setPortset(true)
            setEnableForm(true)
            setconndetails(true)
            setEnableTable(false)
            setChangeHeader(false)
            setsqlsubmit(false)

        }
        if (value == "Sqlserver") {
            setsnowsubmit(false)
            setpostgressubmit(false)
            setsqlsubmit(true)
            sethostset(true)
            setPortset(true)
            setEnableForm(true)
            setconndetails(true)
            setEnableTable(false)
            setChangeHeader(false)
        }

    };
    const opensqlSource = (e) => {
        setspin(true)
        // setEnableTable(true)
        axios.post(`${URL}/auditsql/`,
            {
                user: user,
                host: host,
                port: port,
                database: database,
                password: password
                // host:"34.135.2.29",
                // port:"1433",
                // user:"sa",
                // password:"mssql-labs1",
                // database:"testDB",                       


            }).then((response) => {
                setspin(false)
                // console.log(response.data[0])
                setSheet1(response.data[0])
                setSheet2(response.data[1])
                setEnableTable(true)
            })
    }
    const opensnowSource = (e) => {
        setspin(true)
        // setEnableTable(true) 
        axios.post(`${URL}/auditsf/`,
            {
                user: user,
                database: database,
                password: password,
                warehouse: warehouse,
                account: account,
                schema: schema,
                role: role
                // user:"MUKESH",
                // password:"Mukesh@97",
                // account:"hzb33720.us-east-1",
                // database:"hub",
                // warehouse:"COMPUTE_WH",
                // schema:"PUBLIC",                  

            }).then((response) => {
                setspin(false)
                // console.log(response.statusText)

                setSheet1(response.data[0])
                setSheet2(response.data[1])
                setEnableTable(true)
            })
    }
    const openSource = (e) => {
        setspin(true)
        // setEnableTable(true)
        axios.post(`${URL}/audit/`,
            {
                user: user,
                host: host,
                port: port,
                database: database,
                password: password
                // user:"vishwa",
                // database:"vishwa",
                // password:"Vishwa@6",
                // host:"34.125.249.183",
                // port:"5432"                  
            }).then((response) => {
                setspin(false)
                console.log(response.data[0])

                setSheet1(response.data[0])
                setSheet2(response.data[1])
                setEnableTable(true)
            })
    }

    const [movies, setMovie] = useState([])
    const handleClick = () => {
        const excel = new Excel();
        excel
            .addSheet("sheet2")
            .addColumns(postgresscolumns2)
            .addDataSource(sheet2, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
        const excel1 = new Excel();
        excel1
            .addSheet("sheet1")
            .addColumns(postgresscolumns)
            .addDataSource(sheet1, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };

    const SchemaMigrationGetAll = useSelector((state) => state.SchemaMigration.SchemaMigrateGetData)
    // console.log(SchemaMigrationGetAll)
    const [id, setId] = useState(0);
    const [postData, setPostData] = useState([])
    const [loading, setLoading] = useState(false)
    // const[page,setPage]=useState(1)
    const [totalPages, setTotalPages] = useState(1)



    // const id=[]
    const onChangePost = (value) => {
        SchemaMigrationGetAll.forEach((val) => {
          if (val.schema_name === value) {
            setIsLoading(true);
            
            axios.get(`${URL}/post_audit/${val.id}`)
              .then((response) => {
                console.log(response);
                setPostData(response.data);
                setIsLoading(false);
              })
              .catch((error) => {
                console.error(error);
                setIsLoading(false);
              });
          }
        });
      };
    // console.log(postData)


    const data = postData.map((item) => {
        console.log(item)
        return ({
            tableName: item.TABLE_NAME,
            tableSchema: item.COLUMN_NAME,
            tableCatalog: item.DATA_TYPE,
            bytes: item.ORDINAL_POSITION,
            rowCount: item.ROW_COUNT

        })
    })
    // console.log(data)

    const filterData = []
    const filterSchema = SchemaMigrationGetAll.filter((val) => {
        if (val.is_active === true) {
            return (filterData.push({ id: val.id, value: val.schema_name }))
        }

    })
    // console.log(filterData)


    return (
        <Fragment>
            {auditGetLoader ? (
                <Loader/>) : (
                <Fragment>
                    <div className='total-container'>
                        <Header />
                        {!enableTable && <div className='form-container'  style={{ display: ((subAction == "Audit" ? "block" : "none")) }}>
                            {/* {chngeHeader&&<h2 style={{color:"black",marginLeft:"20px",padding:"10px"}}>Select the source of data</h2>}
            {conndetails&&<h2 style={{color:"black",marginLeft:"20px",padding:"10px"}}>Please enter your valid connection details</h2>} <hr/> */}
          
                            <div>
                                <>

                                    <div className='selectconnect'>
                                        <label >Select the Source</label>
                                        <Select

                                            showSearch
                                            placeholder="Select a Source Data"
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            // onSearch={onSearch}
                                            onClick={openDrawer}
                                            defaultValue={'SnowFlake'}
                                            style={{ width: "300px", marginLeft: "30px", textTransform: "capitalize", fontFamily: "Nunito" }}
                                            filterOption={(input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                            }
                                            options={[
                                                {
                                                    value: 'SnowFlake',
                                                    label: 'SnowFlake',
                                                },
                                                {
                                                    value: 'Postgres',
                                                    label: 'Postgres',
                                                },
                                                {
                                                    value: 'Sqlserver',
                                                    label: 'Sqlserver',
                                                },
                                            ]}
                                        />
                                    </div>



                                    {/* <Drawer onClose={handleClose} open={draw} width="80vh" title={` ${selectedValue} Database Details`}> */}
                                    {/* <div className='Connectform' style={{display:"flex",justifyContent:"center",alignItems:"center",height:"500px",marginTop:"50px"}}> */}

                                    <Form className='form' name="basic" autoComplete="off" layout='vertical' size='medium' style={{ marginTop: '40px', fontFamily: "Nunito" }}>
                                        {/* <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"500px",width:"700px"}}> */}
                                        <Row gutter={[16, 0]}>
                                            {/* <div style={{display:"flex"}} > */}
                                            {/* <div> */}
                                            <Col lg={{ span: 8, offset: 0}}>
                                                <Form.Item
                                                    label="User"
                                                    className='label-field'
                                                    name="User"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter the user',
                                                        },
                                                    ]}
                                                >
                                                    <Input className='custom-input' style={{ textTransform: "capitalize" }} name="user" onChange={(e) => { setUser(e.target.value) }} />
                                                </Form.Item>
                                            </Col>
                                            <Col lg={{ span: 8, offset: 0 }}>
                                                <Form.Item
                                                    label="Password"
                                                    name="Password"
                                                    className='label-field'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter the password',
                                                        },
                                                    ]}
                                                >
                                                    <Input className='custom-input' style={{ textTransform: "capitalize"}} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                                                </Form.Item>
                                            </Col>
                                            {/* { enableOracle == false&&<> */}
                                            {/* <Col lg={{ span: 8, offset: 0 }}>
                                                <Form.Item
                                                    label="Role"
                                                    name="Role"
                                                    className='label-field'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter the Role',
                                                        },
                                                    ]}
                                                >
                                                    <Input style={{ textTransform: "capitalize" }} name="warehouse" onChange={(e) => { setRole(e.target.value) }} />
                                                </Form.Item>
                                            </Col> */}
                                            {!portset &&
                                                <>
                                                    <Col lg={{ span: 8, offset: 0 }}>
                                                        <Form.Item
                                                            label="Warehouse"
                                                            name="Warehouse"
                                                            className='label-field'
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Please Enter the Warehouse',
                                                                },
                                                            ]}
                                                        >
                                                            <Input className='custom-input' style={{ textTransform: "capitalize" }} name="warehouse" onChange={(e) => { setWarehouse(e.target.value) }} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col lg={{ span: 8, offset: 0 }}>
                                                        <Form.Item
                                                            label="Role"
                                                            name="Role"
                                                            className='label-field'
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Please Enter the Role',
                                                                },
                                                            ]}
                                                        >
                                                            <Input className='custom-input' style={{ textTransform: "capitalize" }} name="warehouse" onChange={(e) => { setRole(e.target.value) }} />
                                                        </Form.Item>
                                                    </Col>
                                                </>
                                            }
                                            {/* </>} */}
                                            {portset && <Col lg={{ span: 8, offset: 0 }}>
                                                <Form.Item
                                                    label="Port"
                                                    name="Port"
                                                    className='label-field'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter the Port ',
                                                        },
                                                    ]}
                                                >
                                                    <Input className='custom-input' style={{ textTransform: "capitalize" }} name="port" onChange={(e) => { setPort(e.target.value) }} />
                                                </Form.Item>
                                            </Col>}
                                            {/* </div>
                        <div>                             */}
                                            <Col lg={{ span: 8, offset: 0 }}>
                                                <Form.Item
                                                    label="Database"
                                                    name="Database"
                                                    className='label-field'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter the Datebase',
                                                        },
                                                    ]}
                                                >
                                                    <Input className='custom-input' style={{ textTransform: "capitalize" }} name="database" onChange={(e) => { setDatabase(e.target.value) }} />
                                                </Form.Item>
                                            </Col>
                                            {!hostset && <Col lg={{ span: 8, offset: 0 }}>
                                                <Form.Item
                                                    label="Schema"
                                                    name="Schema"
                                                    className='label-field'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter the Schema ',
                                                        },
                                                    ]}
                                                >
                                                    <Input className='custom-input' style={{ textTransform: "capitalize" }} name="schema" onChange={(e) => { setSchema(e.target.value) }} />
                                                </Form.Item>
                                            </Col>}
                                            {hostset && <Col lg={{ span: 8, offset: 0 }}>
                                                <Form.Item
                                                    label="Host"
                                                    name="Host"
                                                    className='label-field'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter the Host ',
                                                        },
                                                    ]}
                                                >
                                                    <Input className='custom-input' style={{ textTransform: "capitalize" }} name="host" onChange={(e) => { sethost(e.target.value) }} />
                                                </Form.Item>
                                            </Col>}
                                            {!hostset && <Col lg={{ span: 8, offset: 0 }}>
                                                <Form.Item
                                                    label="Account"
                                                    name="Account"
                                                    className='label-field'
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter the Account',
                                                        },
                                                    ]}
                                                >
                                                    <Input className='custom-input' style={{ textTransform: "capitalize" }} name="account" onChange={(e) => { setAccount(e.target.value) }} />
                                                </Form.Item>
                                            </Col>}

                                            {/* </div>
                        </div> */}
                                            {/* <Modal style={{ top: 260 }} open={spin} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
                            <Loader />
                    </Modal> */}
                                            <div style={{display: "flex" }} className='utilitybutton'>
                                                <Button className='submitbtn' onClick={enabledata} type="primary" > Back </Button>
                                                {!snowsubmit && !sqlsubmit && postgressubmit && <Button className='submitbtn' onClick={openSource} type="primary" htmlType="submit" > Submit </Button>}
                                                {!sqlsubmit && !postgressubmit && <Button className='submitbtn' onClick={opensnowSource} type="primary" htmlType="submit" > Submit </Button>}
                                                {sqlsubmit && !snowsubmit && !postgressubmit && <Button className='submitbtn' onClick={opensqlSource} type="primary" htmlType="submit" > Submit </Button>}
                                            </div>
                                        </Row>


                                    </Form>
                                    {/* </Drawer> */}

                                </>
                            </div>
                        </div>}
                        {enableTable &&
                            <div style={{ width: "100%" }}>
                                <div style={{ width: "98%", textAlign: "right", marginBottom: '20px' }}>
                                    <Button style={{ color: "#0C50A3", width: "110px", height: "40px", marginRight: '10px' }} onClick={enabledata}>Close</Button>
                                    <Button style={{ width: "120px", height: "40px", backgroundColor: "#0C50A3", color: "white" }} onClick={handleClick}><Fa.FaDownload style={{ marginRight: '10px' }} />Download</Button>
                                </div>
                                {/* {  <Spin indicator={antIcon}  />;} */}
                                {!sqlsubmit && <><div style={{ overflowX: "auto", height: "480px" }}>
                                    <Table columns={postgresscolumns} scroll={{ y: true, x: true }} dataSource={sheet1} id="table-to-xls" pagination={false} loading={{ indicator: <div><Spin /></div>, spinning: !sheet1 }} />
                                </div>
                                    {!enableTable &&
                                        <div style={{ overflowX: "auto", height: "400px" }}>
                                            <Table columns={postgresscolumns2} scroll={{ y: true }} dataSource={sheet2} id="table-to-xls" pagination={false} loading={{ indicator: <div><Spin /></div>, spinning: !sheet1 }} />
                                        </div>}
                                </>}

                                {sqlsubmit && <><div style={{ overflowX: "auto", height: "480px" }}>
                                    <Table columns={sqlcolumns} scroll={{ y: true, x: true }} dataSource={sheet1} id="table-to-xls" pagination={false} loading={{ indicator: <div><Spin /></div>, spinning: !sheet1 }} />
                                </div>
                                    {!enableTable && <div style={{ overflowX: "auto", height: "400px" }}>
                                        <Table columns={sqlcolumns2} scroll={{ y: true }} dataSource={sheet2} id="table-to-xls" pagination={false} loading={{ indicator: <div><Spin /></div>, spinning: !sheet1 }} />
                                    </div>}
                                </>}
                            </div>
                        }
                    </div>
                    <div style={{ display: ((subAction == "PostAudit" ? "block" : "none")) }}>
                        <div className='overallPost'>
                            <div className='selectPost'>
                                <label >Select the Source</label>
                                <Select
                                    showSearch
                                    style={{
                                        width: 160,
                                    }}
                                    className='sltPst'
                                    placeholder="Select a Target"
                                    optionFilterProp="children"
                                    onChange={onChangePost}
                                    onSearch={onSearch}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={filterData}
                                />
                            </div>
                            {isLoading ? (<Loader />) : (
                            <div >
                                <Table className='postTable' loading={loading}  columns={columns} dataSource={data} >
                                    <Pagination  pageSize={5} showQuickJumper />
                                </Table>
                            </div>
                            )}
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}