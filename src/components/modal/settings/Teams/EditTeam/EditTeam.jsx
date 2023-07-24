import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {TeamsUrlPut} from '../../../../../redux/reducer/settings/TeamsReducer'
import { useState } from 'react'

function EditTeam() {
    const dispatch = useDispatch()
    const [teamName, setTeamName] = useState()
    const team_Name = useSelector((state) => state.Teams.TeamName)
    const team_id = useSelector((state) => state.Teams.GetId)
    const message = useSelector((state)=> state.Teams.modal.EditForm)
    // console.log(team_Name)
    // console.log(team_id)


    const onUpdate = () =>{
        dispatch(TeamsUrlPut({
            team_name: teamName,
            EditForm: false
        }))
    }
  return (
    <div>
       <Form
        name="basic"
        autoComplete="off"
        layout='vertical'
        key={team_id}
        style={{ fontFamily: "Nunito" }}
        >
            <Form.Item
            name="edit team"
            label=" Edit a Team Name"
            layout='vertical'
                rules={[
                {
                    required: true,
                    message: 'Please fill your Team Name',
                },
                ]}
            >
                <Input defaultValue={team_Name} onChange={(e) => {setTeamName(e.target.value)}} />
            </Form.Item>
            <Button  htmlType='submit' type='primary' onClick={onUpdate}>Update</Button>
        </Form>
    </div>
  )
}

export default EditTeam