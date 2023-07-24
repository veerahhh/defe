import React, { Fragment, useEffect } from 'react'
import Header from '../../../components/header/Header'
import CommonTable from '../../../components/table/CommonTable'
import Footer from '../../../components/footer/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { RoleGet } from '../../../redux/reducer/settings/RoleReducer'
import moment from 'moment';
import * as Fi from 'react-icons/fi'
import * as Fa from 'react-icons/fa'
import Loader from '../../../components/loader/Loader'
import { Switch, Modal, Drawer, Space, Button } from 'antd';
import { RoleAddmodel, Edit, View, RoleGetId,GetId} from '../../../redux/reducer/settings/RoleReducer'
import RoleEditComponent from '../../../components/modal/settings/Role/edit/RoleEdit'
import RoleViewComponent from '../../../components/modal/settings/Role/view/RoleView'
import RoleAddComponent from '../../../components/modal/settings/Role/add/RoleAdd';

function Role(props) {
    const {pages}=props

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(RoleGet(true))
    }, [])

    const searchData = useSelector((state) => state.Header.Search.value)
    const footerPage = useSelector((state) => state.Header.Footer.page)
    const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)

    const roleLoader = useSelector((state) => state.Role.Loader)

    const roleData = useSelector((state) => state.Role.Data)


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

    const roleAccess=pages.filter((val)=>{
        if(val.pages=="role"){
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

    const Data = roleData.map((val) => {
        return ({
            name: val.role_name,
            des: val.role_desc,
            sdate: moment.utc((val.role_start_date)).format('MM-DD-YYYY'),
            edate: moment.utc((val.role_end_date)).format('MM-DD-YYYY'),
            active: (<Switch checked={val.role_status === true ? true : false} />),
            action: (
                <div className='Action_Icons'>
                    {roleAccess.map((value,key)=>{
                return(
                    <Fi.FiEdit size={16} onClick={()=>{
                            dispatch(GetId({singleData:val.id}))
                            dispatch(RoleGetId())
                            dispatch(Edit())}} style={{ cursor: 'pointer',display:((value.write==true?"block":"none")) }} />
                )
                    })}
                    <Fa.FaEye size={18} onClick={()=>{
                            dispatch(GetId({singleData:val.id}))
                            dispatch(RoleGetId())
                            dispatch(View())}} style={{ cursor: 'pointer' }} />
                </div>
            )
        })
    })

    const roleGetData = (page, pageSize) => {
        return Data.slice((page - 1) * pageSize, page * pageSize);
    };

    return (
        <Fragment>
            {roleLoader?(
                <Loader/>
            ):(
                 <Fragment>
            <Header />
            <Modal title={false} style={{ top: 260 }} open={roleLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
                <Loader />
            </Modal>
            <CommonTable roleColumn={roleColumns} roleData={roleGetData(footerPage, footerPageSize)} />
            <Drawer title="New Role" open={roleAddModalOpen} maskClosable={false} onClose={roleAddModal} ariaHideApp={false} width='80vh' footer={null}
            extra={
                <Space>
                  <Button onClick={roleAddModal}>Cancel</Button>
                </Space>
              }
            >
                <RoleAddComponent />
            </Drawer>
            <Drawer title="Role Edit" open={roleEditModalOpen} maskClosable={false} onClose={roleEditPopup} ariaHideApp={false} width='60vh' footer={null}
            extra={
                <Space>
                  <Button onClick={roleEditPopup}>Cancel</Button>
                </Space>
              }
            >
                <RoleEditComponent />
            </Drawer>
            <Drawer title="Role View" style={{ top: 65 }} open={roleViewModalOpen} maskClosable={false} onClose={roleViewPopup} ariaHideApp={false} width='60vh' footer={null}
            extra={
                <Space>
                  <Button onClick={roleViewPopup}>Cancel</Button>
                </Space>
              }
            >
                <RoleViewComponent />
            </Drawer>

            <Footer roleData={roleData.length} />
            </Fragment>
            )}
            </Fragment>
    )
}

export default Role