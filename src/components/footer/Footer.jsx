import React, { useState, useEffect } from 'react'
import './Footer.css'
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { FooterValue } from '../../redux/reducer/HeaderReducer'

function Footer(props) {

    const {
        connData,
        pipedata,
        sqlExtData,
        pipeDetailsData,
        configData,
        DataType,
        schemamig,
        scheduleData,
        conndtlData,
        scheduleDependancyData ,
        monitorGetData,
        PageData,
        userRoleFooter,
        userFooter,
        roleData,
        roledetailData,
        tenantData
    } = props

    const dispatch = useDispatch()

    const footerPage = useSelector((state) => state.Header.Footer.page)
    const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)
    const subAction = useSelector((state) => state.Header.ActionButton.status)

    const totalPage = {
        "Connection": connData,
        "ConnectionDetails": conndtlData,
        "Configuration":  configData,
        "DataMapping":DataType,
        "SchemaMigration":schemamig,
        "Pipeline": pipedata,
        "PipelineDetails": pipeDetailsData,
        "SqlExtract": sqlExtData,
        "Schedule":scheduleData,
        "ScheduleDependancy":scheduleDependancyData,
        "MonitorData":monitorGetData,
        "Pages":PageData,
        "UserRole":userRoleFooter,
        "User":userFooter,
        "RoleDetails":roledetailData,
        "Role":roleData,
        "TenantList":tenantData,
    }
// console.log(scheduleData)
    return (
        <div className='Footer_Container' >

            <Pagination
                className='Footer_Pagination'
                total={totalPage[subAction.replaceAll(' ', '')]}
                showSizeChanger
                showQuickJumper
                showTotal={(total) => `Total ${total} items`}
                pageSizeOptions={[1,5, 7, 10, 50, 100]}
                current={footerPage}
                pageSize={footerPageSize}
                onChange={(page, pageSize) => {
                    dispatch(FooterValue({ page: page, pagesize: pageSize }))
                }}
            />

        </div>
    )
}

export default Footer
