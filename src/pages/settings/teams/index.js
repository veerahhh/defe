// import { Button, Modal, Form, Input, Select, Drawer, Space } from 'antd'
// import React, { Fragment, useEffect } from 'react'
// import { InfoCircleOutlined } from '@ant-design/icons'
// import { useDispatch, useSelector } from 'react-redux'
// import Header from '../../../components/header/Header'
// import View from '../../../components/modal/settings/Teams/View/View'
// import { AddForm, EditForm, DeleteForm, MemberAddForm,TeamsUrlGet,TeamsUrlDelete } from '../../../redux/reducer/settings/TeamsReducer'
// import Add from '../../../components/modal/settings/Teams/AddTeam/AddTeam'
// import EditTeam from '../../../components/modal/settings/Teams/EditTeam/EditTeam'
// import AddMember from '../../../components/modal/settings/Teams/AddMember/AddMember'
// import Loader from '../../../components/loader/Loader'

// function Teams() {
//   const dispatch = useDispatch()
//   const addTeam = useSelector((state) => state.Teams.modal.AddForm)
//   const editTeam = useSelector((state) => state.Teams.modal.EditForm)
//   const deleteTeam = useSelector((state) => state.Teams.modal.DeleteForm)
//   const addMember = useSelector((state) => state.Teams.modal.MemberAddForm)
  
//   const teamsLoader = useSelector((state) => state.Teams.Loader)
//   // console.log(teamId)

//   useEffect(()=>{
//     dispatch(TeamsUrlGet())
//   },[])
//   // console.log(addTeam)
//   const closeCreateTeam = () => {
//     dispatch(AddForm())
//   }
//   const closeEditTeam = () => {
//     dispatch(EditForm())
//   }
//   const closeDeleteTeam = () => {
//     dispatch(DeleteForm())
//   }
//   const closeAddMember = () => {
//     dispatch(MemberAddForm())
//   }
//   const removeTeam = () =>{
//     dispatch(TeamsUrlDelete())
//   }
 
//   return (
//     <Fragment>
//       {teamsLoader?(
//         <Loader/>
//       ):(
// <Fragment>
//     {/* <div> */}
//       <Header />
//       <Drawer title='Create Team' open={addTeam} maskClosable={false} onClose={closeCreateTeam} ariaHideApp={false} width='90vh' footer={null}
//        extra={
//         <Space>
//           <Button onClick={closeCreateTeam}>Cancel</Button>
//         </Space>
//       }
//       >
//         <Add />
//       </Drawer>
//       <Modal title='Edit Team' style={{ top: 50 }} open={editTeam} maskClosable={false} onCancel={closeEditTeam} ariaHideApp={false} width='60vh' footer={null} >
//         <EditTeam />
//       </Modal>
//       <View />
//       <Modal title='Confirmation' style={{ top: 50 }} open={deleteTeam} maskClosable={false} onCancel={closeDeleteTeam} ariaHideApp={false} width='70vh' footer={null} >
//         <p style={{ fontSize: '16px', fontWeight: 500 }}><InfoCircleOutlined style={{ color: 'red', fontSize: '18px' }} /> Are you sure you want to delete this team ? </p>
//         <div style={{ display: 'flex', justifyContent: 'end' }}>
//           <Button htmlType='submit' type='primary' onClick={closeDeleteTeam}>Cancel</Button>
//           <Button htmlType='submit' type='primary' style={{ margin: '0 10px' }} onClick={removeTeam}>Ok</Button>
//         </div>
//       </Modal>
//       <Modal title='Add Member' style={{ top: 50 }} open={addMember} maskClosable={false} onCancel={closeAddMember} ariaHideApp={false} width='60vh' footer={null} >
//         <AddMember />
//       </Modal>
//       {/* </div> */}
//     </Fragment>
//       )}
//       </Fragment>
//   )
// }

// export default Teams