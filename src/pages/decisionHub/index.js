import React,{Fragment,useState} from 'react'
import Header from "../../components/header/Header";
import CommonTable from "../../components/table/CommonTable";
import { Switch, Modal, Drawer, Button, Space } from 'antd';
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader"
import { useSelector, useDispatch } from 'react-redux'
import {ColCreatePop,ColEditPop} from '../../redux/reducer/decisionhub/Column'
import ColumnAdd from '../../components/modal/decisionhub/columnAdd/ColumnAdd'
function AiScience() {
    const dispatch = useDispatch()
    const searchData = useSelector((state) => state.Header.Search.value)
    const footerPage = useSelector((state) => state.Header.Footer.page)
    const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)
    const ColCreateOpen = useSelector((state) => state.Column.newForm.ColCreatePop)
    const AIScienceColumn = [
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
            title: 'Column config',
            dataIndex: 'name',
            width: '200px',
            // sorter: (a, b) => a.name.localeCompare(b.name),
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

    const ColumnCreateModal = () => {
        dispatch(ColCreatePop())
    }
  return (
    <Fragment>
        <Header/>
        <CommonTable AIScienceColumn={AIScienceColumn}  />
        <Drawer title=" Basic Info"closable={false} open={ColCreateOpen} maskClosable={false} onClose={ColumnCreateModal} ariaHideApp={false} width='100vh'
            footer={[
                <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
                
                </div>]}
                footerStyle={{backgroundColor:'#f5f5fd'}}
                
                extra={
                    <Space >
                        <Button onClick={ColumnCreateModal}>Cancel</Button>
                    </Space>
                }
                key={ColCreateOpen? 'drawer-open' : 'drawer-closed'}
            >
                  
                < ColumnAdd />
            </Drawer>
        <Footer />
    </Fragment>
  )
}

export default AiScience