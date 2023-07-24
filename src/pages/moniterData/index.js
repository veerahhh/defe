import React, { Fragment, useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import CommonTable from '../../components/table/CommonTable'
import Footer from '../../components/footer/Footer'
import { useSelector, useDispatch } from 'react-redux'
import { MonitorDataGet, MonitorGetOne, GetId, PopUp, AuditMonitorGet } from '../../redux/reducer/monitordata/monitorReducer'
import { monitorSchemaGet } from '../../redux/reducer/monitordata/monitorSchemaReducer'
import { pipelineGet } from '../../redux/reducer/pipeline/PipelineReducer'
import moment from 'moment';
import { Switch, Modal } from 'antd';
import Loader from '../../components/loader/Loader'
import { ScheduleGet } from '../../redux/reducer/schedule/ScheduleReducer'
import { MdOutlineError } from 'react-icons/md';
import { BsCheckCircleFill } from 'react-icons/bs'
import { AiOutlineFieldTime } from 'react-icons/ai'
import { SchemaMigrateGet } from '../../redux/reducer/pipeline//SchemamigReducer'
function MoniterData() {

  const dispatch = useDispatch();
  // const [modal, contextHolder] = Modal.useModal();
  const [open, setOpen] = useState("")
  const [openError, setOpenError] = useState("");
  const [openSuccess, setOpenSuccess] = useState("");
  const [openRunning, setOpenRunning] = useState("");
  const [error, setError] = useState([])
  const [bug, setBug] = useState([])
  const monitorData = useSelector((state) => state.MonitorData.Data)
  const monitorSchemaData = useSelector((state) => state.MonitorSchema.Data)
  console.log(monitorSchemaData)
  const MonGetone = useSelector((state) => state.MonitorData.newForm.PopUp)
  //  console.log(MonGetone)
  const audit = useSelector((state) => state.AuditMonitor.AuditMon)
  // console.log(audit)
  const schedule = useSelector((state) => state.Schedule.scheduleData)
  // console.log(schedule)
  const pipeline = useSelector((state) => state.Pipeline.Data)
  // console.log(pipeline)
  const Schema = useSelector((state)=> state.SchemaMigration.SchemaMigrateGetData)
  

  useEffect(() => {
    dispatch(MonitorDataGet(true))
    dispatch(AuditMonitorGet(true))
    dispatch(monitorSchemaGet(true))
    dispatch(pipelineGet(true))
    dispatch(ScheduleGet(true))
    dispatch(SchemaMigrateGet(true))
  }, [])

  const searchData = useSelector((state) => state.Header.Search.value)
  const footerPage = useSelector((state) => state.Header.Footer.page)
  const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)

  const monitorLoader = useSelector((state) => state.MonitorData.Loader)

  const monitorDataColumns = [
    {
      title: 'S.No.',
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
      title: 'Schedule Name',
      dataIndex: 'schedulename',
      // sorter: (a, b) => { return a.schedulename.localeCompare(b.schedulename) },
      width: '200px',
    },
    {
      title: 'Pipeline Name',
      dataIndex: 'pipelinename',
      // sorter: (a, b) => { return a.pipelinename.localeCompare(b.pipelinename) },
      width: '200px',
    },
    // {
    //   title: 'Level',
    //   dataIndex: 'level',
    //   width: '200px',
    // },
    {
      title: 'Start Date',
      dataIndex: 'startdate',
      // sorter: (a, b) => { return a.rundate.localeCompare(b.rundate) },
      width: '170px'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '170px'
    },
  ]

  const monitorSchemaColumns = [
    {
      title: 'S.No.',
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
      title: 'Schema Name',
      dataIndex: 'schemaname',
      // sorter: (a, b) => { return a.schedulename.localeCompare(b.schedulename) },
      width: '200px',
    },
    // {
    //   title: 'Pipeline Name',
    //   dataIndex: 'pipelinename',
    //   // sorter: (a, b) => { return a.pipelinename.localeCompare(b.pipelinename) },
    //   width: '200px',
    // },
    // {
    //   title: 'Level',
    //   dataIndex: 'level',
    //   width: '200px',
    // },
    {
      title: 'Start Date',
      dataIndex: 'startdate',
      // sorter: (a, b) => { return a.rundate.localeCompare(b.rundate) },
      width: '170px'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '170px'
    },
  ]
  // const EditModal = () => {
  //   dispatch(PopUp())
  // }
  // const messagePopUp = () => {
  //   Modal.success({
  //     title: 'Notification message',
  //     content: `Completed Successfully.`,
  //  });

  // };
  const monitorDataFilterData = monitorData.filter((val) => {
    if (searchData === '') {
      return val
    } else if (val.pipeline_name.toString().toLowerCase().includes(searchData.toLowerCase())) {
      return val
    }
  })

  const schedulename = (e) => {
    const schedulename = []
    schedule.map((value) => {
      // console.log(value)
      if (e === (value.id)) {
        schedulename.push(value.pipeline_schedule_name)
      }
    }
    )
    return schedulename
  }

  const schemaname = (e) => {
    const schemaname = []
    Schema.map((values) => {
      // console.log(values)
      if (e === (values.id)) {
        schemaname.push(values.schema_name)
      }
    }
    )
    return schemaname
  }

  const pipelinename = (e) => {
    const pipelinename = []
    pipeline.map((value) => {
      // console.log(value)
      if (e === (value.id)) {
        pipelinename.push(value.pipeline_name)
      }
    }
    )
    return pipelinename
  }

  // console.log(pipelinename)

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };


  // const msg=[]
  // const st=  monitorSchemaData.map((val)=>{
  //   // console.log(val.schema_id)
  //   audit.map((item)=>{
  //     if(val.schema_id == item.schedule_id){
  //       // console.log(item.status)
  //       return(msg.push({value:item.status}))
  //     }
  //   })
  // })
  // console.log(msg)

  const handleOk = () => {
    // console.log("ok")
    setError([])
    setOpen(false)
    setOpenError(false)
    setOpenRunning(false)
    setOpenSuccess(false)
  }

  const handleSat = (props) => {
    monitorData.forEach((val) => {
      if (props === 'failed') {
        setOpenError(true);
        audit.forEach((item) => {
          if (val.schedule_id === item.schedule_id && item.status === 'failed') {
            const status = item.status;
            const icon = <MdOutlineError style={{ fontSize: '22px' }} />;
            const msg = { status, icon };
            setBug([...bug, msg]);
          }
        });
      } else if (props === 'running') {
        setOpenRunning(true);
        audit.forEach((item) => {
          if (val.schedule_id === item.schedule_id && item.status === 'running') {
            const status = item.status;
            const icon = <AiOutlineFieldTime style={{ fontSize: '22px' }} />;
            const msg = { status, icon };
            setBug([...bug, msg]);
          }
        });
      } else if (props === 'completed') {
        setOpenSuccess(true);
        audit.forEach((item) => {
          if (val.schedule_id === item.schedule_id && item.status === 'completed') {
            const status = item.status;
            const icon = <BsCheckCircleFill style={{ fontSize: '22px' }} />;
            const msg = { status, icon };
            setBug([...bug, msg]);
          }
        });
      }
    });
  };

  // const handleStatus = (props) => {
  //   // console.log(props)

  //   monitorSchemaData.map((val) => {
  //     console.log(val)
  //     if (props == "failed" ) {
  //       setOpen(true)
  //       audit.map((item) => {
  //         if (val.schema_id == item.schedule_id) {
  //           console.log(val.schema_id == item.schedule_id)
  //           const msg = item.status
  //           setError([...error, msg])
  //         }
  //       })
  //     }

  //     // Modal.error({
  //     //   title: 'Invalid Data',
  //     //   content: `${error}`,
  //     //   onOk() {
  //     //     setError([])
  //     //     setOpen(false)
  //     //   },
  //     // })
  //   })

  //   //  if( props=="failed"){
  //   //   Modal.error({
  //   //      title: 'Notification message',
  //   //        content: `Validation Failed`,
  //   //       })
  //   //  }
  //   //  if(props=="completed"){
  //   //   Modal.success({
  //   //     // title: 'Notification message',
  //   //       content: `Completed Successfully.`,
  //   //      })
  //   //  }
  //   //  else{
  //   //   Modal.info ({
  //   //     // title: 'Notification message',
  //   //       content: `Pending...`,
  //   //      })
  //   //  }
  // }
  // console.log(error) 
  const handleStatus = (props) => {
    monitorSchemaData.map((val) => {
    console.log(val)
      if (props === 'failed') {
        setOpenError(true);
        audit.map((item) => {
          if (val.schema_id === item.schedule_id && item.status === 'failed') {
            const status = item.status;
            const icon = <MdOutlineError style={{ fontSize: '22px' }} />;
            const msg = { status, icon };
            setError([...error, msg]);
          }

        });

      } else if (props === 'running') {

        setOpenRunning(true);

        audit.map((item) => {

          if (val.schema_id === item.schedule_id && item.status === 'running') {

            const status = item.status;

            const icon = <AiOutlineFieldTime style={{ fontSize: '22px' }} />;

            const msg = { status, icon };

            setError([...error, msg]);

          }

        });

      } else if (props === 'completed') {

        setOpenSuccess(true);

        audit.map((item) => {

          if (val.schema_id === item.schedule_id && item.status === 'completed') {

            const status = item.status;

            const icon = <BsCheckCircleFill style={{ fontSize: '22px' }} />;

            const msg = { status, icon };

            setError([...error, msg]);

          }

        });

      }
    })
  }


  const data = monitorDataFilterData.map((val) => {
    // console.log(val.run_id)
    return ({
      schedulename: schedulename(val.schedule_id),
      pipelinename: pipelinename(val.pipeline_id),
      // level: val.level,
      startdate: moment.utc((val.start_time)).format('MM-DD-YYYY'),
      status: (<div onClick={() => handleSat(val.status)}
        // onClick={()=>{
        // dispatch(GetId({ singleData: val.run_id}))
        // dispatch(MonitorGetOne())
        // dispatch(PopUp())}}
        style={{ cursor: "pointer", color: ((val.status == 'failed' ? "#ff1800" : val.status == "running" ? "#ff9800" : "#4caf50")) }}>{val.status}</div>)
    })
  })

  const dataSchema = monitorSchemaData.map((val) => {
    console.log(val)
    return ({
      schemaname: schemaname(val.schema_id),
      pipelinename: pipelinename(val.schema_id),
      // level: val.level,
      startdate: moment.utc((val.start_date)).format('MM-DD-YYYY'),
      status: (<p onClick={() => handleStatus(val.status)} style={{ cursor: "pointer", color: ((val.status == 'failed' ? "#ff1800" : val.status == "running" ? "#ff9800" : "#4caf50")) }}>{val.status}</p>)
    })
  })


  const monitorGetData = (page, pageSize) => {
    return data.slice((page - 1) * pageSize, page * pageSize);
  };

  const monitorGetSchema = (page, pageSize) => {
    return dataSchema.slice((page - 1) * pageSize, page * pageSize);
  };


  return (
    <Fragment >
      {monitorLoader ? (
        <Loader />) : (
        <Fragment>
          <Header />
          {/* <p style={{ fontFamily:'Nunito',fontSize:'15px',fontWeight:700,margin:'20px',width:'90px',borderBottom:'2px solid rgba(12,80,163,255)'}}>MonitorData</p>       */}
          <Modal title={false} style={{ top: 260 }} open={monitorLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
            <Loader />
          </Modal>
          <Modal
            style={{ color: "red" }}
            open={openError}
            onOk={handleOk}
            cancelButtonProps={{ style: { display: 'none' } }}
            closable={false}
          >
            <div style={{ display: 'flex', gap: '.3rem', fontFamily: 'Nunito', fontWeight: 500, fontSize: '15px' }}>
              <MdOutlineError style={{ fontSize: '22px' }} />The operation has Failed
            </div>

          </Modal>
          <Modal
            style={{ color: "green" }}
            open={openSuccess}
            onOk={handleOk}
            cancelButtonProps={{ style: { display: 'none' } }}
            closable={false}
          >
            <div style={{ display: 'flex', gap: '.3rem', fontFamily: 'Nunito', fontWeight: 500, fontSize: '15px' }}>
              <BsCheckCircleFill style={{ fontSize: '22px' }} />Successfully Completed!
            </div>

          </Modal>
          <Modal
            style={{ color: "orange" }}
            open={openRunning}
            onOk={handleOk}
            cancelButtonProps={{ style: { display: 'none' } }}
            closable={false}
          >
            <div style={{ display: 'flex', gap: '.3rem', fontFamily: 'Nunito', fontWeight: 500, fontSize: '15px' }}>
              <AiOutlineFieldTime style={{ fontSize: '22px' }} />Still on progress...
            </div>

          </Modal>
          {/* <Modal open={MonGetone}  onCancel={EditModal} ariaHideApp={false} maskClosable={false} footer={null}>
     <Monitor/>
      </Modal> */}
          <CommonTable monitorDataColumn={monitorDataColumns} monitorSchemaColumns={monitorSchemaColumns} monitorData={monitorGetData(footerPage, footerPageSize)} monitorSchemaData={monitorGetSchema(footerPage, footerPageSize)} />
          <Footer monitorGetData={monitorDataFilterData.length} monitorGetSchema={monitorSchemaData.length} />
        </Fragment>
      )
      }
    </Fragment>
  )
}

export default MoniterData