import React, { Fragment,useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Footer from '../../../components/footer/Footer'
import Header from '../../../components/header/Header'
import CommonTable from '../../../components/table/CommonTable'
import { RoledetailsGet, addRoleDetails } from '../../../redux/reducer/settings/RoleDetailsReducer'
import { Switch, Modal, Drawer, Space, Button } from 'antd';
import Loader from '../../../components/loader/Loader'
import AddForm from '../../../components/modal/settings/RoleDetails/add/RoledetailsAdd'

function RoleDetail() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(RoledetailsGet(true))
  }, [])


  const footerPage = useSelector((state) => state.Header.Footer.page)
  const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)
  const searchData = useSelector((state) => state.Header.Search.value)
  const roleDetailLoader = useSelector((state) => state.RoleDetails.Loader)

  const roledetailData = useSelector((state) => state.RoleDetails.Data)
  const addroleDetails = useSelector((state) => state.RoleDetails.modal.addRoleDetails)

  const closeRoleDetailsAdd = () => {
    dispatch(addRoleDetails())
  }

  const roleDetailColumn = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      width: '50px',
      // render: (text, object, index) => { return index + 1 },
      render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },
      filteredValue: [searchData],
      onFilter: (value, record) => {
        return String(record.rolename).toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: 'Role Detail Name',
      dataIndex: 'dtlname',
      width: '150px',
    },
    {
      title: 'Role Name',
      dataIndex: 'rolename',
      // sorter: (a, b) => { return a.rolename.localeCompare(b.rolename) },
      width: '150px',
    },
    
    {
      title: 'Description',
      dataIndex: 'des',
      width: '100px',
    },
    {
      title: 'Handling process',
      dataIndex: 'hlgprocess',
      width: '130px'
    }
  ];

  const collectpageName = (e) => {
    const pages = []
    Object.entries(e).map(([key, list]) => {
      pages.push(list.pages + ' , ')

    })
    return pages
  }
console.log(collectpageName)
  const roledltData = roledetailData.map((val) => {
    return ({
      rolename: val.role_name,
      dtlname: val.role_detail_name,
      des: val.role_description,
      hlgprocess: collectpageName(val.role_handling_pages)

    })
  })


  const roledetailGetData = (page, pageSize) => {
    return roledltData.slice((page - 1) * pageSize, page * pageSize);
  };

  return (
    <Fragment>
    {roleDetailLoader?(
        <Loader/>
    ):(
         <Fragment>
      <Header />
      <Modal title={false} style={{ top: 260 }} open={roleDetailLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
        <Loader />
      </Modal>

      <Drawer title='Role Details' open={addroleDetails} maskClosable={false} onClose={closeRoleDetailsAdd} ariaHideApp={false} width='85vh' footer={null}
       extra={
        <Space>
          <Button onClick={closeRoleDetailsAdd}>Cancel</Button>
        </Space>
      }
      >
        <AddForm />
      </Drawer>
      <CommonTable roledetailColumn={roleDetailColumn} roledetailData={roledetailGetData(footerPage, footerPageSize)} />
      <Footer roledetailData={roledetailData.length} />
      </Fragment>
            )}
            </Fragment>
  )
}

export default RoleDetail