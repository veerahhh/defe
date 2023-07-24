import React, { Fragment, useEffect, useState } from 'react'
import Header from "../../components/header/Header";
import CommonTable from "../../components/table/CommonTable";
import Footer from "../../components/footer/Footer";
import { useSelector, useDispatch } from 'react-redux'
import { dTransformGet, DtranCreatePop, DtranGetId, dTransformGetOne, DtranViewPop, DtranEditPop ,DTransAddForm} from '../../redux/reducer/transform/DTransform'
import TransformAdd from '../../components/modal/transform/Add/Transform'
import { Switch, Modal, Drawer, Button, Space } from 'antd';
import * as Fi from 'react-icons/fi';
import * as Fa from 'react-icons/fa';
import moment from 'moment'
function DTransform() {

    const dispatch = useDispatch()
    const SearchData = useSelector((state) => state.Header.Search.value)
    const footerPage = useSelector((state) => state.Header.Footer.page)
    const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)
    const DTransformGetAll = useSelector((state) => state.DTransform.dTFormGetData)
    // console.log(DTransformGetAll)
    const TransCreate = useSelector((state) => state.DTransform.newForm.DtranCreatePop)
    // console.log(TransCreate)
    useEffect(() => {
        dispatch(dTransformGet(true))
    }, [])


    const transformColumn = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: '50px',
            render: (text, object, index) => { return index + 1 },
            // filteredValue: [SearchData],
            // onFilter: (value, record) => {
            //     return String(record.transform_name).toLowerCase().includes(value.toLowerCase());
            // }
        },
        {
            title: 'Transform Name',
            dataIndex: 'tName',
            width: '230px',
        },
        {
            title: 'Configuration Name',
            dataIndex: 'config_name',
            // sorter: (a, b) => { return a.config_name.localeCompare(b.config_name) },
            width: '250px',
        },

            
        {
            title: 'Start Date',
            dataIndex: 'sdate',
            // sorter: (a, b) => { return a.start_date.localeCompare(b.start_date) },
            width: '220px'
        },
        {
            title: 'End Date',
            dataIndex: 'edate',
            // sorter: (a, b) => { return a.end_date.localeCompare(b.end_date) },
            width: '220px'
        },
        {
            title: 'Active',
            dataIndex: 'active',
            width: '90px'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '70px'
        },
    ];
    const TransCreateModal = () => {
        dispatch(DTransAddForm({Search:true, DTransAddForm:false}))
        dispatch(DtranCreatePop({DtranCreatePop:false}))
    }

    const transData = DTransformGetAll.filter((val) => {
        if (SearchData === '') {
            return val
        } else if (val.transform_name.toString().toLowerCase().includes(SearchData.toLowerCase())) {
            return val
        }
    })

    

    const dTrans = transData.map((value) => {
        // console.log(value.transform_name)
        return (
            {
                tName : value.transform_name,
                config_name: value.config_name,
                sdate: moment.utc((value.start_date)).format('MM-DD-YYYY'),
                edate: moment.utc((value.end_date)).format('MM-DD-YYYY'),
                active: (<Switch checked={value.is_active === true ? true : false} />),
                action: (
                    <div className='Action_Icons'>
                        {/* {configurationAccess.map((val, key) => { */}
                            {/* return ( */}
                                <Fi.FiEdit size={16} onClick={() => {
                                    dispatch(DtranGetId({ singleData: value.id }))
                                    dispatch(dTransformGetOne())
                                    dispatch(DtranEditPop())
                                }} style={{ cursor: 'pointer', marginRight: '10px' }} />
                            {/* ) */}
                        {/* })} */}
                        <Fa.FaEye size={18} onClick={() => {
                            dispatch(DtranGetId({ singleData: value.id }))
                            dispatch(dTransformGetOne())
                            dispatch(DtranViewPop())
                        }} style={{ cursor: 'pointer', marginRight: '20px' }} />
                    </div>
                )

            }
        )
    })
    console.log(dTrans)
  
    const DataTransform = (page, pageSize) => {
        return dTrans.slice((page - 1) * pageSize, page * pageSize);
    };
    return (
        <Fragment>
            <Header />
            <CommonTable 
            TransformColumn={transformColumn}
            TransformData={DataTransform(footerPage, footerPageSize)} />
            <Drawer title=" Create D-Transform" open={TransCreate} maskClosable={false} onClose={TransCreateModal} ariaHideApp={false} width='100vh'
                footer={[
                    <div style={{ padding: '12px 50px', display: 'flex', justifyContent: 'flex-end', margin: '0% auto', marginTop: '8px' }} >

                    </div>]}
                footerStyle={{ backgroundColor: '#f5f5fd' }}

                extra={
                    <Space >
                        <Button onClick={TransCreateModal}>Cancel</Button>
                    </Space>
                }
            >
                <TransformAdd/>
            </Drawer>

            <Footer DataTransform={DTransformGetAll.length} />

        </Fragment>
    )
}

export default DTransform