import React from 'react'
import './PageNotFound.css'
import page_not_found from '../../assests/images/page-not-found.svg'
import DataHubLogo from '../../assests/images/DMX datahub.svg'
import {useNavigate} from 'react-router-dom'

function PageNotFound() {
  const navigate=useNavigate()
  const goToHome=()=>{
    navigate('/DashBoard')
  }
  return (
    <div className='Page-Not-Found-Parent-Container'>
      <img src={DataHubLogo} className="Page-Not-Found-Data-Hub-Logo"/>
      <div className='Page-Not-Found-Img-Container'>
        <img src={page_not_found}className="Page-Not-Found-Img"/>
      </div>
      <h1 className='Page-Not-Found-404-Text'>404</h1>
      <p className='Page-Not-Found-Text'>Page Not Found !</p>
      <p className='Page-Not-Found-Go-To-Home-Text' onClick={goToHome}>Go To Home</p>
    </div>
  )
}

export default PageNotFound