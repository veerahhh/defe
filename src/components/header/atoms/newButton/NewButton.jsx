import React, { useState } from 'react'
import './NewButton.css'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { CreatePop } from '../../../../redux/reducer/pipeline/SqlExtract';
import { ConnectionGet, connectionDetailGet } from '../../../../redux/reducer/connection/ConnectionDetailReducer'
import { configurationGet } from '../../../../redux/reducer/configuration/ConfigurationReducer'
import { ConCreatePop } from '../../../../redux/reducer/configuration/ConfigurationReducer'
import { AddFormOpen } from '../../../../redux/reducer/schedule/ScheduleDependency'
import { ListForm } from '../../../../redux/reducer/schedule/ScheduleReducer'
import { Add } from '../../../../redux/reducer/pipeline/PipelineReducer'
import { pipelineGet } from '../../../../redux/reducer/schedule/ScheduleReducer'
import { ConnPopupAdd } from '../../../../redux/reducer/connection/ConnectionReducer'
import { CreateModal } from '../../../../redux/reducer/pipeline/PipelineDetailReducer';
import { ConndtlPopupAdd } from '../../../../redux/reducer/connection/ConnectionDetailReducer'
import { RoleAddmodel } from '../../../../redux/reducer/settings/RoleReducer'
import { PageAdd } from '../../../../redux/reducer/settings/PagesReducer'
import { addRoleDetails, NewRoleGet, PageUrlGet } from '../../../../redux/reducer/settings/RoleDetailsReducer'
import { UserRoleAddmodel, RolenameGet } from '../../../../redux/reducer/settings/UserRoleReducer'
import { DTypeCreatePop, DataTypeGet } from '../../../../redux/reducer/configuration/DataTypeReducer'
import { AddForm } from '../../../../redux/reducer/settings/TeamsReducer'
import { SchemaMigrateCreatePop, SchemaMigrateGet } from '../../../../redux/reducer/pipeline/SchemamigReducer'
import { SplHandlingCreatePop, SplHandlingGet } from '../../../../redux/reducer/pipeline/SplHandlingReducer'
import { AddUserForm } from '../../../../redux/reducer/settings/UserReducer'
import { TenantCreatePop, tenantGet } from '../../../../redux/reducer/tenantList/TenantListReducer'
import { ColCreatePop } from '../../../../redux/reducer/decisionhub/Column'
import {DtranCreatePop} from '../../../../redux/reducer/transform/DTransform'

function NewButton(props) {

  const { configuration, connection, pipeline, schedule } = props

  const dispatch = useDispatch()
  const ActionStatus = useSelector((state) => state.Header.ActionButton.status)


  const ConfigurationAdd = () => {
    dispatch(configurationGet())
    dispatch(ConCreatePop())
  }
  const DataTypeAdd = () => {
    dispatch(DataTypeGet())
    dispatch(DTypeCreatePop())
  }
  const pipelineAddModal = () => {
    dispatch(configurationGet())
    dispatch(Add())
  }

  const SqlExtractCreateModal = () => {
    dispatch(connectionDetailGet())
    dispatch(CreatePop())
  }

  const scheduleDependancyAddForm = () => {

    dispatch(AddFormOpen())
  }

  const scheduleListModal = () => {
    dispatch(pipelineGet())
    dispatch(ListForm())
  }

  const NewConnectionAdd = () => {
    dispatch(ConnPopupAdd())
  }

  const NewConnectionDetailsAdd = () => {
    dispatch(ConndtlPopupAdd())
  }

  const pipelineDetailAddModal = () => {
    dispatch(CreateModal())
  }

  const newRoleAdd = () => {
    dispatch(RoleAddmodel())
  }

  const pages = () => {
    dispatch(PageAdd())
  }

  const RoleDetails = () => {
    dispatch(NewRoleGet())
    dispatch(addRoleDetails())
    dispatch(PageUrlGet())
  }

  const userRoleAddModal = () => {
    dispatch(UserRoleAddmodel())
    dispatch(RolenameGet())
  }

  const createTeam = () => {
    dispatch(AddForm())
  }

  const Schemamigration = () => {
    dispatch(SchemaMigrateCreatePop({ SchemaMigrateCreatePop: true }))
    dispatch(SchemaMigrateGet())
    // dispatch(schemaadd())
  }

  const SpecialHandling = () => {
    dispatch(SplHandlingCreatePop({ SplHandlingCreatePop: true }))
    dispatch(SplHandlingGet())
    // dispatch(schemaadd())
  }

  const createUser = () => {
    dispatch(AddUserForm())
  }
  const TenantAdd = () => {

    dispatch(TenantCreatePop())
  }
  const ColumnAdd = () => {
    dispatch(ColCreatePop())
  }
  const TransformAdd=()=>{
    dispatch((DtranCreatePop({DtranCreatePop:true})))
    dispatch(configurationGet())
  }

  return (
    <div className='AddButton-Parent-Container'>

      <>

        <>
          <Button size='medium' onClick={TenantAdd} type='primary' className={ActionStatus === "TenantList" ? "AddButton" : "inActiveButton"}>New Tenant</Button>
          {/* <Button size='medium' type='primary' className={ActionStatus === "Connection Details" ? "AddButton" : "inActiveButton"}>New Tenant Details</Button>  */}
        </>

      </>

      <>

        <>
          <Button size='medium' type='primary' onClick={ColumnAdd} className={ActionStatus === "AIScience" ? "AddButton" : "inActiveButton"}>New Column</Button>
        </>

      </>
      <>

        <>
          <Button size='medium' type='primary'onClick={TransformAdd} className={ActionStatus === "Transform" ? "AddButton" : "inActiveButton"} >New Transform</Button>

        </>

      </>
      <>
        {connection && connection.map((val) => {
          return (
            <>
              <Button onClick={NewConnectionAdd} size='medium' type='primary' className={ActionStatus === "Connection" && val.write == true ? "AddButton" : "inActiveButton"}>New Connection</Button>
              <Button onClick={NewConnectionDetailsAdd} size='medium' type='primary' className={ActionStatus === "Connection Details" && val.connectionDetails.write == true ? "AddButton" : "inActiveButton"}>New Connection Details</Button>
            </>
          )
        })}
      </>

      <>
        {configuration && configuration.map((val) => {
          // console.log(val)
          return (
            <>
              <Button onClick={ConfigurationAdd} size='medium' type='primary' className={ActionStatus === "Configuration" && val.write == true ? "AddButton" : "inActiveButton"}>New Config</Button>
              <Button onClick={DataTypeAdd} size='medium' type='primary' className={ActionStatus === "DataMapping" && val.dataMapping.write == true ? "AddButton" : "inActiveButton"}>New Datatype</Button>
              {/* <Button onClick={Schemamigration} size='medium' type='primary' className={ActionStatus === "SchemaMigration"  && val.schemaMigration.write == true ? "AddButton" : "inActiveButton"}>Schema Migration</Button>
              <Button onClick={SpecialHandling} size='medium' type='primary' className={ActionStatus === "SpecialHandling"? "AddButton" : "inActiveButton"}>Special Handle</Button> */}
            </>
          )
        })}
      </>

      <>
        {pipeline && pipeline.map((val) => {
          return (
            <>
              <Button onClick={pipelineAddModal} size='medium' type='primary' className={ActionStatus === "Pipeline" && val.write == true ? "AddButton" : "inActiveButton"}>New Pipeline</Button>
              <Button onClick={pipelineDetailAddModal} size='medium' type='primary' className={ActionStatus === "Pipeline Details" && val.pipelinesDetail.write == true ? "AddButton" : "inActiveButton"}>New Pipeline Details</Button>
              <Button onClick={SqlExtractCreateModal} size='medium' type='primary' className={ActionStatus === "Sql Extract" && val.sqlExtracts.write == true ? "AddButton" : "inActiveButton"}>New Sql Extract</Button>
              <Button onClick={Schemamigration} size='medium' type='primary' className={ActionStatus === "SchemaMigration" && val.schemaMigration.write == true ? "AddButton" : "inActiveButton"}>Schema Migration</Button>
              <Button onClick={SpecialHandling} size='medium' type='primary' className={ActionStatus === "SpecialHandling" ? "AddButton" : "inActiveButton"}>Special Handle</Button>
            </>
          )
        })}
      </>
      <>
        {schedule && schedule.map((val) => {
          return (
            <>
              <Button onClick={scheduleListModal} size='medium' type='primary' className={ActionStatus === "Schedule" && val.write == true ? "AddButton" : "inActiveButton"}>New Schedule</Button>
              <Button onClick={scheduleDependancyAddForm} size='medium' type='primary' className={ActionStatus === "Schedule Dependancy" && val.scheduleDependency.write == true ? "AddButton" : "inActiveButton"}>New Schedule Dependency</Button>
            </>
          )
        })}
      </>
      {/* <Button  size='medium' type='primary' className={ActionStatus === "DTransform " ? "AddButton" : "inActiveButton"}>DTransform</Button> */}
      <Button onClick={newRoleAdd} size='medium' type='primary' className={ActionStatus === "Role " ? "AddButton" : "inActiveButton"}>New Role</Button>
      <Button onClick={pages} size='medium' type='primary' className={ActionStatus === "Pages" ? "AddButton" : "inActiveButton"}>New Policy</Button>
      <Button onClick={RoleDetails} style={{ marginLeft: "210px" }} size='medium' type='primary' className={ActionStatus === "Role Details" ? "AddButton" : "inActiveButton"}>New Role Details</Button>
      {/* <Button onClick={userRoleAddModal} size='medium' type='primary' className={ActionStatus === "User Role" ? "AddButton" : "inActiveButton"}>User Role</Button> */}
      <Button onClick={createTeam} size='medium' type='primary' className={ActionStatus === "Teams" ? "AddButton" : "inActiveButton"}>Create Team</Button>
      <Button onClick={createUser} size='medium' type='primary' className={ActionStatus === "User" ? "AddButton" : "inActiveButton"}>Create User</Button>
    </div>
  )
}

export default NewButton