import React, { useState, useEffect, Component } from 'react'
import './Header.css'
import SearchBar from './atoms/SearchBar'
import { useSelector, useDispatch } from 'react-redux'
import { ActionButton } from '../../redux/reducer/HeaderReducer'

function Header(props) {
    // console.log(props)

    const{configuration,connection,pipeline,schedule}=props

    const ActionData = useSelector((state) => state.Header.ActionButton.data)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ActionButton({ name: sessionStorage.getItem('status') }))
    }, [])


    return (
        <div className='CommonHeader_Container'>
            {ActionData.map((component, componentKey) => {
                // console.log(component)

                return (
                    <>
                        <div className='CommonHeader_Left_Container'>
                            <component.action  connection={connection} configuration={configuration} pipeline={pipeline} schedule={schedule} />
                        </div>

                        <div className='CommonHeader_Right_Container'>
                            <SearchBar />
                            <component.addButton  configuration={configuration} connection={connection} pipeline={pipeline} schedule={schedule}/>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default Header