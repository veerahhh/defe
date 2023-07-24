import React, { useState } from 'react'
import './ForgotPassword.css'
import { Input, Button, Form } from 'antd'
import * as Ai from 'react-icons/ai'

function ForgotPassword({ LoginFormVisible, ForgotPasswordVisible, FullLoginFormVisibile, ChangePasswordVisible, next, BackToLogin, setForgotEmail, forgotEmail, otpEnable, setOtpEnable,setOtpData,otpData }) {
 
  const [emailVal, setEmailVal] = useState(false)
  const [otpVal,setOtpVal]=useState(false)

  const EmailChanger = (e) => {
    setForgotEmail(e.target.value)
    Email_Validation(true)
  }
  const OtpChanger = (e) => {
    setOtpData(e.target.value)
    Otp_Validation(true)
  }

const Otp_Validation=()=>{
  (/^\d{6}$/.test(otpData) && otpData.length!==6 ? setOtpVal(true) : setOtpVal(false))

}
// console.log(otpVal)

  const Email_Validation = () => {
    (!/\S+@\S+\.\S+/.test(forgotEmail)) && forgotEmail.length > 1 ? setEmailVal(true) : forgotEmail.length <= 1 ? setEmailVal(false) : setEmailVal(false)
  }
  // console.log(emailVal)

  return (
    <div className='ForgotPassword_Parent_Container'>
      {/* <h1>{props.Values}</h1> */}
      <Form autoComplete="off" layout='vertical' className='ForgotPassword_Form_Container'>

        <p className='ForgotPassword_Header_Text'>Forgot Password</p>

        {otpEnable == false && <Form.Item label="Email" name="email" className='SignIn_FormItem' rules={[{ required: true, message: "Plese Enter Email" }]}>
          <Input className='ForgotPassword_Input' onChange={EmailChanger} />
        </Form.Item>}

        {emailVal && <p className='error'> Please Enter Valid E-mail </p>}

        {otpEnable == true && <Form.Item label="OTP" name="otp" className='SignIn_FormItem' rules={[{ required: true, message: "Plese Enter OTP" }]}>
          <Input className='ForgotPassword_Input' onChange={OtpChanger} />
        </Form.Item>}

        {otpVal && <p className='error'> Please Enter Valid OTP </p>}

        <Button htmlType='submit' type='primary' className='ForgotPassword_Button' onClick={next}>Next</Button>

        <div className='ForgotPassword_BottomText_Container'>
          <p className='ForgotPassword_BottomText' onClick={BackToLogin}><Ai.AiOutlineLeft style={{ margin: "4px 10px 0 0" }} />Back to login</p>
        </div>

      </Form>

    </div>
  )
}

export default ForgotPassword




// import React,{useState} from 'react'
// import './ForgotPassword.css'
// import { Input, Button, Form } from 'antd'
// import * as Ai from 'react-icons/ai'

// function ForgotPassword({LoginFormVisible,ForgotPasswordVisible,FullLoginFormVisibile,ChangePasswordVisible}) {

//   const[email,setEmail]=useState('')
//   const [emailVal, setEmailVal] = useState(false)

//   const EmailChanger=(e)=>{
//     setEmail(e.target.value)
//     Email_Validation(true)
//   }

//   const Email_Validation = () => {
//     (!/\S+@\S+\.\S+/.test(email)) && email.length > 1 ? setEmailVal(true) : email.length <= 1 ? setEmailVal(false) : setEmailVal(false)
//   }

//   const BackToLogin=()=>{
//     LoginFormVisible(true)
//     ForgotPasswordVisible(false)
//   }

//   const Next=()=>{
//     if ((!/\S+@\S+\.\S+/.test(email)) !== true){
//     FullLoginFormVisibile(false)
//     ChangePasswordVisible(true)
//     }else{

//     }
//   }
//   return (
//     <div className='ForgotPassword_Parent_Container'>

//       <Form autoComplete="off" layout='vertical' className='ForgotPassword_Form_Container'>

//         <p className='ForgotPassword_Header_Text'>Forgot Password</p>

//         <Form.Item label="Email" name="email" className='SignIn_FormItem' rules={[{ required: true, message: "Plese Enter Email" }]}>
//           <Input className='ForgotPassword_Input' onChange={EmailChanger}/>
//         </Form.Item>

//         {emailVal && <p className='error'> Please Enter Valid E-mail </p>}

//         <Button htmlType='submit' type='primary' className='ForgotPassword_Button' onClick={Next}>Next</Button>

//         <div className='ForgotPassword_BottomText_Container'>
//           <p className='ForgotPassword_BottomText' onClick={BackToLogin}><Ai.AiOutlineLeft style={{ margin: "4px 10px 0 0" }} />Back to login</p>
//         </div>

//       </Form>

//     </div>
//   )
// }

// export default ForgotPassword