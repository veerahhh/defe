import React, { useState } from 'react'
import './Success.css'
import RegisterSuccess from '../../../assests/images/Registered Successfully.svg'
import * as Md from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function Success(props) {
    const { code } = props
    const navigate = useNavigate()

    const [copied, setCopied] = useState({
        copy: true,
        tick: false,
    })

    const copy = () => {
        navigator.clipboard.writeText(code)
        setCopied({ ...copied, copy: false, tick: true })
        setTimeout(() => {
            setCopied({ ...copied, copy: true, tick: false })
        }, 2000);
    }

    const goToLogin = () => {
        navigate('/')
    }
    return (
        <div className='Tenant-Success-Parent-Container'>
            <div className='Tenant-Reg-Success-Img-Container'>
                <img src={RegisterSuccess} className="Tenant-Reg-Success-Img" />
            </div>
            <p className='Tenant-Reg-Success-Text'>Register Successfully</p>

            <div className='Tenant-Reg-Success-Code-Container'>
                <p className='Tenant-Reg-Success-Code'>{code}
                    {copied.copy && <Md.MdContentCopy className='Tenant-Reg-Success-Code-Copy-Icon' onClick={copy} />}
                    {copied.tick && <span className='Tenant-Reg-Success-Code-Tick-Icon'>coppied !</span>}
                </p>
            </div>
            {/* <p className='Tenant-Reg-Success-Back-To-Login-Text'>Back to <span style={{color:" rgba(12, 80, 163, 255)",cursor:"pointer"}} onClick={goToLogin} >Login !</span></p> */}
        </div>
    )
}

export default Success