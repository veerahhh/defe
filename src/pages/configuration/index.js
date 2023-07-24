import React, { Fragment, useEffect, useState } from 'react'
import Header from "../../components/header/Header";
import CommonTable from "../../components/table/CommonTable";
import Footer from "../../components/footer/Footer";
import { useSelector, useDispatch } from 'react-redux'
import { configurationGet, configurationGetOne, ConGetId, ConEditPop, ConViewPop, ConCreatePop } from '../../redux/reducer/configuration/ConfigurationReducer'
import { DTypeEditPop, DTypeViewPop, DTypeCreatePop, DataTypeGet, DataTypeGetOne, DTypeGetId } from '../../redux/reducer/configuration/DataTypeReducer';
import { SchemaMigrateCreatePop, SchemaMigrateViewPop, SchemaMigrateEditPop, SchemaMigrateGet, SchemaMigrateOne, SchemaMigrateId } from '../../redux/reducer/pipeline/SchemamigReducer';
import { SplHandlingCreatePop } from '../../redux/reducer/pipeline/SplHandlingReducer';
import ConfigurationEdit from '../../components/modal/configuration/configuration/edit/ConfigurationEdit'
import ConfigurationCreate from '../../components/modal/configuration/configuration/add/ConfigurationCreate'
import ConfigurationView from '../../components/modal/configuration/configuration/view/ConfigurationView'
import DataTypeEdit from '../../components/modal/configuration/Config Data Mapping/Edit/ConfigDataMapEdit'
import DataTypeView from '../../components/modal/configuration/Config Data Mapping/View/ConfigDataMapView'
import DataTypeAdd from '../../components/modal/configuration/Config Data Mapping/Add/ConfigDataMapAdd'
// import SchemaAdd from '../../components/modal/configuration/schema/Add/SchemaAdd';
// import SchemaEdit from '../../components/modal/configuration/schema/Edit/SchemaEdit';
// import SchemaView from '../../components/modal/configuration/schema/View/SchemaView';
// import SpecialcharAdd from '../../components/modal/configuration/splCharHandling/Add/SpecialAdd';
import { Switch, Modal, Drawer, Space, Button } from 'antd';
import { ActionStatusChanger } from '../../redux/reducer/HeaderReducer'
import * as Fi from 'react-icons/fi';
import * as Fa from 'react-icons/fa';
import * as Ai from 'react-icons/ai';
import Loader from '../../components/loader/Loader'
import moment from 'moment'
import axios from 'axios'
import { redirect, useNavigate } from 'react-router-dom';
import { DTypeAddForm } from '../../redux/reducer/configuration/DataTypeReducer'
import { SchemaAddForm } from '../../redux/reducer/pipeline/SchemamigReducer'
import { SplHandlingAddForm } from '../../redux/reducer/pipeline/SplHandlingReducer'
import * as AI from 'react-icons/ai'

 
let URL = process.env.REACT_APP_URL

function Configuration(props) {
    const { pages } = props

    const dispatch = useDispatch()
    const [open, setOpen] = useState("")
    const [error, setError] = useState([])
    const [loading, setLoading] = useState(false);

    const SearchData = useSelector((state) => state.Header.Search.value)
    const FooterPage = useSelector((state) => state.Header.Footer.page)
    const FooterPageSize = useSelector((state) => state.Header.Footer.pagesize)
    const ConfigEditOpen = useSelector((state) => state.Configuration.newForm.ConEditPop)
    const ConfigCreateOpen = useSelector((state) => state.Configuration.newForm.ConCreatePop)
    const ConfigViewOpen = useSelector((state) => state.Configuration.newForm.ConViewPop)
    const ConfigGetLoader = useSelector((state) => state.Configuration.loader.Loader)
    // console.log(ConfigGetLoader)
    const ConfigurationGetAll = useSelector((state) => state.Configuration.ConfigGetData)
    // console.log(ConfigurationGetAll)
    const DataTypeGetAll = useSelector((state) => state.DataType.DataTypeGetData)
    const SchemaMigrationGetAll = useSelector((state) => state.SchemaMigration.SchemaMigrateGetData)
    // console.log(SchemaMigrationGetAll)
    // console.log(DataTypeGetAll)
    const SchemaMigrationcreateOpen = useSelector((state) => state.SchemaMigration.newForm.SchemaMigrateCreatePop)
    const SchemaMigrationEditOpen = useSelector((state) => state.SchemaMigration.newForm.SchemaMigrateEditPop)
    const SchemaMigrationViewOpen = useSelector((state) => state.SchemaMigration.newForm.SchemaMigrateViewPop)
    // console.log(DataTypeGetAll)
    const SplHandlingcreateOpen = useSelector((state) => state.SpecialHandling.newForm.SplHandlingCreatePop)
    // console.log(DataTypeGetAll)
    const DtypecreateOpen = useSelector((state) => state.DataType.newForm.DTypeCreatePop)
    const DtypeEditOpen = useSelector((state) => state.DataType.newForm.DTypeEditPop)
    const DtypeViewOpen = useSelector((state) => state.DataType.newForm.DTypeViewPop)

    // const showModal = () => {
    //     setIsModalOpen(true);
    //   };

    //   const handleOk = () => {
    //     setIsModalOpen(false);
    //   };

    //   const handleCancel = () => {
    //     setIsModalOpen(false);
    //   };

    useEffect(() => {
        dispatch(configurationGet(true))
        dispatch(DataTypeGet(true))
        dispatch(SchemaMigrateGet(true))
    }, [])

    const DtypeCreateModal = () => {
        dispatch(DTypeCreatePop())
        dispatch(DTypeAddForm({ Search: true, SqlAddForm: false }))

    }
    const DtypeEditModal = () => {
        dispatch(DTypeEditPop())
    }
    const DtypeViewModal = () => {
        dispatch(DTypeViewPop())
    }

    const DTypeCancel = () => {
        dispatch(DTypeAddForm({ Search: true, SqlAddForm: false }))
    }
    const ConfigurationEditModal = () => {
        dispatch(ConEditPop())
    }

    const ConfigurationViewModal = () => {
        dispatch(ConViewPop())
    }

    const ConfigurationCreateModal = () => {
        dispatch(ConCreatePop())
    }
    const SchemaMigrateCreateModal = () => {
        dispatch(SchemaAddForm({ Search: true, SchemaAddForm: false }))
        dispatch(SchemaMigrateCreatePop({ SchemaMigrateCreatePop: false }))
    }
     
    const SplHandlingCreateModal = () => {
        dispatch(SplHandlingAddForm({ Search: true, SplHandlingAddForm: false }))
        dispatch(SplHandlingCreatePop({ SplHandlingCreatePop: false }))
    }

    const SchemaMigrateEditModal = () => {
        dispatch(SchemaMigrateEditPop())
    }
    const SchemaMigrateViewModal = () => {
        dispatch(SchemaMigrateViewPop())
    }
    const SchemaCancel = () => {
        dispatch(SchemaAddForm({ Search: true, SchemaAddForm: false }))
    }

    const SpecialCharCancel = () => {
        dispatch(SplHandlingAddForm({ Search: true, SplHandlingAddForm: false }))
    }

    const [play, setPlay] = useState(true)
    // const startSchema = (e, id) => {

    //     if (e == true) {

    //         setPlay(false)
    //     }
    //     else {
    //         setPlay(true)
    //     }
    //     axios.put(`${URL}/schema/${id}`, {
    //         Play: play
    //     }).then((res) => {
    //         console.log(res)
    //     })

    // console.log(e)
    // window.location.reload()
    // redirect('/schema/')


    // axios.get(`https://34.73.32.172:8000/schema_trigger/${id}`)
    // setPlay(e)
    // }
    const [pause, setPause] = useState(false)
    // const pauseSchema = (e, id) => {
    //     if (e == true) {
    //         setPause(false)
    //     }
    //     else {
    //         setPlay(true)
    //     }
    //     axios.put(`${URL}/schema/${id}`, {
    //         Play: pause
    //     }).then((res) => {
    //         console.log(res)
    //     })
    //     window.location.reload()
    // }

    const [no, setNo] = useState(false)
    const handlepop = (e, id) => {
        // console.log(e.Play==false)
        setOpen(true)
        setNo(id)

        if (e == true) {
            setPlay(false)

        } else {
            setPlay(true)
        }


        const msg = "Are you sure want to play..?"
        setError([...error, msg])
        // window.location.reload()
    }

    const handleOk = () => {

        axios.put(`${URL}/schema/${no}`, {
            Play: play
        }).then((res) => {
            console.log(res)
        })
        setError([])
    
            setOpen(false);
      

        // window.location.reload()

    }
    const handleCancel = () => {
        setError([])
        setOpen(false)

    }

    // const [pauseNo, setPauseNo] = useState(false)
    // const handlePauseOk = () => {
    //     axios.put(`${URL}/schema/${pauseNo}`, {
    //         Play: pause
    //     }).then((res) => {
    //         console.log(res)
    //     })
    //     setError([])
     
    //         setModal(false);
    

    //     // window.location.reload()

    // }
    // const handlePauseCancel = () => {
    //     setError([])
    //     setModal(false)

    // }



    // const [modal, setModal] = useState("")
    // const handlePause = (e, id) => {
    //     setModal(true)
    //     setPauseNo(id)
    //     if (e == true) {
    //         setPause(false)
    //     }
    //     else {
    //         setPlay(true)
    //     }


    //     const text = "Are you sure want to pause..?"
    //     setError([...error, text])
    //     // window.location.reload()
    // }
    const configurationAccess = pages.filter((val) => {
        // console.log(val)
        if (val.pages == "configuration") {
            return val
        }
    })

    const configurationColumns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: '50px',
            render: (text, object, index) => { return index + 1 },
            filteredValue: [SearchData],
            onFilter: (value, record) => {
                return String(record.config_name).toLowerCase().includes(value.toLowerCase());
            }
        },
        {
            title: 'Configuration Name',
            dataIndex: 'config_name',
            // sorter: (a, b) => { return a.config_name.localeCompare(b.config_name) },
            width: '250px',
        },

        {
            title: 'Source Connection',
            dataIndex: 'src_Conn',
            width: '230px',
        },
        {
            title: 'Target Connection',
            dataIndex: 'target_Conn',
            width: '220px',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            // sorter: (a, b) => { return a.start_date.localeCompare(b.start_date) },
            width: '220px'
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            // sorter: (a, b) => { return a.end_date.localeCompare(b.end_date) },
            width: '220px'
        },
        {
            title: 'Active',
            dataIndex: 'active',
            width: '90px'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '70px'
        },
    ];
    const dataTypeColumns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: '50px',
            render: (text, object, index) => { return index + 1 },
        },
        {
            title: 'Data Mapping',
            dataIndex: 'data_map_name',
            width: '200px',
        },
        {
            title: 'Database Name',
            dataIndex: 'database_name',
            // sorter: (a, b) => { return a.database_name.localeCompare(b.database_name) },
            width: '200px',
        },

        {
            title: 'Source Connection',
            dataIndex: 'src_Dtype',
            width: '220px',
        },
        {
            title: 'Target Connection',
            dataIndex: 'target_Dtype',
            width: '220px',
        },

        {
            title: 'Action',
            dataIndex: 'action',
            width: '70px'
        },
    ];

    const schemamigcolumns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: '50px',
            render: (text, object, index) => { return index + 1 },
        },
        {
            title: 'Schema Name',
            dataIndex: 'Source_Schema_name',
            width: '200px',
        },
        {
            title: 'Configuration Name',
            dataIndex: 'configure_name',
            // sorter: (a, b) => { return a.configure_name.localeCompare(b.database_name) },
            width: '200px',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            width: '150px',
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            width: '150px',
        },

        {
            title: 'Action',
            dataIndex: 'action',
            width: '70px'
        },
    ];

    const SpecialHandlingColumns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: '50px',
            render: (text, object, index) => { return index + 1 },
        },
        {
            title: 'Handling Name',
            dataIndex: 'name',
            width: '200px',
        },
        {
            title: 'Configuration Name',
            dataIndex: 'configure_name',
            width: '200px',
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            width: '150px',
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            width: '150px',
        },

        {
            title: 'Action',
            dataIndex: 'action',
            width: '70px'
        },
    ];

    const Spl=[]
    const configFilterData = ConfigurationGetAll.filter((val) => {
        if (SearchData === '') {
            return val
        } else if (val.config_name.toString().toLowerCase().includes(SearchData.toLowerCase())) {
            return val
        }
    })

    // console.log(configFilterData)
    // data mapping search
    const dataTypeFilterData = DataTypeGetAll.filter((val) => {
        if (SearchData === '') {
            return val
        } else if (val.datatype_mapping_name.toString().toLowerCase().includes(SearchData.toLowerCase())) {
            return val
        }
    })

    const dType = dataTypeFilterData.map((value) => {
        return (
            {
                database_name: value.config_name,
                data_map_name: value.datatype_mapping_name,
                src_Dtype: value.source_name,
                target_Dtype: value.target_name,
                action: (
                    <div className='Action_Icons'>
                        {configurationAccess.map((val, key) => {
                            return (
                                <Fi.FiEdit size={16} onClick={() => {
                                    dispatch(DTypeGetId({ singleData: value.id }))
                                    dispatch(DataTypeGetOne())
                                    dispatch(DTypeEditPop())
                                }} style={{ cursor: 'pointer', marginRight: '10px', display: ((val.dataMapping.write == true ? "block" : "none")) }} />
                            )
                        })}
                        <Fa.FaEye size={18} onClick={() => {
                            dispatch(DTypeGetId({ singleData: value.id }))
                            dispatch(DataTypeGetOne())
                            dispatch(DTypeViewPop())
                        }} style={{ cursor: 'pointer', marginRight: '20px' }} />
                    </div>
                )

            }
        )
    })
    // console.log(dType)
    const Config = configFilterData.map((val) => {

        return (
            {
                config_name: val.config_name,
                config_description: val.desc,
                src_Conn: val.source_connection_name,
                target_Conn: val.target_connection_name,
                start_date: moment.utc((val.start_date)).format('MM-DD-YYYY'),
                end_date: moment.utc((val.end_date)).format('MM-DD-YYYY'),
                active: (<Switch checked={val.is_active === true ? true : false} />),
                action: (
                    <div className='Action_Icons'>
                        {configurationAccess.map((value, key) => {
                            return (
                                <Fi.FiEdit size={16} onClick={() => {
                                    dispatch(ConGetId({ singleData: val.id }))
                                    dispatch(configurationGetOne())
                                    dispatch(ConEditPop())
                                }} style={{ cursor: 'pointer', marginRight: '10px', display: ((value.write == true ? "block" : "none")) }} />
                            )
                        })}
                        <Fa.FaEye size={18} onClick={() => {
                            dispatch(ConGetId({ singleData: val.id }))
                            dispatch(configurationGetOne())
                            dispatch(ConViewPop())
                        }} style={{ cursor: 'pointer', marginRight: '20px' }} />
                    </div>
                )
            }
        )
    })

    // const schemaMigrationFilterData = SchemaMigrationGetAll.filter((val) => {
    //     if (SearchData === '') {
    //         return val
    //     } else if (val.source_schema_name.toString().toLowerCase().includes(SearchData.toLowerCase())) {
    //         return val
    //     }
    // })

    // const schema = schemaMigrationFilterData.map((val) => {
    //     return (
    //         {
    //             configure_name: val.config_name,
    //             Source_Schema_name: val.schema_name,
    //             start_date: val.start_date,
    //             end_date: val.end_date,
    //             action: (
    //                 <div className='Action_Icons'>
    //                     {configurationAccess.map((value, key) => {
    //                         return (
    //                             <Fi.FiEdit size={16} onClick={() => {
    //                                 dispatch(SchemaMigrateId({ singleData: val.id }))
    //                                 dispatch(SchemaMigrateOne())
    //                                 dispatch(SchemaMigrateEditPop())
    //                             }} 
    //                             // style={{ cursor: 'pointer', marginRight: '15px', display: ((value.schemaMigration.write == true ? "block" : "none")) }}
    //                              />
    //                         )
    //                     })}
    //                     <Fa.FaEye size={18} onClick={() => {
    //                         dispatch(SchemaMigrateId({ singleData: val.id }))
    //                         dispatch(SchemaMigrateOne())
    //                         dispatch(SchemaMigrateViewPop())
    //                     }} style={{ cursor: 'pointer', marginRight: '15px' }} />

    //                     {val.Play == false && <Ai.AiFillPlayCircle size={19} onClick={() => handlepop(val.Play, val.id)}
    //                         style={{ cursor: 'pointer', marginRight: '20px' }} />}

    //                     {val.Play == true && <Ai.AiFillPauseCircle size={19} 
    //                     // onClick={() => handlePause(val.Play, val.id)}
    //                         style={{ cursor: 'pointer', color: '#0c50a3', marginRight: '20px' }} />}

    //                 </div>
    //             )

    //         }
    //     )
    // })
    const configData = (page, pageSize) => {
        return Config.slice((page - 1) * pageSize, page * pageSize);
    };
    const DataType = (page, pageSize) => {
        return dType.slice((page - 1) * pageSize, page * pageSize);
    };
    // const schemamig = (page, pageSize) => {
    //     return schema.slice((page - 1) * pageSize, page * pageSize);
    // };
    // const special = (page, pageSize) => {
    //     return Spl.slice((page - 1) * pageSize, page * pageSize);
    // };


    return (
        <Fragment>
            {ConfigGetLoader ? (
                <Loader/>
                ):(
             <Fragment>
            <Header configuration={configurationAccess} />

            {/* {configurationAccess.map((value, key) => {
                if (value.view == true) {
                    dispatch(ActionStatusChanger({ status: 'Configuration' }))
                    return (
                        <CommonTable configurationColumns={configurationColumns} config={configData(FooterPage, FooterPageSize)} dataTypeColumns={dataTypeColumns} dType={DataType(FooterPage, FooterPageSize)} schemamigcolumns={schemamigcolumns} schemamigData={schemamig(FooterPage, FooterPageSize)} />
                    )
                }else if (value.view == false) {
                    dispatch(ActionStatusChanger({ status: ' DataMapping' }))
                    return (
                        <CommonTable dataTypeColumns={dataTypeColumns} dType={DataType(FooterPage, FooterPageSize)} schemamigcolumns={schemamigcolumns} schemamigData={schemamig(FooterPage, FooterPageSize)}/>
                    )
                }else if (value.view == false) {
                    dispatch(ActionStatusChanger({ status: ' DataMapping' }))
                    return (
                        <CommonTable  schemamigcolumns={schemamigcolumns} schemamigData={schemamig(FooterPage, FooterPageSize)}/>
                    )
                }
            })} */}

            <CommonTable
             configurationColumns={configurationColumns} 
             config={configData(FooterPage, FooterPageSize)} 
             dataTypeColumns={dataTypeColumns} 
             dType={DataType(FooterPage, FooterPageSize)}
            //  schemamigcolumns={schemamigcolumns} 
            //  schemamigData={schemamig(FooterPage, FooterPageSize)} 
            //  SpecialHandlingColumns={SpecialHandlingColumns}
            //  SpecialHandlingData={special(FooterPage, FooterPageSize)}
              />

            <Drawer title=" New Configuration" open={ConfigCreateOpen} maskClosable={false} onClose={ConfigurationCreateModal} ariaHideApp={false} width='80vh'
            footer={[
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                
                extra={
                    <Space >
                        <Button onClick={ConfigurationCreateModal}>Cancel</Button>
                    </Space>
                }
            >
                < ConfigurationCreate />
            </Drawer>

            <Drawer title="Configuration Edit" open={ConfigEditOpen} maskClosable={false} onClose={ConfigurationEditModal} ariaHideApp={false} width='95vh'
            footer={[
                <div style={{padding:'12px 20px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
      
            >

                <ConfigurationEdit />
            </Drawer>

            <Drawer title=" Configuration View" open={ConfigViewOpen} maskClosable={false} onClose={ConfigurationViewModal} ariaHideApp={false} width='80vh' footer={null}
            // extra={
            //     <Space>
            //         <Button onClick={ConfigurationViewModal}>Cancel</Button>
            //     </Space>
            // }
            >
                <ConfigurationView />
            </Drawer>

            <Modal width='60vh'
                open={open}
                onOk={handleOk}
                closable={false}
                onCancel={handleCancel}
                footer={[
                    <Button key="No" onClick={handleCancel}>
                        No
                    </Button>,
                    <Button key="Yes" type="primary" onClick={handleOk}>
                        Yes
                    </Button>]}
            >
                <div style={{ display: "flex", gap: ".3rem", fontFamily: "Nunito", fontWeight: 500, fontSize: "15px" }}>
                    <AI.AiOutlineInfoCircle style={{ fontSize: "22px", color: "#0c50a3" }} /> {error}
                </div>
            </Modal>
      
            <Drawer title=" New DataType " open={DtypecreateOpen} maskClosable={false} onClose={DtypeCreateModal} ariaHideApp={false} width='80vh'
            footer={[
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                extra={
                    <Space onClick={DTypeCancel}>
                        <Button onClick={DtypeCreateModal}>Cancel</Button>
                    </Space>
                }
            >
                < DataTypeAdd />
            </Drawer>
            <Drawer title="Data Type View " open={DtypeViewOpen} maskClosable={false} onClose={DtypeViewModal} width='85vh' ariaHideApp={false} footer={null}
            // extra={
            //     <Space>
            //         <Button onClick={DtypeViewModal}>Cancel</Button>
            //     </Space>
            // }
            >
                < DataTypeView />
            </Drawer>
            <Drawer title="Edit Data Type " open={DtypeEditOpen} maskClosable={false} onClose={DtypeEditModal} width='85vh' ariaHideApp={false}
            footer={[ 
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
            // extra={
            //     <Space>
            //         <Button onClick={DtypeEditModal}>Cancel</Button>
            //     </Space>
            // }
            >
                < DataTypeEdit />
            </Drawer>

            {/* <Drawer title=" New Schema Migration " open={SchemaMigrationcreateOpen} maskClosable={false} onClose={SchemaMigrateCreateModal} ariaHideApp={false} width='85vh'  
            footer={[ 
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                extra={
                    <Space onClick={SchemaCancel}>
                        <Button onClick={SchemaMigrateCreateModal}>Cancel</Button>
                    </Space>
                }
            >
                < SchemaAdd />
            </Drawer> */}
            {/* <Drawer title=" Schema Migration Edit " open={SchemaMigrationEditOpen} maskClosable={false} onClose={SchemaMigrateEditModal} width='85vh' ariaHideApp={false} footer={null}
            extra={
                <Space>
                    <Button onClick={SchemaMigrateEditModal}>Cancel</Button>
                </Space>
            }
            >
                < SchemaEdit />
            </Drawer> */}
            {/* <Drawer title=" Schema Migration View " open={SchemaMigrationViewOpen} maskClosable={false} onClose={SchemaMigrateViewModal} width='85vh' ariaHideApp={false} footer={null}
            extra={
                <Space>
                    <Button onClick={SchemaMigrateViewModal}>Cancel</Button>
                </Space>
            }
            > 
                < SchemaView />
            </Drawer> */}

            {/* <Drawer title=" New Special char " open={SplHandlingcreateOpen} maskClosable={false} onClose={SplHandlingCreateModal} ariaHideApp={false} width='85vh'  
            footer={[
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                extra={
                    <Space onClick={SpecialCharCancel}>
                        <Button onClick={SplHandlingCreateModal}>Cancel</Button>
                    </Space>
                }
            >
                < SpecialcharAdd />
            </Drawer> */}
            
            <Footer configData={configFilterData.length} DataType={dataTypeFilterData.length} />
            </Fragment>
          )}
            </Fragment>
    )
}

export default Configuration