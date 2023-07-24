import React, { Fragment, useEffect, useState } from 'react'
import Header from "../../components/header/Header";
import CommonTable from "../../components/table/CommonTable";
import Footer from "../../components/footer/Footer";
import { useSelector, useDispatch } from 'react-redux'
import { PipelinedetailGet, PipelinedetailGetOne, GetPipedetailId, CreateModal, EditModal, ViewModal,PplDtlAddForm } from '../../redux/reducer/pipeline/PipelineDetailReducer'
import { pipelineGet, pipelineGetOne, Add, Edit, View, PipeGetId } from '../../redux/reducer/pipeline/PipelineReducer'
import { sqlExtractGet, sqlExtractGetOne, GetId, EditPop, ViewPop, CreatePop } from '../../redux/reducer/pipeline/SqlExtract'
import { SchemaMigrateCreatePop, SchemaMigrateViewPop, SchemaMigrateEditPop, SchemaMigrateGet, SchemaMigrateOne, SchemaMigrateId } from '../../redux/reducer/pipeline/SchemamigReducer';
import { SplHandlingCreatePop } from '../../redux/reducer/pipeline/SplHandlingReducer';
import SchemaAdd from '../../components/modal/pipeline/schema/Add/SchemaAdd';
import SchemaEdit from '../../components/modal/pipeline/schema/Edit/SchemaEdit';
import SchemaView from '../../components/modal/pipeline/schema/View/SchemaView';
import SpecialcharAdd from '../../components/modal/pipeline/splCharHandling/Add/SpecialAdd';
import { SchemaAddForm } from '../../redux/reducer/pipeline/SchemamigReducer'
import { SplHandlingAddForm } from '../../redux/reducer/pipeline/SplHandlingReducer'
import { configurationGet } from '../../redux/reducer/configuration/ConfigurationReducer'
import * as Fi from 'react-icons/fi'
import * as Fa from 'react-icons/fa'
import { Switch, Modal, Drawer, Space, Button } from 'antd';
import moment from 'moment';
import PipelineAddComponent from '../../components/modal/pipeline/pipeline/add/PipelineAdd'
import PipelineEditComponent from '../../components/modal/pipeline/pipeline/edit/PipelineEdit'
import PipelineViewComponent from '../../components/modal/pipeline/pipeline/view/PipelineView'
import Loader from '../../components/loader/Loader'
import SqlExtractEdit from '../../components/modal/pipeline/sqlExtract/edit/SqlExtractEdit';
import SqlExtractView from '../../components/modal/pipeline/sqlExtract/view/SqlExtractView';
import SqlExtractAdd from '../../components/modal/pipeline/sqlExtract/add/SqlExtractAdd';
import PipelineDetailAdd from '../../components/modal/pipeline/pipelinedetail/add/PipelineDetailAdd';
import PipelineDetailsEdit from '../../components/modal/pipeline/pipelinedetail/edit/PipelineDetailEdit'
import PipelineDetailView from '../../components/modal/pipeline/pipelinedetail/view/PipelineDetailView'
import * as Cg from 'react-icons/cg'
import { AddForm } from '../../redux/reducer/pipeline/PipelineReducer'
import { ActionStatusChanger } from '../../redux/reducer/HeaderReducer'
import {SqlAddForm} from '../../redux/reducer/pipeline/SqlExtract'
import * as Ai from 'react-icons/ai';

function Pipeline(props) {
    const { pages } = props

    const dispatch = useDispatch()

    const searchData = useSelector((state) => state.Header.Search.value)
    const footerPage = useSelector((state) => state.Header.Footer.page)
    const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)

    const pipeData = useSelector((state) => state.Pipeline.Data)
    const pipelineAddModalOpen = useSelector((state) => state.Pipeline.modal.Add)
    const pipelineEditModalOpen = useSelector((state) => state.Pipeline.modal.Edit)
    const pipelineViewModalOpen = useSelector((state) => state.Pipeline.modal.View)
    const pipelineGetLoader = useSelector((state) => state.Pipeline.loader.Loader)
    const pipeGetOneData = useSelector((state) => state.Pipeline.GetOneData)

    const configurationGetAll = useSelector((state) => state.Configuration.ConfigGetData)

    const sqlExtractData = useSelector((state) => state.SqlExtract.getData)
    const sqlExtractEditOpen = useSelector((state) => state.SqlExtract.newForm.EditPop)
    const sqlExtractViewOpen = useSelector((state) => state.SqlExtract.newForm.ViewPop)
    const sqlExtractCreateOpen = useSelector((state) => state.SqlExtract.newForm.CreatePop)
    const SqlGetOneData = useSelector((state) => state.SqlExtract.getOneData)

    const pipeDetailData = useSelector((state) => state.PipelineDetail.getPipelineDetailData)
    const pipelineDetailAddModalOpen = useSelector((state) => state.PipelineDetail.newForm.CreatePop)
    const pipelineDetailEditModalOpen = useSelector((state) => state.PipelineDetail.newForm.EditPop)
    const pipelineDetailViewModalOpen = useSelector((state) => state.PipelineDetail.newForm.ViewPop)
    const pipelineDetailGetLoader = useSelector((state) => state.PipelineDetail.loader.Loader)
    const PipeDetailGetOneData = useSelector((state) => state.PipelineDetail.getOneData)
    const PipeDetailGetOne = useSelector((state) => state.PipelineDetail.singleData)

    const SearchData = useSelector((state) => state.Header.Search.value)
    const ConfigurationGetAll = useSelector((state) => state.Configuration.ConfigGetData)
    const SchemaMigrationGetAll = useSelector((state) => state.SchemaMigration.SchemaMigrateGetData)
    const [play, setPlay] = useState(true)
    const [open, setOpen] = useState("")
    const [error, setError] = useState([])
    const SchemaMigrationcreateOpen = useSelector((state) => state.SchemaMigration.newForm.SchemaMigrateCreatePop)
    const SchemaMigrationEditOpen = useSelector((state) => state.SchemaMigration.newForm.SchemaMigrateEditPop)
    const SchemaMigrationViewOpen = useSelector((state) => state.SchemaMigration.newForm.SchemaMigrateViewPop)

    const SplHandlingcreateOpen = useSelector((state) => state.SpecialHandling.newForm.SplHandlingCreatePop)

    const [slice, setSlice] = useState()
    

    const pipelineAddCancel=()=>{
        dispatch(AddForm({ Search: true, AddForm: false }))
    }

    useEffect(() => {
        dispatch(pipelineGet(true))
        dispatch(sqlExtractGet(true))
        dispatch(PipelinedetailGet(true))
        dispatch(configurationGet(true))
        dispatch(SchemaMigrateGet(true))
    }, [])

    const pipelineAddModal = () => {
        dispatch(Add())
        dispatch(AddForm({ Search: true, AddForm: false }))

    }

    const pipelineEditModal = () => {
        dispatch(pipelineGetOne(true))
        dispatch(Edit())
    }

    const pipelineViewModal = () => {
        dispatch(pipelineGetOne(true))
        dispatch(View())
    }

    const pipelineDetailAddModal = () => {
        dispatch(CreateModal())
        dispatch(PplDtlAddForm({Search:true, PplDtlAddForm:false}))

    }

    const pipelineDetailViewModal = () => {
        dispatch(pipelineGetOne(true))
        dispatch(ViewModal())
    }

    const SqlExtractEditModal = () => {
        dispatch(EditPop())
    }

    const SqlExtractViewModal = () => {
        dispatch(ViewPop())
    }

    const SqlExtractCreateModal = () => {
        dispatch(CreatePop())
        dispatch(SqlAddForm({Search:true, SqlAddForm:false}))

    }

    const SqlExtractCancel=()=>{
        dispatch(SqlAddForm({Search:true, SqlAddForm:false}))
    }

    const pipelineDetailAddCancel=()=>{
        dispatch(PplDtlAddForm({Search:true, PplDtlAddForm:false}))
       }

   
     
    const SplHandlingCreateModal = () => {
        dispatch(SplHandlingAddForm({ Search: true, SplHandlingAddForm: false }))
        dispatch(SplHandlingCreatePop({ SplHandlingCreatePop: false }))
    }
    const SchemaMigrateCreateModal = () => {
        dispatch(SchemaAddForm({ Search: true, SchemaAddForm: false }))
        dispatch(SchemaMigrateCreatePop({ SchemaMigrateCreatePop: false }))
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

    // const configurationAccess = pages.filter((val) => {
    //     // console.log(val)
    //     if (val.pages == "configuration") {
    //         return val
    //     }
    // })
    
    
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
    
    const pipelineAccess = pages.filter((val) => {
        // console.log(val)
        if (val.pages == "pipeline") {
            return val
        }
    })

    const pipelineColumns = [
        {
            key: "1",
            title: 'S.No',
            dataIndex: 'sno',
            width: '100px',
            // render: (text, object, index) => { return index + 1 },
            render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },

        },
        {
            key: "2",
            title: 'Pipeline Name',
            dataIndex: 'name',
            // sorter: (a, b) => { return a.name.localeCompare(b.name) },
            width: '210px',

        },
        {
            key: "3",
            title: 'Configuration Name',
            dataIndex: 'config',
            width: '280px',
        },
        {
            key: "4",
            title: 'Start Date',
            dataIndex: 'stdate',
            // sorter: (a, b) => { return a.stdate.localeCompare(b.stdate) },
            width: '200px'
        },
        {
            key: "5",
            title: 'End Date',
            dataIndex: 'eddate',
            // sorter: (a, b) => { return a.eddate.localeCompare(b.eddate) },
            width: '200px'
        },
        {
            key: "6",
            title: 'Active',
            dataIndex: 'active',
            width: '100px'
        },
        {
            key: "7",
            title: 'Action',
            dataIndex: 'action',
            width: '140px'
        },
    ];

    const pipelineDetailsColumns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: '50px',
            // render: (text, object, index) => { return index + 1 },
            render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },
        },
        {
            title: 'Pipeline Detail Name',
            dataIndex: 'detailname',
            // sorter: (a, b) => { return a.detailname.localeCompare(b.detailname) },
            width: '350px',
        },
        {
            title: 'Pipeline Name',
            dataIndex: 'PipelineName',
            // sorter: (a, b) => { return a.PipelineName.localeCompare(b.PipelineName) },
            width: '300px',

        },

        {
            title: 'SQL Extract Name',
            dataIndex: 'sqlname',
            width: '300px'
        },
        {
            title: 'Source Table Name',
            dataIndex: 'srcname',
            width: '300px'
        },
        {
            title: 'Target Table Name',
            dataIndex: 'tarname',
            width: '300px'
        },

        {
            title: 'Start Date',
            dataIndex: 'sdate',
            // sorter: (a, b) => { return a.sdate.localeCompare(b.sdate) },
            width: '300px'
        },
        {
            title: 'End Date',
            dataIndex: 'edate',
            // sorter: (a, b) => { return a.edate.localeCompare(b.edate) },
            width: '300px'
        },
        {
            title: 'Active',
            dataIndex: 'active',
            width: '70px'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '120px'
        },
    ];

    const sqlExtractColumns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: '30px',
            // render: (text, object, index) => { return index + 1 },
            render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },
        },
        {
            title: 'SQL Extract Name',
            dataIndex: 'sqlextname',
            // sorter: (a, b) => { return a.Database_Name.localeCompare(b.Database_Name) },
            width: '210px',

        },
        {
            title: ' SQL Validation',
            dataIndex: 'SQL_Validation',
            width: '200px',
        },
        {
            title: 'SQL Status',
            dataIndex: 'SQL_Status',
            width: '190px'
        },
        {
            title: 'Sequalize Query',
            dataIndex: 'SQL_Query',
            width: '200px'
        },

        {
            title: 'Start Date',
            dataIndex: 'start_date',
            // sorter: (a, b) => { return a.start_date.localeCompare(b.start_date) },
            width: '230px'
        },
        {
            title: 'End Date',
            dataIndex: 'end_date',
            // sorter: (a, b) => { return a.end_date.localeCompare(b.end_date) },
            width: '230px'
        },
        {
            title: 'Active',
            dataIndex: 'active',
            width: '90px'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '100px'
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

    const schemaMigrationFilterData = SchemaMigrationGetAll.filter((val) => {
        if (SearchData === '') {
            return val
        } else if (val.source_schema_name.toString().toLowerCase().includes(SearchData.toLowerCase())) {
            return val
        }
    })

    const schema = schemaMigrationFilterData.map((val) => {
        // console.log(val)
        return (
            {
                configure_name: val.config_name,
                Source_Schema_name: val.schema_name,
                // sourceconn:value.source_name,
                // targetconn:value.target_name,
                start_date: val.start_date,
                end_date: val.end_date,
                action: (
                    <div className='Action_Icons'>
                        {pipelineAccess.map((value, key) => {
                            return (
                                <Fi.FiEdit size={16} onClick={() => {
                                    dispatch(SchemaMigrateId({ singleData: val.id }))
                                    dispatch(SchemaMigrateOne())
                                    dispatch(SchemaMigrateEditPop())
                                }} style={{ cursor: 'pointer', marginRight: '15px', display: ((value.schemaMigration.write == true ? "block" : "none")) }} />
                            )
                        })}
                        <Fa.FaEye size={18} onClick={() => {
                            dispatch(SchemaMigrateId({ singleData: val.id }))
                            dispatch(SchemaMigrateOne())
                            dispatch(SchemaMigrateViewPop())
                        }} style={{ cursor: 'pointer', marginRight: '15px' }} />

                        {val.Play == false && <Ai.AiFillPlayCircle size={19} onClick={() => handlepop(val.Play, val.id)}
                            style={{ cursor: 'pointer', marginRight: '20px' }} />}

                        {val.Play == true && <Ai.AiFillPauseCircle size={19} 
                        // onClick={() => handlePause(val.Play, val.id)}
                            style={{ cursor: 'pointer', color: '#0c50a3', marginRight: '20px' }} />}

                    </div>
                )

            }
        )
    })

    const schemamig = (page, pageSize) => {
        return schema.slice((page - 1) * pageSize, page * pageSize);
    };
    const special = (page, pageSize) => {
        return Spl.slice((page - 1) * pageSize, page * pageSize);
    };

    const configName = (e) => {
        const configname = []
        configurationGetAll.map((value) => {
            if (e == value.id) {
                configname.push(value.config_name)
            }
        }
        )
        return configname
    }

    const pipeFilterData = pipeData.filter((val) => {
        if (searchData === '') {
            return val
        } else if (val.pipeline_name.toString().toLowerCase().includes(searchData.toLowerCase())) {
            return val
        }
    })

    const pipelineDetailsFilterData = pipeDetailData.filter((val) => {
        if (searchData === '') {
            return val
        } else if (val.pipeline_detail_name.toString().toLowerCase().includes(searchData.toLowerCase())) {
            return val
        }
    })

    const sqlFilterData = sqlExtractData.filter((val) => {
        if (searchData === '') {
            return val
        } else if (val.database_name.toString().toLowerCase().includes(searchData.toLowerCase())) {
            return val
        }
    })
    const pipelineData = pipeFilterData.map((val) => {
        return ({
            name: val.pipeline_name,
            des: val.Description,
            config: configName(val.config_id),
            stdate: moment.utc((val.Start_date)).format('MM-DD-YYYY'),
            eddate: moment.utc((val.End_date)).format('MM-DD-YYYY'),
            active: (
                <Switch checked={val.is_active === true ? true : false} />
            ),
            action: (
                <div className='Action_Icons'>
                    {pipelineAccess.map((value, key) => {
                        return (
                            <Fi.FiEdit size={16} onClick={() => {
                                dispatch(PipeGetId({ getId: val.id, status: val.is_active }))
                                pipelineEditModal()
                            }} style={{ cursor: 'pointer', marginRight: '20px', display: ((value.write == true ? "block" : "none")) }} />
                        )
                    })}
                    <Fa.FaEye size={18} onClick={() => {
                        dispatch(PipeGetId({ getId: val.id }))
                        pipelineViewModal()
                    }} style={{ cursor: 'pointer',marginRight: '40px' }} />
                </div>
            )
        })
    })

    const pipelineDetailData = pipelineDetailsFilterData.map((val) => {
        return ({

            PipelineName: val.pipeline_name,
            detailname: val.pipeline_detail_name,
            sqlname: val.sql_extract_name,
            tarname: val.target_table_name,
            srcname: val.source_table_name,
            sdate: moment.utc((val.start_date)).format('MM-DD-YYYY'),
            edate: moment.utc((val.end_date)).format('MM-DD-YYYY'),
            active: (
                <Switch checked={val.is_active === true ? true : false} />
            ),
            action: (
                <div className='Action_Icons'>
                    {pipelineAccess.map((value, key) => {
                        return (
                            <Fi.FiEdit size={16} onClick={() => {
                                dispatch(GetPipedetailId({ singleData: val.id }))
                                dispatch(PipelinedetailGetOne())
                                dispatch(EditModal())
                            }} style={{ cursor: 'pointer', marginRight: '10px', display: ((value.pipelinesDetail.write == true ? "block" : "none")) }} />
                        )
                    })}
                    <Fa.FaEye size={18} onClick={() => {
                        dispatch(GetPipedetailId({ singleData: val.id }))
                        dispatch(PipelinedetailGetOne())
                        pipelineDetailViewModal()
                    }} style={{ cursor: 'pointer', marginRight: '20px' }} />
                </div>
            )
        })
    })

    const sqlData = sqlFilterData.map((val) => {
        return (
            {
                sqlextname: val.database_name,
                SQL_Validation: val.sql_validation,
                SQL_Status: val.sql_status,
                SQL_Query: val.sequelize_query,
                start_date: moment.utc((val.start_date)).format('MM-DD-YYYY'),
                end_date: moment.utc((val.end_date)).format('MM-DD-YYYY'),
                active: (<Switch checked={val.is_active === true ? true : false} />),
                action: (
                    <div style={{ display: 'flex', width: '50px', justifyContent: 'space-between', cursor: 'pointer' }}>
                        {pipelineAccess.map((value, key) => {
                            return (
                                <Fi.FiEdit onClick={() => {
                                    dispatch(GetId({ singleData: val.id }))
                                    dispatch(sqlExtractGetOne())
                                    dispatch(EditPop())
                                }} size={16}
                                //  style={{ marginRight: '10px', display: ((value.sqlExtracts.write == true ? "block" : "none")) }}
                                 />
                            )
                        })}
                        <Fa.FaEye size={16} onClick={() => {
                            dispatch(GetId({ singleData: val.id }))
                            dispatch(sqlExtractGetOne())
                            dispatch(ViewPop())
                        }} />

                    </div>
                )
            }
        )
    })

    let pipedata = (page, pageSize) => {
        return pipelineData.slice((page - 1) * pageSize, page * pageSize);
    };

    const pipeDetaildata = (page, pageSize) => {
        return pipelineDetailData.slice((page - 1) * pageSize, page * pageSize);
    };

    const sqlExtData = (page, pageSize) => {
        return sqlData.slice((page - 1) * pageSize, page * pageSize);
    };

    return (
        <Fragment>
            {pipelineGetLoader ? (
                <Loader/>):(
       
            <Fragment>
            <Header pipeline={pipelineAccess} />
            {/* {pipelineAccess.map((value, key) => {
                if (value.view == true) {
                    dispatch(ActionStatusChanger({ status: 'Pipeline' }))
                    return (
                        <CommonTable  pipelineColumns={pipelineColumns} pipelineData={pipedata(footerPage, footerPageSize)} pipeDetaildata={pipeDetaildata(footerPage, footerPageSize)} pipelineDetailsColumns={pipelineDetailsColumns} sqlExtractColumns={sqlExtractColumns} sqlExtractData={sqlExtData(footerPage, footerPageSize)}/>
                    )
                }else if (value.view == false) {
                    dispatch(ActionStatusChanger({ status: 'PipelineDetail' }))
                    return (
                        <CommonTable  pipeDetaildata={pipeDetaildata(footerPage, footerPageSize)} pipelineDetailsColumns={pipelineDetailsColumns}/>
                    )
                }else if (value.view == false) {
                    dispatch(ActionStatusChanger({ status: 'SqlExtracts' }))
                    return (
                        <CommonTable sqlExtractColumns={sqlExtractColumns} sqlExtractData={sqlExtData(footerPage, footerPageSize)}/>
                    )
                }
            })} */}
            <CommonTable
                pipelineColumns={pipelineColumns} pipelineData={pipedata(footerPage, footerPageSize)}
                pipeDetaildata={pipeDetaildata(footerPage, footerPageSize)} pipelineDetailsColumns={pipelineDetailsColumns}
                sqlExtractColumns={sqlExtractColumns} sqlExtractData={sqlExtData(footerPage, footerPageSize)}
                schemamigcolumns={schemamigcolumns} 
                schemamigData={schemamig(footerPage, footerPageSize)} 
                SpecialHandlingColumns={SpecialHandlingColumns}
                SpecialHandlingData={special(footerPage, footerPageSize)}
                 />


            <Drawer title="New Pipeline" open={pipelineAddModalOpen} closable={true}  maskClosable={false} onClose={pipelineAddModal} ariaHideApp={false} width='75vh' 
            footer={[ 
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                extra={
                    <Space onClick={pipelineAddCancel}>
                    <Button onClick={pipelineAddModal}>Cancel</Button>
                       {/* <Cg.CgClose size={20}  onClick={pipelineAddModal} style={{cursor:"pointer",color:"red"}}/> */}
                    </Space>
                }
            >
                <PipelineAddComponent />
            </Drawer>
            <Drawer title="Pipeline Edit" open={pipelineEditModalOpen} closable={true}  maskClosable={false} onClose={pipelineEditModal} ariaHideApp={false} width='75vh'
               footer={[ 
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                // extra={
                //     <Space>
                //     <Button onClick={pipelineEditModal}>Cancel</Button>
                //         {/* <Cg.CgClose size={20}  onClick={pipelineEditModal} style={{cursor:"pointer",color:"red"}}/> */}
                //     </Space>
                // }
            >
                <PipelineEditComponent PipeGetOneData={pipeGetOneData} />
            </Drawer>
            <Drawer title="Pipeline View" open={pipelineViewModalOpen} closable={true}  maskClosable={false} onClose={pipelineViewModal} ariaHideApp={false} width='75vh' footer={null}
                // extra={
                //     <Space>
                //         <Button onClick={pipelineViewModal}>Cancel</Button>
                //         {/* <Cg.CgClose size={20}  onClick={pipelineViewModal} style={{cursor:"pointer",color:"red"}}/> */}
                //     </Space>
                // }
            >
                <PipelineViewComponent />
            </Drawer>
            {/* <Modal title={false} style={{ top: 260 }} open={pipelineGetLoader}  maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
                <Loader />
            </Modal> */}

            <Drawer title="New Pipeline Detail" open={pipelineDetailAddModalOpen} closable={true} maskClosable={false} onClose={pipelineDetailAddModal} ariaHideApp={false} width='75vh' 
            footer={[
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                extra={
                    <Space onClick={pipelineDetailAddCancel}>
                        <Button onClick={pipelineDetailAddModal}>Cancel</Button>
                        {/* <Cg.CgClose size={20}  onClick={pipelineDetailAddModal} style={{cursor:"pointer",color:"red"}}/> */}
                    </Space>
                }
            >
                <PipelineDetailAdd />
            </Drawer>
            <Drawer title="Pipeline Details Edit" open={pipelineDetailEditModalOpen} closable={true} maskClosable={false} onClose={() => { dispatch(EditModal()) }} ariaHideApp={false} width='75vh'
            footer={[ 
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                // extra={
                //     <Space>
                //         {/* <Button onClick={() => { dispatch(EditModal()) }}>Cancel</Button> */}
                //         <Cg.CgClose size={20}  onClick={() => { dispatch(EditModal()) }} style={{cursor:"pointer",color:"red"}}/>
                //     </Space>
                // }
            >
                <PipelineDetailsEdit />
            </Drawer>
            <Drawer title="Pipeline Details View" open={pipelineDetailViewModalOpen} closable={true} maskClosable={false} onClose={pipelineDetailViewModal} ariaHideApp={false} width='75vh' footer={null}
                // extra={
                //     <Space>
                //         <Button onClick={pipelineDetailViewModal}>Cancel</Button>
                //         {/* <Cg.CgClose size={20}  onClick={pipelineDetailViewModal} style={{cursor:"pointer",color:"red"}}/> */}
                //     </Space>
                // }
            >
                <PipelineDetailView />
            </Drawer>
            {/* <Modal title={false} style={{ top: 260 }} open={pipelineDetailGetLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
                <Loader />
            </Modal> */}

            <Drawer title=" Extract SQL Create" open={sqlExtractCreateOpen} closable={true} maskClosable={false} onClose={SqlExtractCreateModal} ariaHideApp={false} width='75vh' 
            footer={[
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                extra={
                    <Space onClick={SqlExtractCancel}>
                        <Button onClick={SqlExtractCreateModal}>Cancel</Button>
                        {/* <Cg.CgClose size={20}  onClick={SqlExtractCreateModal} style={{cursor:"pointer",color:"red"}}/> */}
                    </Space>
                }
            >
                <SqlExtractAdd />
            </Drawer>
            <Drawer title="Extract SQL Edit" open={sqlExtractEditOpen} closable={true} maskClosable={false} onClose={SqlExtractEditModal} ariaHideApp={false} width='75vh'
            footer={[ 
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                // extra={
                //     <Space>
                //         <Button onClick={SqlExtractEditModal}>Cancel</Button>
                //         {/* <Cg.CgClose size={20}  onClick={SqlExtractEditModal} style={{cursor:"pointer",color:"red"}}/> */}
                //     </Space>
                // }
            >
                <SqlExtractEdit />
            </Drawer>
            <Drawer title=" Extract SQL View" open={sqlExtractViewOpen} closable={true} maskClosable={false} onClose={SqlExtractViewModal} ariaHideApp={false} width='75vh' footer={null}
                // extra={
                //     <Space>
                //         <Button onClick={SqlExtractViewModal}>Cancel</Button>
                //         {/* <Cg.CgClose size={20}  onClick={SqlExtractViewModal} style={{cursor:"pointer",color:"red"}}/> */}
                //     </Space>
                // }
            >
                <SqlExtractView />
            </Drawer>
            <Modal title={false} style={{ top: 260 }} open={pipelineGetLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
                <Loader />
            </Modal>

            <Drawer title=" New Schema Migration " open={SchemaMigrationcreateOpen} maskClosable={false} onClose={SchemaMigrateCreateModal} ariaHideApp={false} width='85vh'  
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
            </Drawer>
            <Drawer title=" Schema Migration Edit " open={SchemaMigrationEditOpen} maskClosable={false} onClose={SchemaMigrateEditModal} width='85vh' ariaHideApp={false}
            footer={[ 
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
            // extra={
            //     <Space>
            //         <Button onClick={SchemaMigrateEditModal}>Cancel</Button>
            //     </Space>
            // }
            >
                < SchemaEdit />
            </Drawer>
            <Drawer title=" Schema Migration View " open={SchemaMigrationViewOpen} maskClosable={false} onClose={SchemaMigrateViewModal} width='85vh' ariaHideApp={false} footer={null}
            // extra={
            //     <Space>
            //         <Button onClick={SchemaMigrateViewModal}>Cancel</Button>
            //     </Space>
            // }
            > 
                < SchemaView />
            </Drawer>

            <Drawer title=" New Special char " open={SplHandlingcreateOpen} maskClosable={false} onClose={SplHandlingCreateModal} ariaHideApp={false} width='85vh'  
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
            </Drawer>

            <Footer pipedata={pipeFilterData.length}  pipeDetailsData={pipelineDetailsFilterData.length} schemamig={schemaMigrationFilterData.length} />
        </Fragment>
        )}
        </Fragment>
    )
}

export default Pipeline
