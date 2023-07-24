import React from 'react'
import './ActionButton.css'
import { useSelector, useDispatch } from 'react-redux'
import { ActionStatusChanger } from '../../../../redux/reducer/HeaderReducer'
import { Breadcrumb } from 'antd'
import { useNavigate } from 'react-router-dom'

function ActionButton(props) {

  const { connection, configuration, pipeline, schedule } = props
  const navigate = useNavigate()
  // console.log(schedule)

  const actionName = useSelector((state) => state.Header.ActionButton.name)
  const actionStatus = useSelector((state) => state.Header.ActionButton.status)
  // console.log(actionName,actionStatus)
  // const BreadcrumbData = {
  //   'Role': "Role",
  //   'RoleDetails': "RoleDetails",
  //   'User': "User",
  //   'UserRole': "User Role",
  //   'Pages': "Pages",
  //   'Teams': 'Teams',
  // }

  const dispatch = useDispatch()

  return (

    <div>

      {/* <div className={actionName === 'TenantList' ? 'activeComponent' : 'inactiveComponent'}>
        <button className={actionStatus === 'TenantList' ? 'TenantList-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'TenantList' }))}>TenantList</button>     
      </div> */}

      <>
        {connection && connection.map((val) => {
          return (
            <div className={actionName === 'Connection' ? 'activeComponent' : 'inactiveComponent'}>
              <button style={{ display: ((val.view == true ? 'block' : 'none')) }} className={actionStatus === 'Connection' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Connection' }))}>Connections</button>
              <button style={{ visibility: ((val.connectionDetails.view == true ? 'visible' : 'hidden')) }} className={actionStatus === 'Connection Details' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Connection Details' }))}>Connections Detail</button>
            </div>
          )
        })}
      </>

      <>
        {configuration && configuration.map((val) => {
          return (
            <div className={actionName === 'Configuration' ? 'activeComponent' : 'inactiveComponent'}>
              <button style={{ display: ((val.view == true ? 'block' : 'none')) }} className={actionStatus === 'Configuration' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Configuration' }))}>Configurations</button>
              <button style={{ display: ((val.dataMapping.view == true ? 'block' : 'none')) }} className={actionStatus === 'DataMapping' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'DataMapping' }))}>Data Mapping</button>
              {/* <button style={{ visibility: ((val.schemaMigration.view == true ? 'visible' : 'hidden')) }} className={actionStatus === 'SchemaMigration' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'SchemaMigration' }))}>Schema Migration</button>
              <button  className={actionStatus === 'SpecialHandling' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => {
                // navigate("/special")
                dispatch(ActionStatusChanger({ status: 'SpecialHandling' }))}}>Special Handling</button> */}
            </div>
          )
        })}
      </>

      <>
        {pipeline && pipeline.map((val) => {
          // console.log(val)
          return (
            <div className={actionName === 'Pipeline' ? 'activeComponent' : 'inactiveComponent'} style={{ display: 'flex', gap: '20px' }}>
              <button style={{ display: ((val.view == true ? 'block' : 'none')) }} className={actionStatus === 'Pipeline' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Pipeline' }))}>Pipelines</button>
              <button style={{ display: ((val.pipelinesDetail.view == true ? 'block' : 'none')) }} className={actionStatus === 'Pipeline Details' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Pipeline Details' }))}>Pipelines Detail</button>
              {/* <button style={{ visibility: ((val.sqlExtracts.view == true ? 'visible' : 'hidden')) }} className={actionStatus === 'Sql Extract' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Sql Extract' }))}>Sql Extracts</button> */}
              <button style={{ display: ((val.schemaMigration.view == true ? 'block' : 'hidden')) }} className={actionStatus === 'SchemaMigration' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'SchemaMigration' }))}>Schema Migration</button>
              <button className={actionStatus === 'SpecialHandling' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => {
                // navigate("/special")
                dispatch(ActionStatusChanger({ status: 'SpecialHandling' }))
              }}>Special Handling</button>
            </div>
          )
        })}
      </>

      <>
        {schedule && schedule.map((val) => {
          return (
            <div className={actionName === 'Schedule' ? 'activeComponent' : 'inactiveComponent'}>
              <button style={{ display: ((val.view == true ? 'block' : 'none')) }} className={actionStatus === 'Schedule' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Schedule' }))}>Schedules</button>
              <button style={{ visibility: ((val.scheduleDependency.view == true ? 'visible' : 'hidden')) }} className={actionStatus === 'Schedule Dependancy' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Schedule Dependancy' }))}>Schedules Dependency</button>
            </div>
          )
        })}
      </>

      <div className={actionName === 'Audit' ? 'activeComponent' : 'inactiveComponent'}>
        <button className={actionStatus === 'Audit' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Audit' }))}>Pre-Audit</button>
        <button className={actionStatus === 'PostAudit' ? 'Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'PostAudit' }))}>Post-Audit</button>
      </div>

      <div className={actionName === 'MonitorData' ? 'activeComponent' : 'inactiveComponent'}>
        <button className={actionStatus === 'MonitorData' ? 'Monitor-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'MonitorData' }))}>Monitor Data</button>
        <button className={actionStatus === 'MonitorSchema' ? 'Monitor-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'MonitorSchema' }))}>Monitor Schema</button>
      </div>

      <div className={actionName === 'Settings' ? 'activeSetComponent' : 'inactiveComponent'}>
        <button className={actionStatus === 'User' ? 'Set-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'User' }))}>User</button>
        <button className={actionStatus === 'Pages' ? 'Set-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Pages' }))}>Policy</button>
        <button className={actionStatus === 'Role ' ? 'Set-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Role ' }))}>Role</button>
        <button className={actionStatus === 'TenantList' ? 'TenantList-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'TenantList' }))}>TenantList</button>
        {/* <button className={actionStatus === 'Teams' ?  'Set-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Teams' }))}>Teams</button> */}
        {/* <Breadcrumb>
          <Breadcrumb.Item><a href='/settings'>Settings</a></Breadcrumb.Item>
          <Breadcrumb.Item>{BreadcrumbData[actionStatus.replaceAll(' ', '')]}</Breadcrumb.Item>
        </Breadcrumb> */}
      </div>

      <div className={actionName === 'AIScience' ? 'activeSetComponent' : 'inactiveComponent'}>
        <button className={actionStatus === 'AIScience' ? 'Set-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'AIScience' }))}>Column Description</button>
        <button className={actionStatus === 'Cleansing' ? 'Set-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Cleansing' }))}>Cleansing</button>
      </div>

      <div className={actionName === 'Transform' ? 'activeSetComponent' : 'inactiveComponent'}>
      <button  className={actionStatus === 'TalendConfig' ? 'Set-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'TalendConfig' }))}>Talend Config</button> 
        <button className={actionStatus === 'Transform' ? 'Set-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Transform' }))}>DTransform</button>
  

      </div>

      <div className={actionName === 'Visualization' ? 'activeSetComponent' : 'inactiveComponent'}>
        <button className={actionStatus === 'Tableau' ? 'Set-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Tableau' }))}>Tableau</button>
        {/* <button className={actionStatus === 'Powerbi' ? 'Set-Active-Tab' : 'Inactive-Tab'} onClick={() => dispatch(ActionStatusChanger({ status: 'Powerbi' }))}>Power Bi</button> */}


      </div>

    </div>

  )
}

export default ActionButton