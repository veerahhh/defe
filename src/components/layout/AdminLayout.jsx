import React from 'react'
import './adminLayout.css'
import Sidebar from '../sidebar/Sidebar.js'
import { Outlet } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import IdleTimer from 'react-idle-timer';
import { ImInfo } from 'react-icons/im';
import { VscWarning } from 'react-icons/vsc';
import { Button, Divider, Modal } from 'antd';
import cookie from 'react-cookies'

let countdownInterval;
let timeout;


function AdminLayout() {

  const [toggle, setToggle] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [seconds, setSeconds] = useState(0)

  const clearSessionTimeout = () => {
    clearTimeout(timeout);
  };
  const clearSessionInterval = () => {
    clearInterval(countdownInterval);
  };


  const open = () => {
    toggle === false ? setToggle(true) : setToggle(false)
  }
  const close = () => {
    setToggle(false)
  }
  const history = useNavigate();

  const idleTimerRef = useRef(null);

  const onIdle = () => {
    const delay = 1000 * 1;
    if (!isModalOpen) {
      timeout = setTimeout(() => {
        let countDown = 10;
        setIsModalOpen(true);
        setSeconds(countDown);
        countdownInterval = setInterval(() => {
          if (countDown > 0) {
            setSeconds(--countDown);
          }
          else if (countDown === 0) {
            logout();
          }
        }, 1000);
      }, delay);
    }

  }

  const logout = ()=>{
    sessionStorage.clear()
    cookie.remove("DHC")
    localStorage.clear(); 
    history('/')
    window.location.reload(false);
  }
  const handleContinue = () => {
    setIsModalOpen(false)
    clearSessionInterval();
    clearSessionTimeout();
  };



  return (
    <div className='Layout-Parent-Container'>
      <div className='Layout-Sidebar-Container'>
        <Sidebar open={open} toggle={toggle} />
      </div>
      <div className={toggle === false ? 'Layout-Component-Parent-Container-Open' : 'Layout-Component-Parent-Container-Close'}>
        <div className='Layout-Component-Container' >
          <Outlet />
        </div>
      </div>
      <IdleTimer
        ref={idleTimerRef}
        timeout={7 * 60000}
        onIdle={onIdle}
      />
      <Modal width='450px' title={false} open={isModalOpen} maskClosable={false} closable={false} footer={null} >
        <div className='session_header'><VscWarning size={30} /><h3>Session Timeout</h3></div>
        <Divider style={{ margin: '0' }} />
        <div className='session_content'>
          <div className='session_ccc'>
            <ImInfo size={20} />
            <p>Your Session Will be Expire Soon...</p>
          </div>
          <span className='span_time'>Time remaining : {seconds}</span><br /><br />
          <div className='session_btn_con'>
            <Button type='primary' onClick={handleContinue}>Keep working with me</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminLayout;

