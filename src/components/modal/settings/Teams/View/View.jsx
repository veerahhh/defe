import React from 'react'
import './View.css'
import {Empty} from 'antd'
import { useState } from 'react';
import Tabs from './Viewtable'
import {UpOutlined, DownOutlined} from '@ant-design/icons' 
import { useSelector } from 'react-redux';


function View() {
    const [selected, setSelected] = useState(null)
    const [teamId, setTeamId] = useState()
    const [teamName, setTeamName] = useState()
    const teamData = useSelector((state) => state.Teams.Data)
    const searchData = useSelector((state) => state.Header.Search.value)

    // console.log(teamData)
    const toggle = (i)=>{
      if(selected == i){
        return setSelected(null)
      }
      setSelected(i)
    }
    const teamsFilterData = teamData.filter((val)=>{
      if(searchData===''){
        return val
      }else if(val.team_name.toString().toLowerCase().includes(searchData.toLowerCase())){
        return val
      }

    })
  return (
    <div>
      <div className='teams-view-container' style={{ fontFamily: "Nunito" }}>
        <div className="accordion">
          {teamsFilterData.length < 1 ?
            <Empty className='datafound' image={Empty.PRESENTED_IMAGE_SIMPLE} />          :
            teamsFilterData.map((item,i)=>{
              return(
                <div className="teams-view-header-item" key={i} 
                  onClick={(e)=>{
                    setTeamId(item.id)
                    setTeamName(item.team_name)
                  }}
                >
                  <div className="title" onClick={()=> toggle(i)}>
                    <p className='para'>{item.team_name}  <br /><small className='small-txt'>member</small></p> 
                    {selected == i ? <UpOutlined size={25} style={{margin:'0px 20px',cursor: 'pointer'}}  /> : <DownOutlined size={25} style={{margin:'0px 20px',cursor: 'pointer'}}  /> }
                  </div>
                  <div className={selected == i ? 'content show' : 'content'}> <Tabs teamId={teamId} teamName={teamName} /> </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default View