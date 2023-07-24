import React from 'react'
import './CommonTable.css'
import { Table } from 'antd';
import { useSelector } from 'react-redux'

function CommonTable(props) {

  const {

    tenantListColumns,
    tenantData,
    connectionColumns,
    connectionData,
    connectionDetailsColumns,
    connectiondtlData,
    configurationColumns,
    config,
    dataTypeColumns,
    dType,
    schemamigcolumns,
    schemamigData,
    pipelineColumns,
    pipelineData,
    pipeDetaildata,
    pipelineDetailsColumns,
    sqlExtractColumns,
    sqlExtractData,
    scheduleColumns,
    scheduleData,
    scheduleDependancyColumns,
    scheduleDependancyData,
    monitorDataColumn,
    monitorData,
    monitorSchemaColumns,
    monitorSchemaData,
    roleColumn,
    roleData,
    roledetailColumn,
    roledetailData,
    userColumn,
    userData,
    userRoleColumn,
    userRoleData,
    pageColumns,
    pagesData,
    SpecialHandlingColumns,
    SpecialHandlingData,
    AIScienceColumn,
    AIScienceData,
    TransformData,
    TransformColumn
  } = props

  const subAction = useSelector((state) => state.Header.ActionButton.status)

  const columnDefinition = {
    "TenantList": tenantListColumns,
    "Connection": connectionColumns,
    "ConnectionDetails": connectionDetailsColumns,
    "SpecialHandling": SpecialHandlingColumns,
    "Configuration": configurationColumns,
    "DataMapping": dataTypeColumns,
    "SchemaMigration": schemamigcolumns,
    "Pipeline": pipelineColumns,
    "PipelineDetails": pipelineDetailsColumns,
    "SqlExtract": sqlExtractColumns,
    "Schedule": scheduleColumns,
    "ScheduleDependancy": scheduleDependancyColumns,
    "MonitorData": monitorDataColumn,
    "MonitorSchema": monitorSchemaColumns,
    "Role": roleColumn,
    "RoleDetails": roledetailColumn,
    "User": userColumn,
    "UserRole": userRoleColumn,
    "Pages": pageColumns,
    "SpecialHandling": SpecialHandlingColumns,
    "AIScience": AIScienceColumn,
    "Transform": TransformColumn

  }

  const dataDefinition = {
    "TenantList": tenantData,
    "Connection": connectionData,
    "ConnectionDetails": connectiondtlData,
    "Configuration": config,
    "DataMapping": dType,
    "SchemaMigration": schemamigData,
    "Pipeline": pipelineData,
    "PipelineDetails": pipeDetaildata,
    "SqlExtract": sqlExtractData,
    "Schedule": scheduleData,
    "ScheduleDependancy": scheduleDependancyData,
    "MonitorData": monitorData,
    "MonitorSchema": monitorSchemaData,
    "Role": roleData,
    "RoleDetails": roledetailData,
    "User": userData,
    "UserRole": userRoleData,
    "Pages": pagesData,
    "SpecialHandling": SpecialHandlingData,
    "AIScience": AIScienceData,
    "Transform": TransformData,
  }

  return (
    <div className='Common_Table_Conatiner'>

      <Table
        className='Connection_Table'
        columns={columnDefinition[subAction.replaceAll(' ', '')]}
        dataSource={dataDefinition[subAction.replaceAll(' ', '')]}
        pagination={false}
      />

    </div>
  )
}

export default CommonTable