import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { Row, Col, Card, Modal, Progress } from 'antd'
import BarOne from './atoms/charts/BarChartOne'
import BarTwo from './atoms/charts/BarChartTwo'
import ConnectionCard from './atoms/cardPopup/ConnectionCard'
import ConfigurationCard from './atoms/cardPopup/ConfigurationCard'
import PipelineCard from './atoms/cardPopup/PipelineCard'
import ScheduleCard from './atoms/cardPopup/ScheduleCard'
import { useSelector, useDispatch } from 'react-redux';
import { Total } from '../../redux/reducer/count/CountReducer'
import * as Cg from 'react-icons/cg';
import * as Hi from 'react-icons/hi';
import * as Ai from 'react-icons/ai';

function Dashboard(props) {

    const{loadPages}=props

    const dispatch = useDispatch()
    const data = useSelector((state) => state.Count.TotalCounts)
    // console.log(data)
    
    useEffect(() => {
        dispatch(Total(true))
        loadPages()
    }, [])

    //modal
    const [modal, setModal] = useState(false)
    const [subdata, setSubData] = useState('Connections')

    //popup
    const conn = () => {
        modal === false ? setModal(true) : setModal(false)
        setSubData('Connections Info')
    }
    const config = () => {
        modal === false ? setModal(true) : setModal(false)
        setSubData('Configurations Info')
    }
    const pipe = () => {
        modal === false ? setModal(true) : setModal(false)
        setSubData('Pipeline Info')
    }
    const sch = () => {
        modal === false ? setModal(true) : setModal(false)
        setSubData('Schedule Info')
    }

    const active = data.map(function (value) {
        // console.log(value)
        return ({
            name: value.name,
            total: value.totalcount,
            percent: value.overallpercent
           
        })
    })

    const color = {
        "Connections": "linear-gradient(to top, #4facfe 0%, #00f2fe 100%)",
        "Configurations": "linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)",
        "Pipelines": "linear-gradient(to top, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
        "Schedules": "linear-gradient(to top, #fdcbf1 0%,  #e6dee9 100%)",
    }

    const func = {
        "Connections": conn,
        "Configurations": config,
        "Pipelines": pipe,
        "Schedules": sch,
    }
    const IconData = [
        {
            name:"Connections",
            icon: Cg.CgPlug, 
        },
        {
            name:"Configurations",
            icon:Hi.HiOutlineDatabase,
        },
        {
            name:"Pipelines",
            icon: Ai.AiOutlineNodeIndex, 
        },
        {
            name:"Schedules",
            icon: Hi.HiOutlineClock,
        },
    ]
    const content = (
        <div className='Dashboard_active_list'>
            <div style={{ display: ((subdata === 'Connections Info' ? "block" : "none")) }}>
                <ConnectionCard />
            </div>
            <div style={{ display: ((subdata === 'Configurations Info' ? "block" : "none")) }}>
                <ConfigurationCard />
            </div>
            <div style={{ display: ((subdata === 'Pipeline Info' ? "block" : "none")) }}>
                <PipelineCard />
            </div>
            <div style={{ display: ((subdata === 'Schedule Info' ? "block" : "none")) }}>
                <ScheduleCard />
            </div>
        </div>
    );

    return (
        <div className='Dashboard_Parent_Container'>
            <p className='Dashboard_Header_Text'>Dashboard</p>
            <div className='Dashboard_Inner_Container'>
                <Row gutter={[15, 15]}>
                    {active.map((val, key) => {
                        // console.log(val)
                        
                        return (
                            <Col flex={2} lg={{ span: 6, offset: 0 }} key={key}>
                                <Card className='Dashboard_Card_Parent' onClick={func[val.name.replaceAll(' ', '')]} style={{ background: `${color[val.name.replaceAll(' ', '')]}` }} >
                                    <p className='Dashboard_Card_Type_Text'>{val.name}
                                    {IconData.map((value)=>{
                                        if(value.name==val.name)
                                        return (
                                        <div className='Dashboard_Card_Icon'> <value.icon  /></div>
                                        )
                                    })}
                                    
                                     </p>
                                     <p className='Dashboard_Card_Count_Text'>Total Counts:{val.total} </p>
                                       <Progress className='Dashboard_Card_Bar' percent={val.percent} width={70} strokeColor='#0c50a3' type="circle" />                                 
                                </Card>

                                <Modal title={subdata} style={{ top: 10 }} open={modal} width={600} maskClosable={false} onCancel={conn} ariaHideApp={false} footer={null}>
                                    {content}
                                </Modal>
                            </Col>
                        )
                    })}
                    {/* <div className='chartTitle'>
                    <p >Analytics Chart</p>
                    <p >Active/InActive Summary</p>
                    </div>
      */}
                    <div className='Dashboard_Card_ChartContainer'>
                        
                        <Card className='Dashboard_Card_ChartOne'  >
                        
                            <BarOne />
                        </Card>
                        <Card className='Dashboard_Card_ChartTwo'>
                            <BarTwo />
                        </Card>
                    </div>
                </Row>
            </div>
        </div>
    )
}

export default Dashboard 




















