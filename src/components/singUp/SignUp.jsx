import React, { useState } from 'react'
import { Row, Col } from 'antd/lib/grid'
import DHlogo from "../../assests/images/DMX datahub.svg";
import SignUp from "../../assests/images/Signup-Illustration.svg"
import './SignUp.css'
import Registerfrst from './FormOne';
import Registersec from './FormTwo';
import Registerthrd from './FormThree';
import { Link } from 'react-router-dom';
import SignUpSuccess from './SignUpSuccess';

export default function Register() {

  const [showRegisterOne, setShowRegisterOne] = useState(true)
  const [showRegisterTwo, setShowRegisterTwo] = useState(true)
  const [showRegisterThrd, setShowRegisterThrd] = useState(true)
  const [Success, setSuccess] = useState(false)
  const [SignUpPage, setSignUpPage] = useState(true)
//formone
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyDetail, setCompanyDetail] = useState("individual");
  const [conPassVal, setConPassVal] = useState(false);

  //formtwo
  const [alternatePhoneno, setAlternatePhoneno] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setpostalCode] = useState("");
  //formthree
  const [compName, setCompName] = useState("");
  const [compType, setCompType] = useState("");
  
  const showRegister = (data) => {
    console.log(data)
    setShowRegisterOne(data)
  }

  const enableRegisterTwo = (data) => {
    setShowRegisterTwo(data)
  }
  const DeActive = (data) => {
    setShowRegisterTwo(data)
  }

  const Data={
    first_name:firstName,
    last_name:lastName,
    email:email,
    phone_number:phoneNumber,
    password:password,
    confirm_password:confirmPassword,
    category:companyDetail,
    alternate_phonenumber:alternatePhoneno,
    addressline_one:address1,
    addressline_two:address2,
    countryor_city:country,
    postalcode:postalCode,
    company_name:compName,
    company_type:compType
}



  return (
    // <>
    <div className='register-page'>
      {SignUpPage && <Row wrap={true}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
          <div className='reg-img-container'>
            <img src={DHlogo} alt="" className="dhlogo" />
            <h1 className='welcomeabroadtxt'> Welcome abroad! </h1>
            <div className='SignUp-Illustrate-Container'>
              <img src={SignUp} alt="" className='SignUp-Illustrate' />
            </div>
          </div>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
          <div className='form-component'>

            <div className='Form-Inner_Component'>

              {showRegisterOne && 
               <Registerfrst showRegister={showRegister} deActivePage={DeActive} firstName={firstName} lastName={lastName}
                    phoneNumber={phoneNumber} email={email} password={password} confirmPassword={confirmPassword} companyDetail={companyDetail} setCompanyDetail={setCompanyDetail}
                    conPassVal={conPassVal} setConPassVal={setConPassVal} setLastName={setLastName} setFirstName={setFirstName} setPassword={setPassword} setPhoneNumber={setPhoneNumber}
                    setEmail={setEmail} setConfirmPassword={setConfirmPassword}/>}

              {showRegisterTwo && !showRegisterOne && 
               <Registersec enableRegisterTwo={enableRegisterTwo} backToRegOne={showRegister} 
                    success={()=>{setSuccess(true)}} NotSuccess={()=>{setSignUpPage(false)}}
                    alternatePhoneno={alternatePhoneno} address1={address1} address2={address2} postalCode={postalCode} country={country}
                    setAlternatePhoneno={setAlternatePhoneno} setAddress1={setAddress1} setAddress2={setAddress2} setpostalCode={setpostalCode} setCountry={setCountry} Data={Data}
               />}

              {showRegisterThrd && !showRegisterTwo  && !showRegisterOne &&
               <Registerthrd backToRegOne={showRegister} success={()=>{setSuccess(true)}} NotSuccess={()=>{setSignUpPage(false)}}
                compName={compName} compType={compType} address1={address1} address2={address2} postalCode={postalCode} country={country}
               setCompName={setCompName} setCompType={setCompType} setAddress1={setAddress1} setAddress2={setAddress2} setpostalCode={setpostalCode} setCountry={setCountry} Data={Data}
                />}
            </div>
            <p className='Alredy_Have_Account_Text'>Already have an account ? <Link to={"/"}>Login Here</Link></p>
          </div>
        </Col>
      </Row>}
      {Success && <SignUpSuccess />}
    </div>
    // </>
  )
}