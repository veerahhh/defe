import React from 'react'
import './SignUp.css'
import SignUpSuccessIllustrate from '../../assests/images/Registered Successfully.svg'
import {Link} from 'react-router-dom'

function SignUpSuccess() {
  return (
    <div className='SignUpSuccess_Parent_Container'>

        <p className='SignUpSuccess_Text'>Registered Successfully!</p>

        <div className='SignUpSuccess_Img_Container'>
            <img src={SignUpSuccessIllustrate} alt='' className='SignUpSuccess_Img'/>
        </div>
        <p  className='SignUpSuccess_Bottom_Text'><Link to={"/"}>Go To Login</Link></p>
    </div>
  )
}

export default SignUpSuccess