import React, { Fragment, useEffect } from 'react'
import Header from "../../components/header/Header";
import CommonTable from "../../components/table/CommonTable";
import { Switch, Modal, Drawer, Button, Space } from 'antd';
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader"
import { useSelector, useDispatch } from 'react-redux'
import { connectionGet, ConnPopupAdd, ConnPopupEdit, ConnPopupView, GetId, connectionGetId } from '../../redux/reducer/connection/ConnectionReducer'
import { ConndtlPopupAdd, ConndtlPopupEdit, ConndtlPopupView, connectionDetailGet, ConndtlGetId, connectionDetailGetId } from '../../redux/reducer/connection/ConnectionDetailReducer';
import { ActionStatusChanger } from '../../redux/reducer/HeaderReducer'
import * as Fi from 'react-icons/fi'
import * as Fa from 'react-icons/fa'
import moment from 'moment';
import ConnectionAdd from '../../components/modal/connection/connectionModal/add/ConnectionAdd';
import ConnectionEdit from '../../components/modal/connection/connectionModal/edit/ConnectionEdit';
import ConnectionView from '../../components/modal/connection/connectionModal/view/ConnectionView';
import ConnectiondtlAdd from '../../components/modal/connection/connectionDetailModal/add/ConnectiondtlAdd';
import ConnectiondtlEdit from '../../components/modal/connection/connectionDetailModal/edit/ConnectiondtlEdit';
import ConnectiondtlView from '../../components/modal/connection/connectionDetailModal/view/ConnectiondtlView';


function Connection(props) {
    // console.log(props)
    const { pages } = props

    const dispatch = useDispatch()

    const searchData = useSelector((state) => state.Header.Search.value)
    const footerPage = useSelector((state) => state.Header.Footer.page)
    const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)
    const connData = useSelector((state) => state.Connection.Data)
    const conndtldata = useSelector((state) => state.ConnectionDetail.ConData)
    const connectionAddModalOpen = useSelector((state) => state.Connection.modal.ConnPopupAdd)
    const connectionEditModalOpen = useSelector((state) => state.Connection.modal.ConnPopupEdit)
    const connectionViewModalOpen = useSelector((state) => state.Connection.modal.ConnPopupView)
    const connectiondtlAddModalOpen = useSelector((state) => state.ConnectionDetail.Condtlmodal.ConndtlPopupAdd)
    const connectiondtlEditModalOpen = useSelector((state) => state.ConnectionDetail.Condtlmodal.ConndtlPopupEdit)
    const connectiondtlViewModalOpen = useSelector((state) => state.ConnectionDetail.Condtlmodal.ConndtlPopupView)
    const dataclr = useSelector((state)=>state.Connection.add)
    // console.log(dataclr)
    
   const connectionLoader = useSelector((state) => state.Connection.loader.Loader)
//    console.log(connectionLoader)
    useEffect(() => {
        dispatch(connectionGet(true))
        dispatch(connectionDetailGet(true))
    }, [])

    const connectionAddPopup = () => {
        dispatch(ConnPopupAdd())  
        window.location.reload()      
    }

    const connectionEditPopup = () => {
        dispatch(ConnPopupEdit())
    }

    const connectionViewPopup = () => {
        dispatch(ConnPopupView())
    }

    const connectiondtlAddPopup = () => {
        dispatch(ConndtlPopupAdd())
        window.location.reload()      
       
    }
    const connectiondtlEditPopup = () => {
        dispatch(ConndtlPopupEdit())
    }

    const connectiondtlViewPopup = () => {
        dispatch(ConndtlPopupView())
    }

    const connectionAccess = pages.filter((val) => {
        if (val.pages == "connection") {
            return val
        }
    })

    

    const connectionColumns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: '80px',
            // render: (text, object, index) => { return index + 1 },
            render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },
            // filteredValue: [searchData],
            // onFilter: (value, record) => {
            //     return String(record.name).toLowerCase().includes(value.toLowerCase());
            // },
        },
        {
            title: 'Connection Name',
            dataIndex: 'name',
            width: '200px',
            // sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Description',
            dataIndex: 'des',
            width: '200px',
        },
        {
            title: 'Start Date',
            dataIndex: 'sdate',
            // sorter: (a, b) => { return a.sdate.localeCompare(b.sdate) },
            width: '170px'
        },
        {
            title: 'End Date',
            dataIndex: 'edate',
            // sorter: (a, b) => { return a.edate.localeCompare(b.edate) },
            width: '170px'
        },
        {
            title: 'Active',
            dataIndex: 'active',
            width: '130px'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '70px'
        },
    ]

    const connectionDetailsColumns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: '80px',
            //  render: (text, object, index) => { return index + 1 },
             render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },
           
        },
        {
            title: 'Connection Detail Name',
            dataIndex: 'conndetails',
            key: 'conndetails',
            // sorter: (a, b) => a.conname.localeCompare(b.conname),
            width: "300px"
        },
        {
            title: 'Connection Name',
            dataIndex: 'conname',
            key: 'conname',
            sortDirections: ['descend', 'ascend'],
            width: "200px"
        },

        {
            title: 'Start Date',
            dataIndex: 'startdate',
            key: 'startdate',
            // sorter: (a, b) => a.startdate.localeCompare(b.startdate),
            sortDirections: ['descend', 'ascend'],
            width: "150px"
        },
        {
            title: 'End Date',
            dataIndex: 'enddate',
            key: 'enddate',
            // sorter: (a, b) => a.enddate.localeCompare(b.enddate),
            sortDirections: ['descend', 'ascend'],
            width: "180px"
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            width: "100px"
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: "70px"
        },
    ];

    const connectionFilterData = connData.filter((val) => {
        if (searchData === '') {
            return val
        } else if (val.connection_name.toString().toLowerCase().includes(searchData.toLowerCase())) {
            return val
        }
    })

    const connectionDetailsFilterData = conndtldata.filter((val) => {
        if (searchData === '') {
            return val
        } else if (val.connection_detail.toString().toLowerCase().includes(searchData.toLowerCase())) {
            return val
        }
    })

    const connectionData = connectionFilterData.map((val) => {
        return ({
            name: val.connection_name,
            conndetails: val.connection_detail,
            des: val.description,
            sdate: moment.utc((val.start_date)).format('MM-DD-YYYY'),
            edate: moment.utc((val.end_date)).format('MM-DD-YYYY'),
            active: (
                <Switch checked={val.is_active === true ? true : false} />
            ),
            action: (
                <div className='Action_Icons'>
                    {connectionAccess.map((value, key) => {
                        return (
                            <Fi.FiEdit size={16} onClick={() => {
                                dispatch(GetId({ singleData: val.id }))
                                dispatch(connectionGetId())
                                dispatch(ConnPopupEdit())
                            }} style={{ cursor: 'pointer', marginRight: '10px', display: ((value.write == true ? "block" : "none")) }} />
                        )
                    })}
                    <Fa.FaEye size={18} onClick={() => {
                        dispatch(GetId({ singleData: val.id }))
                        dispatch(connectionGetId())
                        dispatch(ConnPopupView())
                    }} style={{ cursor: 'pointer', marginRight: '20px' }} />
                </div>
            )
        })
    })

    const conname = (e) => {
        const conname = []
        connData.map((value) => {
            if (e === (value.id)) {
                conname.push(value.connection_name)
            }
        }
        )
        return conname
    }

    const connectiondtlData = connectionDetailsFilterData.map((val) => {
        return ({
            id: val.id,
            conname: conname(val.connection_id),
            conndetails: val.connection_detail,
            startdate: moment.utc((val.start_date)).format('DD-MM-YYYY'),
            enddate: moment.utc((val.end_date)).format('DD-MM-YYYY'),
            active: (
                <Switch checked={val.is_active === true ? true : false} />
            ),
            action: (
                <div className='Action_Icons'>
                    {connectionAccess.map((value, key) => {
                        return (
                            <Fi.FiEdit size={16} onClick={() => {
                                dispatch(ConndtlGetId({ singleData: val.id }))
                                dispatch(connectionDetailGetId())
                                dispatch(ConndtlPopupEdit())
                            }} style={{ cursor: 'pointer', marginRight: '10px', display: ((value.connectionDetails.write == true ? "block" : "none")) }} />
                        )
                    })}
                    <Fa.FaEye size={18} onClick={() => {
                        dispatch(ConndtlGetId({ singleData: val.id }))
                        dispatch(connectionDetailGetId())
                        dispatch(ConndtlPopupView())
                    }} style={{ cursor: 'pointer', marginRight: '20px' }} />
                </div>
            )
        })

    })

    const connectiondata = (page, pageSize) => {
        return connectionData.slice((page - 1) * pageSize, page * pageSize);
    };
    const connectiondtldata = (page, pageSize) => {
        return connectiondtlData.slice((page - 1) * pageSize, page * pageSize);
    };
    // const dat = 

    return (
        <Fragment>
            {connectionLoader ? (
                <Loader />
            ) : (
                <Fragment>
                    <Header connection={connectionAccess} />
                {/* {connectionAccess.map((value, key) => {
                    console.log(value)
                if (value.view == true) {
                    dispatch(ActionStatusChanger({ status: 'Connection' }))
                    return (
                        <CommonTable connectionColumns={connectionColumns} connectionData={connectiondata(footerPage, footerPageSize)}  />
                    )
                } else if (value.view == false) {
                    dispatch(ActionStatusChanger({ status: 'Connection Details' }))
                    return (
                        <CommonTable connectionDetailsColumns={connectionDetailsColumns} connectiondtlData={connectiondtldata(footerPage, footerPageSize)}  />
                    )
                }
            })} */}
                    <CommonTable connectionColumns={connectionColumns} connectionData={connectiondata(footerPage, footerPageSize)} connectionDetailsColumns={connectionDetailsColumns} connectiondtlData={connectiondtldata(footerPage, footerPageSize)} />

                    <Drawer title="New Connection" open={connectionAddModalOpen} maskClosable={false} onClose={connectionAddPopup} ariaHideApp={false} width='100vh'
                    footer={[ 
                        <div style={{padding:'15px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                        
                        {/* <Button  type='primary'  >Update</Button> */}
                        </div>]}
                        footerStyle={{backgroundColor:'#f5f5fd'}}
                    
                    
                        extra={
                            <Space>
                                <Button onClick={connectionAddPopup}>Cancel</Button>
                            </Space>
                        }
                    >
                        <ConnectionAdd />
                    </Drawer>
                    <Drawer title="Connection Edit" open={connectionEditModalOpen} maskClosable={false} onClose={connectionEditPopup} ariaHideApp={false} width='100vh' 
                    footer={[ 
                        <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                        
                        </div>]}
                        footerStyle={{backgroundColor:'#f5f5fd'}}
                    
                    >
                        <ConnectionEdit />
                    </Drawer>
                    <Drawer title="Connection View" open={connectionViewModalOpen} maskClosable={false} onClose={connectionViewPopup} ariaHideApp={false} width='100vh' footer={null}
                    // extra={
                    //     <Space>
                    //         <Button onClick={connectionViewPopup}>Cancel</Button>
                    //     </Space>
                    // }
                    >
                        <ConnectionView />
                    </Drawer>
                    <Drawer title="New Connection Detail" open={connectiondtlAddModalOpen} maskClosable={false} onClose={connectiondtlAddPopup} ariaHideApp={false} width='105vh'
                    footer={[ 
                        <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                        
                        </div>]}
                        footerStyle={{backgroundColor:'#f5f5fd'}}
                        extra={
                            <Space>
                                <Button onClick={connectiondtlAddPopup}>Cancel</Button>
                            </Space>
                        }
                    >
                        <ConnectiondtlAdd />
                    </Drawer>
                    <Drawer title="Connection Detail Edit" open={connectiondtlEditModalOpen} maskClosable={false} onClose={connectiondtlEditPopup} ariaHideApp={false} width='100vh'
                    footer={[ 
                        <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                        
                        </div>]}
                        footerStyle={{backgroundColor:'#f5f5fd'}}
                    // extra={
                    //     <Space>
                    //         <Button onClick={connectiondtlEditPopup}>Cancel</Button>
                    //     </Space>
                    // }
                    >
                        <ConnectiondtlEdit />
                    </Drawer>
                    <Drawer title="Connection Detail View" open={connectiondtlViewModalOpen} maskClosable={false} onClose={connectiondtlViewPopup} ariaHideApp={false} width='100vh' footer={null}
                    // extra={
                    //     <Space>
                    //         <Button onClick={connectiondtlViewPopup}>Cancel</Button>
                    //     </Space>
                    // }
                    >
                        <ConnectiondtlView />
                    </Drawer>
                    {/* <Modal title={false} style={{ top: 260 }} open={connectionLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
                        <Loader />
                    </Modal> */}
                    <Footer connData={connectionFilterData.length} conndtlData={connectionDetailsFilterData.length} />
                </Fragment>
            )
            }
        </Fragment>
    )
}

export default Connection