// import React, { Fragment, useEffect } from 'react'
// import Header from '../../../components/header/Header'
// import CommonTable from '../../../components/table/CommonTable'
// import { useSelector, useDispatch } from 'react-redux'
// import * as Fi from 'react-icons/fi'
// import * as Fa from 'react-icons/fa'
// import moment from 'moment';
// import { Switch, Modal, Drawer, Space, Button } from 'antd';
// import { PageAdd, PagesGetOne, PagesGet, PageGetId, PageView } from '../../../redux/reducer/settings/PagesReducer'
// import Loader from '../../../components/loader/Loader'
// import Footer from '../../../components/footer/Footer'
// import PagesAdd from '../../../components/modal/settings/Pages/add/PagesAdd'
// import PagesView from '../../../components/modal/settings/Pages/view/PagesView'

// function Pages() {

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(PagesGet(true))
//   }, [])

//   const pagesAddPopup = () => {
//     dispatch(PageAdd())
//   }

//   const pagesViewPopup = () => {
//     dispatch(PageView())
//   }

//   const searchData = useSelector((state) => state.Header.Search.value)
//   const footerPage = useSelector((state) => state.Header.Footer.page)
//   const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)

//   const pageLoader = useSelector((state) => state.Page.Loader)
//   const pageData = useSelector((state) => state.Page.Data)
//   const pagesAddModalOpen = useSelector((state) => state.Page.modal.PageAdd)
//   const pagesViewModalOpen = useSelector((state) => state.Page.modal.PageView)
//   const UserGetOneData = useSelector((state) => state.UserRole.GetOneData)

//   const pageColumns = [
//     {
//       title: 'S.No',
//       dataIndex: 'sno',
//       width: '80px',
//       render: (text, object, index) => { return index + 1 },
//       filteredValue: [searchData],
//       onFilter: (value, record) => {
//         return String(record.name).toLowerCase().includes(value.toLowerCase());
//       },
//     },
//     {
//       title: 'Page Name',
//       dataIndex: 'name',
//       // sorter: (a, b) => { return a.name.localeCompare(b.name) },
//       width: '200px',
//       // sorter: (a, b) => { return a.name.localeCompare(b.name) },
//     },
//     {
//       title: 'Page Url',
//       dataIndex: 'pageurl',
//       width: '200px',
//     },
//     {
//       title: 'Start Date',
//       dataIndex: 'sdate',
//       // sorter: (a, b) => { return a.sdate.localeCompare(b.sdate) },
//       width: '170px'
//     },
//     {
//       title: 'End Date',
//       dataIndex: 'edate',
//       // sorter: (a, b) => { return a.edate.localeCompare(b.edate) },
//       width: '170px'
//     },
//     {
//       title: 'Active',
//       dataIndex: 'active',
//       width: '130px'
//     },
//     {
//       title: 'Action',
//       dataIndex: 'action',
//       width: '130px'
//     },
//   ]

//   const pagesData = pageData.map((val) => {
//     return ({
//       name: val.page_name,
//       pageurl: val.page_url,
//       sdate: moment.utc((val.start_date)).format('MM-DD-YYYY'),
//       edate: moment.utc((val.end_date)).format('MM-DD-YYYY'),
//       active: (
//         <Switch checked={val.is_active === true ? true : false} />
//       ),
//       action: (
//         <div className='Action_Icons'>
//           <Fa.FaEye size={18} onClick={() => {
//             dispatch(PageGetId({ singleData: val.id }))
//             dispatch(PagesGetOne())
//             dispatch(PageView())
//           }} style={{ cursor: 'pointer' }} />
//         </div>
//       )
//     })
//   })

//   const pagesdata = (page, pageSize) => {
//     return pagesData.slice((page - 1) * pageSize, page * pageSize);
//   };

//   return (
//     <Fragment>
//       {pageLoader?(
//         <Loader/>
//       ):(
//       <Fragment>
//       <Header />
//       <Modal title={false} style={{ top: 260 }} open={pageLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
//         <Loader />
//       </Modal>
//       <CommonTable pageColumns={pageColumns} pagesData={pagesdata(footerPage, footerPageSize)} />
//       <Drawer title="Page" open={pagesAddModalOpen} maskClosable={false} onClose={pagesAddPopup} ariaHideApp={false} width='70vh' footer={null}
//       extra={
//         <Space>
//           <Button onClick={pagesAddPopup}>Cancel</Button>
//         </Space>
//       }
//       >
//         <PagesAdd />
//       </Drawer>
//       <Drawer title="Page View" open={pagesViewModalOpen} maskClosable={false} onClose={pagesViewPopup} ariaHideApp={false} width='70vh' footer={null}
//       extra={
//         <Space>
//           <Button onClick={pagesViewPopup}>Cancel</Button>
//         </Space>
//       }
//       >
//         <PagesView />
//       </Drawer>
//       <Footer PageData={pageData.length} />
//       </Fragment>
//   )}
//     </Fragment>
//   )
// }

// export default Pages