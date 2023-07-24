import React, { useState } from 'react'
import './SignIn.css'
import ForgotPassword from '../forgotPassword/ForgotPassword'
import PasswordComponent from '../forgotPassword/Password'
import { Row, Col, Button, Checkbox, Form, Input, message } from 'antd'
import LoginIllustrate from '../../assests/images/Login-Illustration.svg'
import DhLogoOne from '../../assests/images/DMX datahub.svg'
import GoogleIcon from '../../assests/images/Google-Icon.png'
import DecisionMindsLogo from '../../assests/images/Decision-Minds-Logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { LogIn, TenantLogin, VerifyToken, ForgetPassword } from '../../api/BackEndURL'
import cookie from 'react-cookies'
import Popover from 'antd/es/popover'
import { LoginSocialGoogle } from 'reactjs-social-login';
import axios from 'axios'

export function SignIn(props) {

  //   const [resetPasswordValues,setResetPasswordValues]=useState({
  //     forgotEmail:'',
  //     otp:'',
  //     newPassword:'',  
  //     confirmPassword:''
  // })

  const [forgotEmail, setForgotEmail] = useState('')
  const [otpEnable, setOtpEnable] = useState(false)
  const [otpData,setOtpData]=useState()
  const [responseStatus, setResponseStatus] = useState(null);

  const navigation = useNavigate()

  // const decopass = window.atob(cookie.load(`('password')`));

  const [email, setEmail] = useState()
  const [password, setPassword] = useState('')
  const [Checked, setChecked] = useState(false)
  const [EmailVal, setEmailVal] = useState(false)
  const [LoginForm, setLoginForm] = useState(true)
  const [FulLoginForm, setFullLoginForm] = useState(true)
  const [User, setUser] = useState()
  const [ForgotPasswordComponent, setForgotPasswordComponent] = useState(false)
  const [ChangePassword, setChangePassword] = useState(false)
  const [test, settest] = useState(0)
  const [emailError, setemailError] = useState()
  const [passwordError, setPasswordError] = useState()
  const [validation, setValidation] = useState(true)

  const EmailHandleChange = (e) => {
    setEmail(e.target.value);
    // setemailError()
    Email_Validation()

  }

  // console.log(cookie.load(`('password')`).length)

  const PasswordHandleChange = (e) => {
    setPassword(e.target.value);
    // setPasswordError()
  }

  const autoFill = () => {
    if (cookie.load(`('email')`).length > 5 && cookie.load(`('password')`).length > 3) {
      setValidation(false)
      setEmail(cookie.load(`('email')`))
      setPassword(window.atob(cookie.load(`('password')`)))
      settest(1)
    }
  }


  const CheckBoxHandleChange = (e) => {

    if (e.target.checked === true) {
   

      let passwordenc = window.btoa(password);
      let passwordeco = window.atob(passwordenc);
     

      document.cookie = `('email')= ${JSON.stringify(email)}`
      document.cookie = `('password')= ${JSON.stringify(passwordenc)}`
   
    }
  
  };
  const Email_Validation = () => {
    (!/\S+@\S+\.\S+/.test(email)) && email.length > 1 ? setEmailVal(true) : email.length > 1 ? setEmailVal(true) : setEmailVal(false)
  }
  // console.log(EmailVal);

  // console.log(email.length);

  const Data = {
    email: email,
    password: password
  }

  // const ForgotData = {
  //   email: forgotEmail
  // }


  const key = 'updatable';

  const Success = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.success({ content: 'Logged in Successfully!', key, duration: 2, });
      Remember(true)
      navigation('/DashBoard')
    }, 1000);
  };

  const Error = () => {
    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      message.error({ content: 'Invalid Login Credential!', key, duration: 5 });
    }, 1000);
  };

  const Login = () => {
   
    if ((!/\S+@\S+\.\S+/.test(email)) !== true && password.length > 0) {
    
      Email_Validation(false)
      LogIn.method(`${LogIn.URL}`, Data).then((res) => {
        console.log(res.data)
        Success(true)
        cookie.save("DHC", res.data.jwt)
        sessionStorage.setItem("id", JSON.stringify(res.data.id))
        // VerifyToken.method(`${VerifyToken.URL}`, { 'authentication': cookie.load("DHC") }).then((res) => {
        //   cookie.save("VerifyToken", res.data.verifyToken)
        // })
        // e.preventDefault();
        // if(setChecked == true){
        //   cookie.save("creden2tial",res.data.setChecked)
        // }

      }).catch(function (error) {
        TenantLogin.method(`${TenantLogin.URL}`, Data).then((res) => {
          console.log(res.data)
          Success(true)
          cookie.save("DHC", res.data.jwt)
          sessionStorage.setItem("id", JSON.stringify(res.data.id))
        }).catch((err) => {
          Error(true)
        })

      })

    } else {
      console.log('Validation Failed')
    }
  }


  const Remember = () => {
    if (Checked === true) {
      cookie.save("userEmail", email, { path: 'http://localhost:3000/' })
      cookie.save("userPassword", password, { path: 'http://localhost:3000/' })
    }

  }

  const forgotPassword = () => {
    setLoginForm(false)
    setForgotPasswordComponent(true)
  }

  const content = (
    <div style={{ cursor: "pointer" }} onClick={autoFill}>
      <p>{cookie.load(`('email')`)}</p>
    </div>
  );

  const Next = () => {
    if (otpEnable == false && (!/\S+@\S+\.\S+/.test(forgotEmail)) !== true) {
      axios.post('http://18.217.196.203:8000/forget', { email: forgotEmail })
        // ForgotPasswordURL.method(`${ForgotPasswordURL.URL.email,{email:forgotEmail}}`)
        .then((res) => {
          setResponseStatus(res.status);
          console.log(res)
        })
      setOtpEnable(true)

    }
    else if (otpEnable == true ) {  
      // console.log("hi")
      axios.post('http://18.217.196.203:8000/verify', { email: forgotEmail, otp: otpData }).then((res) => {
        console.log(res)
      })
      setFullLoginForm(false)
      setChangePassword(true)
    
    

    }
   
  }

  const BackToLogin = () => {
    setLoginForm(true)
    setForgotPasswordComponent(false)
  }



  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordVal, setConfirmPasswordVal] = useState(false)
  const [passWord, setPassWord] = useState(true)
  const [passwordChangedSuccessfully, setPasswordChangedSuccessfully] = useState(false)

  const Submit = () => {
    if (newPassword === confirmPassword && newPassword.length > 0 && confirmPassword.length > 0) {
      axios.post('http://18.217.196.203:8000/reset', { email: forgotEmail,password:newPassword })
      .then((res) => {
        console.log(res)
      })
        setPassWord(false)
        setPasswordChangedSuccessfully(true)
    } else if (confirmPassword.length <= 1) {
        setConfirmPasswordVal(false)
    }
    else {
        setConfirmPasswordVal(true)
        setPassWord(true)
        setPasswordChangedSuccessfully(false)
    }
}

  return (
    <div className='SignIn_Parent_Container'>

      {FulLoginForm && <Row gutter={[0, 0]}>

        <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }}>
          <div className='SignIn_Left_Container'>

            <div className='Left_Logo_Container'>
              <img className='Left_Logo' src={DhLogoOne} alt="" srcSet="" />
            </div>

            {LoginForm && <div className='Left_Content_Container'>

              <p className='Left_Header_Text'>Hey there!</p>

              <Form initialValues={{ remember: true, }} key={test} name="basic" layout='vertical' autoComplete="off" className='SignIn_Left_Form'>
                <Row gutter={[0, 15]}>

                  <Popover content={content} title="Remember me" placement="right" >
                    <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                      <Form.Item
                        className='SignIn_FormItem'
                        label="Email"
                        name="email"
                        rules={[{ required: validation, message: "Enter your Email" }]}
                      >
                        <Input className='SingIn_Input' autoFocus defaultValue={email} name='email' onChange={EmailHandleChange} />
                        {/* {emailError && <div>{emailError}</div>} */}
                      </Form.Item>
                    </Col>
                  </Popover>

                  <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Form.Item
                      className='SignIn_FormItem'
                      label="Password"
                      name="password"
                      rules={[{ required: validation, message: "Enter your Password" }]}
                    >
                      <Input.Password className='SingIn_Input' defaultValue={password} name='password' onChange={PasswordHandleChange} />
                      {/* {passwordError && <div>{passwordError}</div>} */}
                    </Form.Item>
                  </Col>
                  {/* defaultValue={decopass} */}
                  <Col xs={{ span: 5, offset: 1 }} md={{ span: 12, offset: 0 }} lg={{ span: 8, offset: 0 }} >
                    <Checkbox className='SignIn_CheckBox' onChange={CheckBoxHandleChange}  >Remember me</Checkbox>
                  </Col>

                  <Col xs={{ span: 5, offset: 1 }} md={{ span: 12, offset: 0 }} lg={{ span: 8, offset: 8 }}>
                    <p className='SignIn_ForgotPassword' onClick={forgotPassword}>Forgot Password?</p>
                  </Col>

                  <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <Button htmlType="submit" type='primary' className='Login_Button' onClick={Login}>Login</Button>
                  </Col>

                  <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <LoginSocialGoogle
                      client_id={process.env.REACT_APP_GOOGLE}
                      scope="openid profile email"
                      discoveryDocs="claims_supported"
                      access_type="offline"
                      onResolve={({ provider, data }) => {
                        console.log(provider, data);

                      }}

                      onReject={(err) => {
                        console.log(err);
                      }}
                    >
                      <Button className='Google_Login_Button'><img src={GoogleIcon} alt="" className='Google-Icon' />Login With Google</Button>
                    </LoginSocialGoogle>
                  </Col>

                  <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 24, offset: 0 }}>
                    <p className='SignUp_Text'>Don't have an account ? <Link to={"/SignUp"} className='SignUp_Text_Span'>Sign up </Link></p>
                  </Col>

                </Row>
              </Form>

            </div>}

            {LoginForm && <div className='Left_SignIn_Bottom_Container'>
              <p className='Left_SignIn_Bottom_Text'>From</p>
              <img src={DecisionMindsLogo} alt="" className='DecisionMind_Logo' />
            </div>}

            {ForgotPasswordComponent && 
            <ForgotPassword 
            ibLoginFormVisible={e => setLoginForm(e)} 
            ForgotPasswordVisle={e => setForgotPasswordComponent(e)} 
            FullLoginFormVisibile={e => setFullLoginForm(e)}
            ChangePasswordVisible={e => setChangePassword(e)} 
            next={Next} 
            BackToLogin={BackToLogin} setForgotEmail={setForgotEmail} setOtpEnable={setOtpEnable} forgotEmail={forgotEmail} otpEnable={otpEnable} setOtpData={setOtpData} otpData={otpData} responseStatus={responseStatus} />}

          </div>
        </Col>

        <Col xs={{ span: 5, offset: 1 }} md={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 0 }} >
          <div className='SignIn_Right_Container'>

            <div className='Right_Header_Container'>
              <p className='Right_Header_Text_One'>Migrate Data</p>
              <p className='Right_Header_Text_Two'>like a breeze</p>
            </div>

            <div className='Right_Sub_Header_Container'>
              <p className='Right_Sub_Header_Text'>High performance data pipelines <br /> built in a minute</p>
            </div>

            <div className='Right_Image_Container'>
              <img className='Right_Image' src={LoginIllustrate} alt="" />
            </div>

          </div>
        </Col>
      </Row>
      }
      {ChangePassword && <div className='Password_Container'>
        <PasswordComponent LoginFormVisible={e => setLoginForm(e)} ForgotPasswordVisible={e => setForgotPasswordComponent(e)} FullLoginFormVisibile={e => setFullLoginForm(e)} ChangePasswordVisible={e => setChangePassword(e)} newPassword={newPassword} setNewPassword={setNewPassword} Submit={Submit}
        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword} confirmPasswordVal={confirmPasswordVal} setConfirmPasswordVal={setConfirmPasswordVal} 
        passWord={passWord} setPassWord={setPassWord} passwordChangedSuccessfully={passwordChangedSuccessfully} setPasswordChangedSuccessfully={setPasswordChangedSuccessfully}
         />
      </div>
      }

    </div>
  )
}
export default SignIn