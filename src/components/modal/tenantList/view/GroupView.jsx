import React, { useState } from 'react'
import './TenantView.css'
import * as Md from 'react-icons/md'
import axios from 'axios'

function GroupView(props) 
{
  const{secondDrawer,listofteam}=props
  console.log(listofteam)
  const [id,setId]=useState()
  const [open, setOpen] = useState(false)
  const [member,setMember]=useState([])

  const listOpen = (val) => {
    console.log(val.id)
    axios.post('http://18.217.196.203:8000/tenant_members_get/',{      
        team_id_id:val.id,
        tenant_id_id:val.tenant_id_id        
    }).then((res=>{
      setMember(res.data)
      if(res.data[0].team_id_id==val.id)
      {
       setId(val.id)
       open == false  ? setOpen(true) : setOpen(false)
    }
    }))   
  }
console.log(member)

  return (
    <div className='Tenent-View-Parent-Container'>
     {listofteam.map((val,i)=>{ return(
      <div key={i}>
       <main className='Tenant-View-List-Parent-Container' onClick={()=>listOpen(val)}>
        <div className='Tenant-View-Left-Container'>
        <p className='Tenant-View-Left-Header-Text'>{val.team_name}</p>
          <p className='Tenant-View-Left-Sub-Text'>Members : <span className='Tenant-View-Left-Sub-Text-Count'>{member.length}</span></p>
        </div>
        <div className='Tenant-View-Right-Container'>
          {open == false && <Md.MdOutlineKeyboardArrowDown size={20} className='Tenant-View-Right-Icon' />}
          {open == true && <Md.MdOutlineKeyboardArrowUp size={20} className='Tenant-View-Right-Icon' />}
        </div>
      </main>
      {open == true && val.id==id && <div className='Tenant-View-List-Container'>
        {member.map((v,index)=>{ return(<main className='Tenant-View-Member-List-Parent-Container' >
          <div className='Tenant-View-Member-Left-Container'>
            <p className='Tenant-View-Member-Left-Header-Text'>{v.member_name}</p>
            {/* <p className='Tenant-View-Member-Left-Sub-Text'>Members : <span className='Tenant-View-Member-Left-Sub-Text-Count'>{index}</span></p> */}
          </div>
          <div className='Tenant-View-Member-Right-Container'>
            {/* {open == false && <Md.MdOutlineKeyboardArrowDown size={20} className='Tenant-View-Right-Icon' />} */}
            {/* <Md.MdRemoveRedEye size={20} className='Tenant-View-Member-Right-Icon' onClick={secondDrawer}/> */}
          </div>
        </main>)})}
      </div>}
      </div>)}) }
    </div>
  )
}

export default GroupView