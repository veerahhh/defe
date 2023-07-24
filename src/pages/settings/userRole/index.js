import React, { useEffect } from 'react'
import Header from '../../../components/header/Header'
import CommonTable from '../../../components/table/CommonTable'
import { useSelector, useDispatch } from 'react-redux'
import * as Fi from 'react-icons/fi'
import * as Fa from 'react-icons/fa'
import moment from 'moment';
import { Switch, Modal, Drawer, Button, Space } from 'antd';
import { UserRoleGetOne, Edit, View, UserRoleGetId, UserRoleAddmodel, UserRoleGet } from '../../../redux/reducer/settings/UserRoleReducer'
import UserRoleAddComponent from '../../../components/modal/settings/UserRole/add/RoleUserAdd'
import UserRoleEditComponent from '../../../components/modal/settings/UserRole/edit/UserRoleEdit'
import UserRoleViewComponent from '../../../components/modal/settings/UserRole/view/UserRoleView'
import Loader from '../../../components/loader/Loader'
import Footer from '../../../components/footer/Footer'
import { UserGet } from '../../../redux/reducer/settings/UserReducer'

function UserRole(props) {
  const {pages}=props

  const dispatch = useDispatch();
  const userRoleData = useSelector((state) => state.UserRole.UserRoleData)

  useEffect(() => {
    dispatch(UserGet(true))
    dispatch(UserRoleGet(true))
  }, [])

  const userRoleEditModal = () => {
    dispatch(UserRoleGetOne(true))
    dispatch(Edit())
  }

  const userRoleViewModal = () => {
    dispatch(View())
  }

  const userRoleAddModal = () => {
    dispatch(UserRoleAddmodel())
  }

  const userRoleAccess=pages.filter((val)=>{
    if(val.pages=="userrole"){
      return val
    }
  })

  const searchData = useSelector((state) => state.Header.Search.value)
  const footerPage = useSelector((state) => state.Header.Footer.page)
  const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)

  const userRoleLoader = useSelector((state) => state.UserRole.Loader)
  const userAddModalOpen = useSelector((state) => state.UserRole.modal.UserRoleAddmodel)

  const userRoleEditModalOpen = useSelector((state) => state.UserRole.modal.Edit)
  const userRoleViewModalOpen = useSelector((state) => state.UserRole.modal.View)
  const UserGetOneData = useSelector((state) => state.UserRole.GetOneData)

  const userRoleColumns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      width: '80px',
      // render: (text, object, index) => { return index + 1 },
      render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },
      filteredValue: [searchData],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      // sorter: (a, b) => { return a.username.localeCompare(b.username) },
      width: '200px',
      // sorter: (a, b) => a.username.length - b.username.length,
    },
    {
      title: 'Role Name',
      dataIndex: 'rolename',
      // sorter: (a, b) => { return a.rolename.localeCompare(b.rolename) },
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
      width: '130px'
    },
  ]

  const data = userRoleData.map((val) => {
   
    return ({

      username: val.user_name,
      rolename: val.role_name,
      sdate: moment.utc((val.start_date)).format('MM-DD-YYYY'),
      edate: moment.utc((val.end_date)).format('MM-DD-YYYY'),
      active: (
        <Switch checked={val.is_active === true ? true : false} />
      ),
      action: (
        <div className='Action_Icons'>
          {userRoleAccess.map((value,key)=>{
                return(
          <Fi.FiEdit size={16} onClick={() => {
            dispatch(UserRoleGetId({ singleData: val.id, status: val.is_active }))
            dispatch(UserRoleGetOne())
            userRoleEditModal()
          }} style={{ cursor: 'pointer',display:((value.write==true?"block":"none")) ,marginRight:"10px"}} />
                )
        })}
          <Fa.FaEye size={18} onClick={() => {
            dispatch(UserRoleGetId({ singleData: val.id }))
            dispatch(UserRoleGetOne())
            dispatch(View())
          }} style={{ cursor: 'pointer', marginRight:"50px" }} />
        </div>
      )
    })
  })

  const userRoleGetData = (page, pageSize) => {
    return data.slice((page - 1) * pageSize, page * pageSize);
  };

  return (
    <div>
      <Header />
      <Modal title={false} style={{ top: 260 }} open={userRoleLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
        <Loader />
      </Modal>
      <CommonTable userRoleColumn={userRoleColumns} userRoleData={userRoleGetData(footerPage, footerPageSize)} />
      {/* <Modal title="User Role" style={{ top: 30 }} open={userAddModalOpen} maskClosable={false} onCancel={userRoleAddModal} ariaHideApp={false} width='60vh' footer={null}>
        <UserRoleAddComponent />
      </Modal> */}
          <Drawer title="User Role" open={userAddModalOpen} maskClosable={false} onClose={userRoleAddModal} ariaHideApp={false} width='90vh' footer={null}
                extra={
                    <Space>
                        <Button onClick={UserRoleAddComponent}>Cancel</Button>
                    </Space>
                }
            >
                <UserRoleAddComponent />
            </Drawer>
            <Drawer title="UserRole Edit"  open={userRoleEditModalOpen} maskClosable={false} onClose={userRoleEditModal} ariaHideApp={false} width='75vh' footer={null}>
        <UserRoleEditComponent />
      </Drawer>
      <Drawer title="UserRole View"  open={userRoleViewModalOpen} maskClosable={false} onClose={userRoleViewModal} ariaHideApp={false} width='75vh' footer={null}>
        <UserRoleViewComponent />
      </Drawer>
      <Footer userRoleFooter={userRoleData.length} />
    </div>
  )
}

export default UserRole