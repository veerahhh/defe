// import React, { Fragment, useEffect } from 'react'
// import Footer from '../../../components/footer/Footer'
// import Header from '../../../components/header/Header'
// import CommonTable from '../../../components/table/CommonTable'
// import { AddUserForm, UserGet} from '../../../redux/reducer/settings/UserReducer'
// import { useSelector, useDispatch } from 'react-redux'
// import { Button, Drawer, Modal, Space, Switch } from 'antd';
// import Loader from '../../../components/loader/Loader'
// import AddUser from '../../../components/modal/settings/User/AddUser/Adduser'

// function User() {
//   const dispatch = useDispatch();
//   const userData = useSelector((state) => state.User.Data)
//   const userLoader = useSelector((state) => state.User.Loader)
//   const addUser = useSelector((state) => state.User.modal.AddUserForm)
//   // console.log(addUser)
//   useEffect(() => {
//     dispatch(UserGet(true))
//   }, [])

//   const searchData = useSelector((state) => state.Header.Search.value)
//   const footerPage = useSelector((state) => state.Header.Footer.page)
//   const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)

//   const closeUser = ()=>{
//     dispatch(AddUserForm())
//   }

//   const userSettingColumns = [
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
//       title: 'First Name',
//       dataIndex: 'name',
//       // sorter: (a, b) => { return a.name.localeCompare(b.name) },
//       width: '200px',
//     },
//     {
//       title: 'Mail ID',
//       dataIndex: 'mailid',
//       width: '170px'
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
//   ]

//   const data = userData.map((val) => {
//     return ({
//       name: val.first_name,
//       mailid: val.email,
//       sdate: val.start_date,
//       edate: val.end_date,
//       active: (<Switch checked={val.is_active === true ? true : false} />),

//      })
//   })


//   const userGetData = (page, pageSize) => {
//     return data.slice((page - 1) * pageSize, page * pageSize);
//   };


//   return (
//     <Fragment>
//       {userLoader?(
//         <Loader/>
//       ):(
//     <Fragment>
//       <Header />
//       <Modal style={{ top: 260 }} open={userLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
//         <Loader />
//       </Modal>
//       <Drawer title='Creating A Tenant User' open={addUser} maskClosable={false} onClose={closeUser} footer={null} width='600px'
//       extra={
//         <Space>
//           <Button onClick={closeUser}>Cancel</Button>
//         </Space>
//       }
//       >
//         <AddUser />
//       </Drawer>
//       <CommonTable userColumn={userSettingColumns} userData={userGetData(footerPage, footerPageSize)}  />
//       <Footer userFooter={userData.length} />
//     </Fragment>
//       )}
//       </Fragment>
//   )
// }

// export default User