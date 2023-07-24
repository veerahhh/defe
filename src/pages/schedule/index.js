import React, { Fragment, useEffect } from 'react'
import Header from "../../components/header/Header";
import CommonTable from "../../components/table/CommonTable";
import Footer from "../../components/footer/Footer";
import { useSelector, useDispatch } from 'react-redux'
import { ScheduleDependencyGet, AddFormOpen, EditForm, ViewForm, getId, ScheduleDependencyGetOne } from '../../redux/reducer/schedule/ScheduleDependency';
import { ScheduleGet, ScheduleGetOne, getSchedId,ScheduleAddForm} from '../../redux/reducer/schedule/ScheduleReducer'
import { ListForm, ViewSchedForm, EditSchedForm } from '../../redux/reducer/schedule/ScheduleReducer'
import * as Fi from 'react-icons/fi'
import * as Fa from 'react-icons/fa'
import { Switch, Modal,Drawer,Space,Button } from 'antd';
import ScheduleDependencyAdd from '../../components/modal/schedule/scheduleDependency/add/ScheduleDependencyAdd'
import ScheduleDependencyEdit from '../../components/modal/schedule/scheduleDependency/edit/ScheduleDependencyEdit'
import ScheduleDependencyView from '../../components/modal/schedule/scheduleDependency/view/ScheduleDependencyView'
import ScheduleAdd from '../../components/modal/schedule/schedule/add/ScheduleAdd';
import ScheduleEdit from '../../components/modal/schedule/schedule/edit/ScheduleEdit';
import ScheduleView from '../../components/modal/schedule/schedule/view/ScheduleView';
import Loader from '../../components/loader/Loader';
import moment from 'moment'


function Schedule(props) {
  const {pages}=props

  const dispatch = useDispatch()

  const searchData = useSelector((state) => state.Header.Search.value)
  const footerPage = useSelector((state) => state.Header.Footer.page)
  const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)
  const schduleDepData = useSelector((state) => state.ScheduleDependency.Data)
  const addModalOpen = useSelector((state) => state.ScheduleDependency.newForm.AddForm)
  const editModalOpen = useSelector((state) => state.ScheduleDependency.newForm.EditForm)
  const viewModalOpen = useSelector((state) => state.ScheduleDependency.newForm.ViewForm)
  const getOneData = useSelector((state) => state.ScheduleDependency.getData)
  const scheduleLoader = useSelector((state) => state.Schedule.loader.Loader)

  // Schedule selectors
  const listData = useSelector((state) => state.Schedule.newForm.AddForm)
  const scheddepgetoneData = useSelector((state) => state.ScheduleDependency.getOneData);
  const scheduleData = useSelector((state) => state.Schedule.scheduleData)
  const viewschedModalOpen = useSelector((state) => state.Schedule.newForm.ViewSchedForm);
  const editschedModalOpen = useSelector((state) => state.Schedule.newForm.EditSchedForm)

  useEffect(() => {
    dispatch(ScheduleGet(true))
    dispatch(ScheduleDependencyGet(true))
  }, [])

  const addModalClose = () => {
    dispatch(AddFormOpen())
  }

  const editModalClose = () => {
    dispatch(EditForm())
  }

  const viewModalClose = () => {
    dispatch(ViewForm())
  }

  const closeAddScheduleModal = () => {
    dispatch(ListForm())
    dispatch(ScheduleAddForm({search:true, ScheduleAdd:false}))

  }

  const closeViewScheduleModal = () => {
    dispatch(ViewSchedForm())
  }

  const closeEditScheduleModal = () => {
    dispatch(EditSchedForm())
  }

  const scheduleAddCancel=()=>{
  dispatch(ScheduleAddForm({search:true, ScheduleAdd:false}))
  }
  const scheduleAccess = pages.filter((val) => {
    if (val.pages == "schedule") {
      return val
    }
  })

  const scheduleColumns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      width: '70px',
      render: (text, object, index) => { return index + 1 },
    },
    {
      title: 'Pipeline Schedule Name',
      dataIndex: 'sched_name',
      // sorter: (a, b) => { return a.sched_name.localeCompare(b.sched_name) },
      width: '200px',

    },
    {
      title: 'Pipeline Detail Name',
      dataIndex: 'pipeline_detail_name',
      width: '200px',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      // sorter: (a, b) => { return a.start_date.localeCompare(b.start_date) },
      width: '170px'
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      // sorter: (a, b) => { return a.end_date.localeCompare(b.end_date) },
      width: '170px'
    },
    {
      title: 'Active',
      dataIndex: 'active',
      width: '110px'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '70px'
    },
  ];

  const scheduleFilterData=scheduleData.filter((val)=>{
    if(searchData===''){
        return val
    }else if(val.pipeline_schedule_name.toString().toLowerCase().includes(searchData.toLowerCase())){
        return val
    }
})

  const schedData = scheduleFilterData.map(function (val) {
    return (
      {
        sched_name: val.pipeline_schedule_name,
        pipeline_detail_name: val.pipeline_detail_name,
        pipeline_schedule_description: val.pipeline_schedule_desc,
        start_date: moment.utc((val.pipeline_schedule_start_date)).format('MM-DD-YYYY'),
        end_date: moment.utc((val.pipeline_schedule_end_date)).format('MM-DD-YYYY'),
        active: (<Switch checked={val.pipeline_status === true ? true : false} />),
        action: (
          <div style={{ display: 'flex',  width: '50px', justifyContent: 'space-between'}}>
          {scheduleAccess.map((value,key)=>{
            return(
            <Fi.FiEdit size={16} onClick={() => {
              dispatch(getSchedId({ getId: val.id }))
              dispatch(ScheduleGetOne())
              closeEditScheduleModal()
            }} style={{marginRight:'10px',display:value.write==true?"block":"none",cursor:"pointer"}} />
            )
          })}
            <Fa.FaEye size={16} onClick={() => {
              dispatch(getSchedId({ getId: val.id }))
              dispatch(ScheduleGetOne())
              closeViewScheduleModal()
            }}style={{cursor:"pointer"}}
            />
          </div>
        )
      }
    )
  })

  const schData = (page, pageSize) => {
    return schedData.slice((page - 1) * pageSize, page * pageSize);
  };

  const scheduleDependancyColumns = [
    {
      title: 'S.No',
      dataIndex: 'sno',
      width: '50px',
      // render: (text, object, index) => { return index + 1 },
      render: (text, object, index) => { return (footerPage - 1) * footerPageSize + index + 1 },
    },
    {
      title: 'Pipeline Schedule Dependency Name',
      dataIndex: 'pipeline_schedule_dependency_name',
      // sorter: (a, b) => { return a.pipeline_schedule_dependency_name.localeCompare(b.pipeline_schedule_dependency_name) },
      width: '450px',
    },
    {
      title: 'Parent Schedule Name',
      dataIndex: 'parent_schedule_name',
      width: '300px',
    },
    {
      title: 'Child Schedule Name',
      dataIndex: 'child_schedule_name',
      width: '300px',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      // sorter: (a, b) => { return a.start_date.localeCompare(b.start_date) },
      width: '220px'
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      // sorter: (a, b) => { return a.end_date.localeCompare(b.end_date) },
      width: '220px'
    },
    {
      title: 'Active',
      dataIndex: 'active',
      width: '100px'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      width: '70px'
    },
  ];

  const scheduleDepFilterData=schduleDepData.filter((val)=>{
    if(searchData===''){
        return val
    }else if(val.pipeline_schedule_dependency_name.toString().toLowerCase().includes(searchData.toLowerCase())){
        return val
    }
  })

  const scheduleDependancyData = scheduleDepFilterData.map(function (val) {
    return (
      {
        pipeline_schedule_dependency_name: val.pipeline_schedule_dependency_name,
        parent_schedule_name: val.parent_schedule_name,
        child_schedule_name: val.child_schedule_name,
        start_date: moment.utc((val.start_date)).format('MM-DD-YYYY'),
        end_date: moment.utc((val.end_date)).format('MM-DD-YYYY'),
        active: (<Switch checked={val.is_active === true ? true : false} />),
        action: (
          <div style={{ display: 'flex', width: '50px', justifyContent: 'space-between' }}>
          {scheduleAccess.map((value,key)=>{
            return(
            <Fi.FiEdit size={16} onClick={() => {
              dispatch(getId({ getData: val.id }))
              dispatch(ScheduleDependencyGetOne())
              dispatch(EditForm())
            }}style={{marginRight:'10px',display:value.write==true?"block":"none",cursor:"pointer"}}
            />
            )
          })}
            <Fa.FaEye size={16} onClick={() => {
              dispatch(getId({ getData: val.id }))
              dispatch(ScheduleDependencyGetOne())
              dispatch(ViewForm())
            }}style={{cursor:"pointer"}}
            />
          </div>
        )
      }
    )
  })

  const schDepData = (page, pageSize) => {
    return scheduleDependancyData.slice((page - 1) * pageSize, page * pageSize);
  };


  return (
    <Fragment>
      {scheduleLoader?(
        <Loader/>):(
 
      <Fragment>
      <Header schedule={scheduleAccess}/>
      <Drawer title="New Schedule Dependency" open={addModalOpen} maskClosable={false} onClose={addModalClose} ariaHideApp={false} width='75vh'
      footer={[ 
        <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
        
        </div>]}
        footerStyle={{backgroundColor:'#f5f5fd'}}
        
      extra={
        <Space>
          <Button onClick={addModalClose}>Cancel</Button>
        </Space>
      }
      >
        <ScheduleDependencyAdd />
      </Drawer>
      <Drawer title="Edit Schedule Dependency"  open={editModalOpen} maskClosable={false} onClose={editModalClose} ariaHideApp={false} width='75vh' footer={null}
      // extra={
      //   <Space>
      //     <Button onClick={editModalClose}>Cancel</Button>
      //   </Space>
      // }
      >
        <ScheduleDependencyEdit scheddepgetoneData={scheddepgetoneData} />
      </Drawer>
      <Drawer title="View Schedule Dependency" open={viewModalOpen} maskClosable={false} onClose={viewModalClose} ariaHideApp={false} width='75vh' footer={null}
      // extra={
      //   <Space>
      //     <Button onClick={viewModalClose}>Cancel</Button>
      //   </Space>
      // }
      >
        <ScheduleDependencyView scheddepgetoneData={scheddepgetoneData} />
      </Drawer>
      <Modal style={{ top: 260 }} open={scheduleLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
        <Loader />
      </Modal>
      <Drawer title="New Schedule"  open={listData} maskClosable={false} onClose={closeAddScheduleModal} ariaHideApp={false} width='85vh'
      footer={[
        <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
        
        </div>]}
        footerStyle={{backgroundColor:'#f5f5fd'}}
      extra={
        <Space onClick={scheduleAddCancel}>
          <Button onClick={closeAddScheduleModal}>Cancel</Button>
        </Space>
      }
      >
        <ScheduleAdd />
      </Drawer>
      <Drawer title="Edit Schedule" open={editschedModalOpen} maskClosable={false} onClose={closeEditScheduleModal} ariaHideApp={false} width='75vh'
       footer={[
        <div style={{padding:'12px 50px',display:'flex',justifyContent:'flex-end',margin:'0% auto',marginTop:'8px'}} >
        
        </div>]}
        footerStyle={{backgroundColor:'#f5f5fd'}}
      // extra={
      //   <Space>
      //     <Button onClick={closeEditScheduleModal}>Cancel</Button>
      //   </Space>
      // }
      >
        <ScheduleEdit />
      </Drawer>
      <Drawer title="New Schedule" open={viewschedModalOpen} maskClosable={false} onClose={closeViewScheduleModal} ariaHideApp={false} width='75vh' footer={null}
      // extra={
      //   <Space>
      //     <Button onClick={closeViewScheduleModal}>Cancel</Button>
      //   </Space>
      // }
      >
        <ScheduleView />
      </Drawer>
      <CommonTable scheduleColumns={scheduleColumns} scheduleDependancyColumns={scheduleDependancyColumns} scheduleData={schData(footerPage, footerPageSize)} scheduleDependancyData={schDepData(footerPage, footerPageSize)} />
      <Footer scheduleDependancyData={scheduleDepFilterData.length} scheduleData={scheduleFilterData.length} />
    </Fragment>
         )}
    </Fragment>
  )
}

export default Schedule