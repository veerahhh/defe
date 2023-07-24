import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select ,Col} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {UserGet} from '../../../../../redux/reducer/settings/UserReducer';
import '../View/View.css'
import {MembersUrlPost} from '../../../../../redux/reducer/settings/TeamsReducer'

const { Option } = Select;
function AddMember() {
// console.log(GetId)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(UserGet())
  },[])

  const userApi = useSelector((state) => state.User.Data)
  const member = useSelector((state) => state.Teams.modal.MemberAddForm)
  const abc = useSelector((state) => state.Teams.GetId)

  // console.log(abc)

  const [name,setName] = useState('')
  const [email,setEmail]=useState('')
  const [teamId, setTeamId]=useState(abc)
  // console.log(teamId)
 

  const onSelectChange = (value) => {
    // console.log(value)
    setName(value)
    userApi.map((v,i)=>{
      const firstName = v.first_name
      if(value==firstName){
        setEmail(v.email)
      }
    })
  }

  // console.log(teamId)
  const memberSave =()=>{
    dispatch(MembersUrlPost({
      team_id: teamId,
      member_name: name,
      mail_id: email,
      tenant_id:JSON.parse(sessionStorage.getItem("id")),
      MemberAddForm: false
    }))
  }
  return (
    <div>
      <Form
        name="basic"
        autoComplete="off"
        layout='vertical'
        style={{ fontFamily: "Nunito" }}
       >
        <Form.Item
          name="create a member name"
          label="Member Name"
          layout='vertical'
          rules={[
            {
              required: true,
              message: 'Please fill your Member Name',

            },
          ]}
          
        >
          <Select
            name="create a member name"
            label="Member Name"
            placeholder="Select a type"
            onChange={onSelectChange}
          >
            {userApi.map((value,key)=>{
              return(
                <Option key={key} value={value.first_name}>{value.first_name}</Option>
              )
            })}
          </Select>
        </Form.Item>
        
        <label>Member Email</label>
        <input placeholder='Member Email' disabled className="emailColoring" value={email} onChange  />

        <Button htmlType='submit' type='primary' onClick={memberSave} >Create</Button>
      </Form>
    </div>
  )
}

export default AddMember