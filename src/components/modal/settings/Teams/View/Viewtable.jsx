import React, { useEffect } from 'react'
import './View.css'
import { useState } from 'react';
import * as Fi from 'react-icons/fi'
import * as Fa from 'react-icons/fa'
import { Button, Table } from 'antd';
import {UserAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {EditForm,DeleteForm, MemberAddForm,GetTeamsId,TeamsUrlGetOne,TeamName,MembersUrlGet} from '../../../../../redux/reducer/settings/TeamsReducer'
import CommonTable from '../../../../table/CommonTable';
import Footer from '../../../../footer/Footer'

function Viewtable({teamId,teamName}) {
  // console.log(teamId,teamName)

  const dispatch = useDispatch()
  const membersData = useSelector((state) => state.Teams.MembersData)
  const footerPage = useSelector((state) => state.Header.Footer.page)
  const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)

  // const [showTable, setShowtable] = useState(true);
 
  useEffect(()=>{
    dispatch(MembersUrlGet())
  },[])
  
  const teamsColumn = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '300px',
      sorter: (a, b) => { return a.name.localeCompare(b.name) },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '300px',
    },
    {
        title: 'Actions',
        dataIndex: 'actions',
        width: '150px',
      },
  ];
  const teamsData = membersData.filter(item=>item.team_id===teamId).map((val)=>{
       return({
        name: val.member_name,
        email: val.mail_id,
        actions:(
          <div style={{ display: 'flex', color: '#667085', width: '50px', justifyContent: 'space-between'}}>
            <Fi.FiEdit size={16} />
            <Fi.FiTrash2 size={16} />
          </div>
        )     
      })
  })

  const editTeamcall = ()=>{
    dispatch(EditForm())
    dispatch(GetTeamsId({GetId: teamId}))
    dispatch(TeamName({TeamName: teamName}))
    dispatch(TeamsUrlGetOne())
  }
  const deleteTeamcall = ()=>{
    dispatch(DeleteForm())
    dispatch(GetTeamsId({GetId: teamId}))

  }
  const addMemberCall = ()=>{
    dispatch(MemberAddForm())
    dispatch(GetTeamsId({GetId: teamId}))

  }

  // const Memberdata = (page, pageSize) => {
  //   return teamsData.slice((page - 1) * pageSize, page * pageSize);
  // };
  return (
    <div style={{ fontFamily: "Nunito" }}>
      <div className="tabs-nav-container" >
        <div className="navcontent-active" >Member</div>
        {/* <div className={showTable==false?"navcontent-active":"navcontent"} onClick={()=>setShowtable(false)} >Accounts</div> */}
      </div>
    
        <div className="tabs-content-container">
          <div className="actions-container">
            {/* { showTable == true ?
              <> */}
                <Button type='secondary'  className='btn-actions' icon={<UserAddOutlined  /> } onClick={addMemberCall}>Add Member</Button>
                <Button type='secondary' className='btn-actions' icon={<EditOutlined />} onClick={editTeamcall}>Edit Team</Button>
                <Button type="secondary" className='btn-actions-del' icon={<DeleteOutlined />} onClick={deleteTeamcall} > Delete Team </Button>
            {/*   </>
                 :
                <>
                 <Button type='secondary'  className='btn-actions' icon={<UserAddOutlined  />}>Add Account</Button>
                 <Button type="secondary" className='btn-actions-del' icon={<DeleteOutlined />} onClick={deleteTeamcall} > Delete Team </Button>
               </>
              
            // }             */}
          </div>
          <div className="table-container">
            {/* {showTable==true ?  */}
            <Table columns={teamsColumn} dataSource={teamsData} pagination={{pageSize:2}}  />

              {/* :
              <Table columns={accountsColumn} />
            } */}
          </div>
        </div>
    </div>
  )
}

export default Viewtable

 {/* <CommonTable teamsColumn={teamsColumn} memberData={Memberdata(footerPage, footerPageSize)} />
                      <Footer teams={teamsData.length} /> */}