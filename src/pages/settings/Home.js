import React, { Fragment, useEffect ,useState} from 'react'
import './Home.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ActionStatusChanger } from '../../redux/reducer/HeaderReducer'
import Header from "../../components/header/Header"
import CommonTable from "../../components/table/CommonTable";
import * as Fa from 'react-icons/fa'
import * as Fi from 'react-icons/fi'
import * as Md from 'react-icons/md'
import moment from 'moment';
import { Switch, Modal, Drawer, Space, Button } from 'antd';
import { PageAdd, PagesGetOne, PagesGet, PageGetId, PageView } from '../../redux/reducer/settings/PagesReducer'
import Loader from '../../components/loader/Loader'
import Footer from '../../components/footer/Footer'
import PagesAdd from '../../components/modal/settings/Pages/add/PagesAdd'
import PagesView from '../../components/modal/settings/Pages/view/PagesView'
import { AddUserForm, UserGet } from '../../redux/reducer/settings/UserReducer'
import AddUser from '../../components/modal/settings/User/AddUser/Adduser'
// import { InfoCircleOutlined } from '@ant-design/icons'
// import View from '../../components/modal/settings/Teams/View/View'
// import { AddForm, EditForm, DeleteForm, MemberAddForm, TeamsUrlGet, TeamsUrlDelete } from '../../redux/reducer/settings/TeamsReducer'
// import Add from '../../components/modal/settings/Teams/AddTeam/AddTeam'
// import EditTeam from '../../components/modal/settings/Teams/EditTeam/EditTeam'
// import AddMember from '../../components/modal/settings/Teams/AddMember/AddMember'
import { RoleAddmodel, Edit, View, RoleGet, RoleGetId, GetId } from '../../redux/reducer/settings/RoleReducer'
import RoleEditComponent from '../../components/modal/settings/Role/edit/RoleEdit'
import RoleViewComponent from '../../components/modal/settings/Role/view/RoleView'
import RoleAddComponent from '../../components/modal/settings/Role/add/RoleAdd';

import { tenantGet, tenantGetOne, TenantGetId, TenantViewPop, TenantEditPop, TenantCreatePop, TenantGroupViewPop } from '../../redux/reducer/tenantList/TenantListReducer'
import TenantAdd from '../../components/modal/tenantList/add/TenantAdd';
import TenantEdit from '../../components/modal/tenantList/edit/TenantEdit'
import GroupView from '../../components/modal/tenantList/view/GroupView'
import TenantView from '../../components/modal/tenantList/view/TenantView'

function Home(props) {
  const { pages } = props
  const dispatch = useDispatch();
  const searchData = useSelector((state) => state.Header.Search.value)
  const footerPage = useSelector((state) => state.Header.Footer.page)
  const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)

  const userData = useSelector((state) => state.User.Data)
  const userLoader = useSelector((state) => state.User.Loader)
  const addUser = useSelector((state) => state.User.modal.AddUserForm)

  //teams
  // const addTeam = useSelector((state) => state.Teams.modal.AddForm)
  // const editTeam = useSelector((state) => state.Teams.modal.EditForm)
  // const deleteTeam = useSelector((state) => state.Teams.modal.DeleteForm)
  // const addMember = useSelector((state) => state.Teams.modal.MemberAddForm)
  // const teamsLoader = useSelector((state) => state.Teams.Loader)

  useEffect(() => {
    dispatch(PagesGet(true))
    dispatch(UserGet(true))
    // dispatch(TeamsUrlGet())
    dispatch(tenantGet(true))
    dispatch(RoleGet(true))
  }, [])

  //tenantList
  const [secondDrawer, setSecondDrawer] = useState(false)
  const tenantGetLoader = useSelector((state) => state.Tenant.loader.Loader)
  // console.log(tenantGetLoader)
  const tenantGetAll = useSelector((state) => state.Tenant.TenantGetData)

  const tenantEditOpen = useSelector((state) => state.Tenant.newForm.TenantEditPop)
  const tenantViewOpen = useSelector((state) => state.Tenant.newForm.TenantViewPop)
  const tenantCreateOpen = useSelector((state) => state.Tenant.newForm.TenantCreatePop)
  const TenantGroupViewOpen = useSelector((state) => state.Tenant.newForm.TenantGroupViewPop)

  const secondDrawerOpenandClose = () => {
    secondDrawer === false ? setSecondDrawer(true) : setSecondDrawer(false)
  }
  const TenantEditModal = () => {
    dispatch(TenantEditPop())
  }

  const TenantGroupViewModal = () => {
    dispatch(TenantGroupViewPop())
  }

  const TenantViewModal = () => {
    dispatch(TenantViewPop())
  }

  const TenantAddModal = () => {
    dispatch(TenantCreatePop())
  }
  const tenantListColumns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      width: '50px',
      // render: (text, object, index) => { return index + 1 },
      render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },

    },
    {
      title: 'Company Name',
      dataIndex: 'companyname',
      // sorter: (a, b) => { return a.detailname.localeCompare(b.detailname) },
      width: '350px',
    },
    {
      title: 'Tenant ID',
      dataIndex: 'tenantid',
      width: '300px',

    },
    // {
    //     title: 'Work Groups Count',
    //     dataIndex: 'tenantid',
    //     width: '400px',

    // },
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
      width: '100px'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '150px'
    },
  ];

  const tenantFilterData = tenantGetAll.filter((val) => {
    if (searchData === '') {
      return val
    } else if (val.company_name.toString().toLowerCase().includes(searchData.toLowerCase())) {
      return val
    }
  })
  const [tenantid, setTenantId] = useState(0)
  const tenantData = tenantFilterData.map((val) => {

    return (
      {
        companyname: val.company_name,
        tenantid: val.tenant_id,
        sdate: moment.utc((val.start_date)).format('MM-DD-YYYY'),
        edate: moment.utc((val.end_date)).format('MM-DD-YYYY'),
        active: (<Switch checked={val.is_active === true ? true : false} />),
        action: (
          <div className='Action_Icons'>
            <Fi.FiEdit size={16} onClick={() => {
              dispatch(TenantGetId({ singleData: val.id }))
              dispatch(tenantGetOne())
              dispatch(TenantEditPop())
            }} style={{ cursor: 'pointer', marginRight: '10px' }} />
            <Fa.FaEye size={18} onClick={() => {
              dispatch(TenantGetId({ singleData: val.id }))
              dispatch(tenantGetOne())
              dispatch(TenantViewPop())
            }} style={{ cursor: 'pointer', marginRight: '10px' }} />
            <Md.MdOutlineGroups size={20} onClick={() => {
              dispatch(TenantGetId({ singleData: val.id }))
              setTenantId(val.id)
              setTimeout(function () { GetTeams(); }, 1000);
              dispatch(tenantGetOne())
              dispatch(TenantGroupViewPop())
            }} style={{ cursor: 'pointer', marginRight: '10px' }}
            />
          </div>
        )
      }

    )
  })

  // console.log(tenantid)
  const [listofteam, setListofTeam] = useState([])
  const [enable, setEnable] = useState(false)
  const GetTeams = () => {
    axios.get(`${URL}/tenant_teams_get/`).then((res) => {
      setListofTeam(res.data)
      // console.log(res.data)
      setEnable(true)
    })
  }
  console.log(listofteam)

  const tenantGetData = (page, pageSize) => {
    return tenantData.slice((page - 1) * pageSize, page * pageSize);
  };


  // Role

  const roleData = useSelector((state) => state.Role.Data)
  // console.log(roleData)
  const roleAddModalOpen = useSelector((state) => state.Role.modal.RoleAddmodel)
  const roleEditModalOpen = useSelector((state) => state.Role.modal.Edit)
  const roleViewModalOpen = useSelector((state) => state.Role.modal.View)

  const RoleEdit = useSelector((state) => state.Role.modal.Edit)
  const RoleView = useSelector((state) => state.Role.modal.View)

  const roleAddModal = () => {
    dispatch(RoleAddmodel())
  }

  const roleEditPopup = () => {
    dispatch(Edit())
  }

  const roleViewPopup = () => {
    dispatch(View())
  }

  const roleAccess = pages.filter((val) => {
    if (val.pages == "role") {
      return val
    }
  })

  const roleColumns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      width: '50px',
      // render: (text, object, index) => { return index + 1 },
      render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },
      filteredValue: [searchData],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Role Name',
      dataIndex: 'name',
      // sorter: (a, b) => { return a.name.localeCompare(b.name) },
      width: '200px',
      // sorter: (a, b) => { return a.name.localeCompare(b.name) },
    },
    {
      title: 'Description',
      dataIndex: 'des',
      width: '230px',
    },
    {
      title: 'Handling process',
      dataIndex: 'hlgprocess',
      width: '130px'
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

  ];
  const collectpageName = (e) => {
    const pages = []
    Object.entries(e).map(([key, list]) => {
      pages.push(list.pages + ' , ')

    })
    return pages
  }
console.log(collectpageName)
  const Data = roleData.map((val) => {
    // console.log(val)
    return ({
      name: val.role_name,
      des: val.role_desc,
      hlgprocess: collectpageName(val.role_handling_pages),
      sdate: moment.utc((val.role_start_date)).format('MM-DD-YYYY'),
      edate: moment.utc((val.role_end_date)).format('MM-DD-YYYY'),
      active: (<Switch checked={val.role_status === true ? true : false} />),
      action: (
        <div className='Action_Icons'>
          {roleAccess.map((value, key) => {
            return (
              <Fi.FiEdit size={16} onClick={() => {
                dispatch(GetId({ singleData: val.id }))
                dispatch(RoleGetId())
                dispatch(Edit())
              }} style={{ cursor: 'pointer', display: ((value.write == true ? "block" : "none")) }} />
            )
          })}
          <Fa.FaEye size={18} onClick={() => {
            dispatch(GetId({ singleData: val.id }))
            dispatch(RoleGetId())
            dispatch(View())
          }} style={{ cursor: 'pointer' }} />
        </div>
      )
    })

  })
  // console.log(Data)

  const roleGetData = (page, pageSize) => {
    return Data.slice((page - 1) * pageSize, page * pageSize);
  };


  const pagesAddPopup = () => {
    dispatch(PageAdd())
  }

  const pagesViewPopup = () => {
    dispatch(PageView())
  }
  const closeUser = () => {
    dispatch(AddUserForm())
  }
  // const closeCreateTeam = () => {
  //   dispatch(AddForm())
  // }
  // const closeEditTeam = () => {
  //   dispatch(EditForm())
  // }
  // const closeDeleteTeam = () => {
  //   dispatch(DeleteForm())
  // }
  // const closeAddMember = () => {
  //   dispatch(MemberAddForm())
  // }
  // const removeTeam = () => {
  //   dispatch(TeamsUrlDelete())
  // }

  const pageLoader = useSelector((state) => state.Page.Loader)
  const pageData = useSelector((state) => state.Page.Data)
  console.log(pageData)
  const pagesAddModalOpen = useSelector((state) => state.Page.modal.PageAdd)
  const pagesViewModalOpen = useSelector((state) => state.Page.modal.PageView)
  const UserGetOneData = useSelector((state) => state.UserRole.GetOneData)

  const pageColumns = [
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
      title: 'Policy Name',
      dataIndex: 'name',
      // sorter: (a, b) => { return a.name.localeCompare(b.name) },
      width: '200px',
      // sorter: (a, b) => { return a.name.localeCompare(b.name) },
    },
    {
      title: 'Policy Description',
      dataIndex: 'pageurl',
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

  const pagesData = pageData.map((val) => {
    console.log(val)
    return ({
      name: val.page_name,
      pageurl: val.page_desc,
      sdate: moment.utc((val.start_date)).format('MM-DD-YYYY'),
      edate: moment.utc((val.end_date)).format('MM-DD-YYYY'),
      active: (
        <Switch checked={val.is_active === true ? true : false} />
      ),
      action: (
        <div className='Action_Icons'>
          <Fa.FaEye size={18} onClick={() => {
            dispatch(PageGetId({ singleData: val.id }))
            dispatch(PagesGetOne())
            dispatch(PageView())
          }} style={{ cursor: 'pointer' }} />
        </div>
      )
    })
  })

  const pagesdata = (page, pageSize) => {
    return pagesData.slice((page - 1) * pageSize, page * pageSize);
  };

  //user
  const userSettingColumns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      width: '80px',
      render: (text, object, index) => { return index + 1 },
      filteredValue: [searchData],
      onFilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'First Name',
      dataIndex: 'name',
      // sorter: (a, b) => { return a.name.localeCompare(b.name) },
      width: '200px',
    },
    {
      title: 'Mail ID',
      dataIndex: 'mailid',
      width: '170px'
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
  ]
  const data = userData.map((val) => {
    return ({
      name: val.first_name,
      mailid: val.email,
      sdate: val.start_date,
      edate: val.end_date,
      active: (<Switch checked={val.is_active === true ? true : false} />),

    })
  })


  const userGetData = (page, pageSize) => {
    return data.slice((page - 1) * pageSize, page * pageSize);
  };

  return (
    <>
      {/* <div className='Settingheader' >
                Settings 
            </div> */}

      <Fragment>
        {pageLoader ? (
          <Loader />
        ) : (
          <Fragment>
            <Header />
            <Modal style={{ top: 260 }} open={pageLoader} maskClosable={true} closable={true} ariaHideApp={true} width='20vh' footer={null}>
              <Loader />
            </Modal>
            <CommonTable
              pageColumns={pageColumns} pagesData={pagesdata(footerPage, footerPageSize)}
              userColumn={userSettingColumns} userData={userGetData(footerPage, footerPageSize)}
              roleColumn={roleColumns} roleData={roleGetData(footerPage, footerPageSize)}
              tenantListColumns={tenantListColumns} tenantData={tenantGetData(footerPage, footerPageSize)}
            />
            <Drawer title="Page" open={pagesAddModalOpen} maskClosable={false} onClose={pagesAddPopup} ariaHideApp={false} width='100vh'
              footer={[
                <div style={{ padding: '12px 50px', display: 'flex', justifyContent: 'flex-end', margin: '0% auto', marginTop: '8px' }} >

                </div>]}
              footerStyle={{ backgroundColor: '#f5f5fd' }}
              extra={
                <Space>
                  <Button onClick={pagesAddPopup}>Cancel</Button>
                </Space>
              }
            >
              <PagesAdd />
            </Drawer>
            <Drawer title="Page View" open={pagesViewModalOpen} maskClosable={false} onClose={pagesViewPopup} ariaHideApp={false} width='100vh'
              footer={[
                <div style={{ padding: '12px 50px', display: 'flex', justifyContent: 'flex-end', margin: '0% auto', marginTop: '8px' }} >

                </div>]}
              footerStyle={{ backgroundColor: '#f5f5fd' }}


              extra={
                <Space>
                  <Button onClick={pagesViewPopup}>Cancel</Button>
                </Space>
              }
            >
              <PagesView />
            </Drawer>

            <Drawer title='Creating a Tenant User' open={addUser} maskClosable={false} onClose={closeUser} width='100vh'
              footer={[
                <div style={{ padding: '12px 50px', display: 'flex', justifyContent: 'flex-end', margin: '0% auto', marginTop: '8px' }} >

                </div>]}
              footerStyle={{ backgroundColor: '#f5f5fd' }}


              extra={
                <Space>
                  <Button onClick={closeUser}>Cancel</Button>
                </Space>
              }
            >
              <AddUser />
            </Drawer>

            {/* teams */}

            {/* <Drawer title='Create Team' open={addTeam} maskClosable={false} onClose={closeCreateTeam} ariaHideApp={false} width='90vh' footer={null}
              extra={
                <Space>
                  <Button onClick={closeCreateTeam}>Cancel</Button>
                </Space>
              }
            >
              <Add />
            </Drawer>
            <Modal title='Edit Team' style={{ top: 50 }} open={editTeam} maskClosable={false} onCancel={closeEditTeam} ariaHideApp={false} width='60vh' footer={null} >
              <EditTeam />
            </Modal>
            <View />
            <Modal title='Confirmation' style={{ top: 50 }} open={deleteTeam} maskClosable={false} onCancel={closeDeleteTeam} ariaHideApp={false} width='70vh' footer={null} >
              <p style={{ fontSize: '16px', fontWeight: 500 }}><InfoCircleOutlined style={{ color: 'red', fontSize: '18px' }} /> Are you sure you want to delete this team ? </p>
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Button htmlType='submit' type='primary' onClick={closeDeleteTeam}>Cancel</Button>
                <Button htmlType='submit' type='primary' style={{ margin: '0 10px' }} onClick={removeTeam}>Ok</Button>
              </div>
            </Modal>
            <Modal title='Add Member' style={{ top: 50 }} open={addMember} maskClosable={false} onCancel={closeAddMember} ariaHideApp={false} width='60vh' footer={null} >
              <AddMember />
            </Modal> */}



            {/* Role */}
            <Drawer title="New Role" open={roleAddModalOpen} maskClosable={false} onClose={roleAddModal} ariaHideApp={false} width='100vh' 
             
              footer={[
                <div style={{padding:'12px 20px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
      
            
            >
              <RoleAddComponent />
            </Drawer>
            <Drawer title="Role Edit" open={roleEditModalOpen} maskClosable={false} onClose={roleEditPopup} ariaHideApp={false} width='100vh' footer={null}
              extra={
                <Space>
                  <Button onClick={roleEditPopup}>Cancel</Button>
                </Space>
              }
            >
              <RoleEditComponent />
            </Drawer>
            <Drawer title="Role View" style={{ top: 65 }} open={roleViewModalOpen} maskClosable={false} onClose={roleViewPopup} ariaHideApp={false} width='100vh' footer={null}
              extra={
                <Space>
                  <Button onClick={roleViewPopup}>Cancel</Button>
                </Space>
              }
            >
              <RoleViewComponent />
            </Drawer>

            {/* TenantList */}

            <Drawer title="Create Tenant" open={tenantCreateOpen} maskClosable={false} onClose={TenantAddModal} ariaHideApp={false} width='100vh' footer={null}
              extra={
                <Space >
                  <Button onClick={TenantAddModal}>Cancel</Button>
                </Space>
              }
            >
              <TenantAdd />
            </Drawer>

            <Drawer title="Edit Tenant" open={tenantEditOpen} maskClosable={false} onClose={TenantEditModal} ariaHideApp={false} width='100vh' footer={null}
              extra={
                <Space >
                  <Button onClick={TenantEditModal}>Cancel</Button>
                </Space>
              }
            >
              <TenantEdit />
            </Drawer>

            <Drawer title="View Tenant" open={tenantViewOpen} maskClosable={false} onClose={TenantViewModal} ariaHideApp={false} width='100vh' footer={null}
              extra={
                <Space >
                  <Button onClick={TenantViewModal}>Cancel</Button>
                </Space>
              }
            >
              <TenantView />
            </Drawer>

            {enable && <Drawer title="GroupList" open={TenantGroupViewOpen} maskClosable={false} onClose={TenantGroupViewModal} ariaHideApp={false} width='100vh' footer={null}
              extra={
                <Space >
                  <Button onClick={TenantGroupViewModal}>Cancel</Button>
                </Space>
              }
            >
              <GroupView secondDrawer={secondDrawerOpenandClose} listofteam={listofteam} />
              <Drawer
                title="User View"
                width={350}
                closable={true}
                onClose={secondDrawerOpenandClose}
                open={secondDrawer}

                extra={
                  <Space >
                    <Button onClick={secondDrawerOpenandClose}>Cancel</Button>
                  </Space>
                }
              >
                <TenantView />
              </Drawer>
            </Drawer>}

            <Footer
              PageData={pageData.length}
              userFooter={userData.length}
              roleData={roleData.length}
              tenantData={tenantFilterData.length} />
          </Fragment>
        )}
      </Fragment>

    </>
  )
}

export default Home