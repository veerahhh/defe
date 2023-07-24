// import React, { Fragment, useEffect, useState } from 'react'
// import Footer from '../../components/footer/Footer'
// import Header from '../../components/header/Header'
// import CommonTable from '../../components/table/CommonTable'
// import { useSelector, useDispatch } from 'react-redux'
// import { tenantGet, tenantGetOne, TenantGetId, TenantViewPop, TenantEditPop, TenantCreatePop, TenantGroupViewPop } from '../../redux/reducer/tenantList/TenantListReducer'
// import TenantAdd from '../../components/modal/tenantList/add/TenantAdd';
// import TenantEdit from '../../components/modal/tenantList/edit/TenantEdit'
// import GroupView from '../../components/modal/tenantList/view/GroupView'
// import TenantView from '../../components/modal/tenantList/view/TenantView'
// import { Switch, Modal, Drawer, Space, Button } from 'antd';
// import Loader from '../../components/loader/Loader'
// import * as Fi from 'react-icons/fi';
// import * as Fa from 'react-icons/fa';
// //import * as Ai from 'react-icons/ai';
// import * as Md from 'react-icons/md'

// import moment from 'moment'
// import axios from 'axios'


// function TenantList() {
//     let URL = process.env.REACT_APP_URL
//     const [secondDrawer, setSecondDrawer] = useState(false)

//     const dispatch = useDispatch()

//     const searchData = useSelector((state) => state.Header.Search.value)
//     // console.log(searchData)
//     const footerPage = useSelector((state) => state.Header.Footer.page)
//     const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)

//     const tenantGetLoader = useSelector((state) => state.Tenant.loader.Loader)
//     // console.log(tenantGetLoader)
//     const tenantGetAll = useSelector((state) => state.Tenant.TenantGetData)

//     const tenantEditOpen = useSelector((state) => state.Tenant.newForm.TenantEditPop)
//     const tenantViewOpen = useSelector((state) => state.Tenant.newForm.TenantViewPop)
//     const tenantCreateOpen = useSelector((state) => state.Tenant.newForm.TenantCreatePop)
//     const TenantGroupViewOpen = useSelector((state) => state.Tenant.newForm.TenantGroupViewPop)

//     const secondDrawerOpenandClose = () => {
//         secondDrawer === false ? setSecondDrawer(true) : setSecondDrawer(false)
//     }

//     useEffect(() => {
//         dispatch(tenantGet(true))
//     }, [])

//     const TenantEditModal = () => {
//         dispatch(TenantEditPop())
//     }

//     const TenantGroupViewModal = () => {
//         dispatch(TenantGroupViewPop())
//     }

//     const TenantViewModal = () => {
//         dispatch(TenantViewPop())
//     }

//     const TenantAddModal = () => {
//         dispatch(TenantCreatePop())
//     }
//     const tenantListColumns = [
//         {
//             title: 'S.No',
//             dataIndex: 'sno',
//             width: '50px',
//             // render: (text, object, index) => { return index + 1 },
//             render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },

//         },
//         {
//             title: 'Company Name',
//             dataIndex: 'companyname',
//             // sorter: (a, b) => { return a.detailname.localeCompare(b.detailname) },
//             width: '350px',
//         },
//         {
//             title: 'Tenant ID',
//             dataIndex: 'tenantid',
//             width: '300px',

//         },
//         // {
//         //     title: 'Work Groups Count',
//         //     dataIndex: 'tenantid',
//         //     width: '400px',

//         // },
//         {
//             title: 'Start Date',
//             dataIndex: 'sdate',
//             // sorter: (a, b) => { return a.sdate.localeCompare(b.sdate) },
//             width: '300px'
//         },
//         {
//             title: 'End Date',
//             dataIndex: 'edate',
//             // sorter: (a, b) => { return a.edate.localeCompare(b.edate) },
//             width: '300px'
//         },
//         {
//             title: 'Active',
//             dataIndex: 'active',
//             width: '100px'
//         },
//         {
//             title: 'Action',
//             dataIndex: 'action',
//             width: '150px'
//         },
//     ];

//     const tenantFilterData = tenantGetAll.filter((val) => {
//         if (searchData === '') {
//             return val
//         } else if (val.company_name.toString().toLowerCase().includes(searchData.toLowerCase())) {
//             return val
//         }
//     })
//     const [tenantid ,setTenantId ]=useState(0)
//     const tenantData = tenantFilterData.map((val) => {

//         return (
//             {
//                 companyname: val.company_name,
//                 tenantid: val.tenant_id,
//                 sdate: moment.utc((val.start_date)).format('MM-DD-YYYY'),
//                 edate: moment.utc((val.end_date)).format('MM-DD-YYYY'),
//                 active: (<Switch checked={val.is_active === true ? true : false} />),
//                 action: (
//                     <div className='Action_Icons'>
//                         <Fi.FiEdit size={16} onClick={() => {
//                             dispatch(TenantGetId({ singleData: val.id }))
//                             dispatch(tenantGetOne())
//                             dispatch(TenantEditPop())
//                         }} style={{ cursor: 'pointer', marginRight: '10px' }} />
//                         <Fa.FaEye size={18} onClick={() => {
//                             dispatch(TenantGetId({ singleData: val.id }))
//                             dispatch(tenantGetOne())
//                             dispatch(TenantViewPop())
//                         }} style={{ cursor: 'pointer', marginRight: '10px' }} />
//                         <Md.MdOutlineGroups size={20} onClick={() => {
//                             dispatch(TenantGetId({ singleData: val.id }))
//                             setTenantId(val.id)
//                             setTimeout(function() { GetTeams(); }, 1000);                            
//                             dispatch(tenantGetOne())
//                             dispatch(TenantGroupViewPop())
//                         }} style={{ cursor: 'pointer', marginRight: '10px' }}
//                         />
//                     </div>
//                 )
//             }
           
//         )
//     })

//     console.log(tenantid) 
//     const [listofteam,setListofTeam]=useState([])
//     const [enable,setEnable]=useState(false)
//     const GetTeams =()=>{
//         axios.get(`${URL}/tenant_teams_get/18`).then((res)=>{            
//            setListofTeam(res.data) 
//            setEnable(true)
//         })
//     }
//     console.log(listofteam)

//     const tenantGetData = (page, pageSize) => {
//         return tenantData.slice((page - 1) * pageSize, page * pageSize);
//     };



//     return (
//         <Fragment>
//             {tenantGetLoader ? (
//                 <Loader />
//             ) : (
//                 <Fragment>
//                     <Header />
//                     {/* <Modal title={false} style={{ top: 260 }} open={tenantGetLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
//                 <Loader />
//             </Modal> */}
//                     <CommonTable tenantListColumns={tenantListColumns} tenantData={tenantGetData(footerPage, footerPageSize)} />
//                     <Drawer title="Create Tenant" open={tenantCreateOpen} maskClosable={false} onClose={TenantAddModal} ariaHideApp={false} width='75vh' footer={null}
//                         extra={
//                             <Space >
//                                 <Button onClick={TenantAddModal}>Cancel</Button>
//                             </Space>
//                         }
//                     >
//                         <TenantAdd />
//                     </Drawer>

//                     <Drawer title="Edit Tenant" open={tenantEditOpen} maskClosable={false} onClose={TenantEditModal} ariaHideApp={false} width='75vh' footer={null}
//                         extra={
//                             <Space >
//                                 <Button onClick={TenantEditModal}>Cancel</Button>
//                             </Space>
//                         }
//                     >
//                         <TenantEdit />
//                     </Drawer>

//                     <Drawer title="View Tenant" open={tenantViewOpen} maskClosable={false} onClose={TenantViewModal} ariaHideApp={false} width='75vh' footer={null}
//                         extra={
//                             <Space >
//                                 <Button onClick={TenantViewModal}>Cancel</Button>
//                             </Space>
//                         }
//                     >
//                         <TenantView />
//                     </Drawer>

//                    { enable && <Drawer title="GroupList" open={TenantGroupViewOpen} maskClosable={false} onClose={TenantGroupViewModal} ariaHideApp={false} width='75vh' footer={null}
//                         extra={
//                             <Space >
//                                 <Button onClick={TenantGroupViewModal}>Cancel</Button>
//                             </Space>
//                         }
//                     >
//                        <GroupView secondDrawer={secondDrawerOpenandClose} listofteam={listofteam} />
//                         <Drawer
//                             title="User View"
//                             width={350}
//                             closable={true}
//                             onClose={secondDrawerOpenandClose}
//                             open={secondDrawer}

//                             extra={
//                             <Space >
//                                 <Button onClick={secondDrawerOpenandClose}>Cancel</Button>
//                             </Space>
//                         }
//                         >
//                             <TenantView />
//                         </Drawer>
//                     </Drawer>}

//                     <Footer tenantData={tenantFilterData.length} />
//                 </Fragment>
//             )}
//         </Fragment>
//     )
// }

// export default TenantList