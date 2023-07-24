import React, { useState } from 'react'
import DhLogoOne from '../../assests/images/DMX datahub.svg'
import { Input, Button, Form } from 'antd'
import * as Ai from 'react-icons/ai'

function Password({ LoginFormVisible, ForgotPasswordVisible, FullLoginFormVisibile, ChangePasswordVisible,Submit,confirmPasswordVal,setConfirmPasswordVal,
    newPassword,setNewPassword,confirmPassword,setConfirmPassword,passWord,setPassWord,passwordChangedSuccessfully,setPasswordChangedSuccessfully }) {

    // const [newPassword, setNewPassword] = useState("")
    // const [confirmPassword, setConfirmPassword] = useState("")

    // const [confirmPasswordVal, setConfirmPasswordVal] = useState(false)

    // const [passWord, setPassWord] = useState(true)
    // const [passwordChangedSuccessfully, setPasswordChangedSuccessfully] = useState(false)

    const PasswordChange = (e) => {
        setNewPassword(e.target.value)
    }

    const val = () => {
        if (confirmPassword.length <= 1) {
            setConfirmPasswordVal(false)
        }
    }


    const ConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        if (confirmPassword.length <= 1) {
            setConfirmPasswordVal(false)
        }
    }

    // const Submit = () => {
    //     if (newPassword === confirmPassword && newPassword.length > 0 && confirmPassword.length > 0) {
    //         setPassWord(false)
    //         setPasswordChangedSuccessfully(true)
    //     } else if (confirmPassword.length <= 1) {
    //         setConfirmPasswordVal(false)
    //     }
    //     else {
    //         setConfirmPasswordVal(true)
    //         setPassWord(true)
    //         setPasswordChangedSuccessfully(false)
    //     }
    // }

    const BackToLogin = () => {
        LoginFormVisible(true)
        FullLoginFormVisibile(true)
        ForgotPasswordVisible(false)
        ChangePasswordVisible(false)
    }

    return (
        <div>
            <div className='Password_Logo_Container'>
                <img className='Left_Logo' src={DhLogoOne} alt="" srcset="" />
            </div>

            {passWord && <Form autoComplete="off" layout='vertical' className='Password_Parent_Container' >

                <p className='Reset_Password_Header_Text'>Reset Password</p>

                <Form.Item label="New Password" name="newpassword" className='SignIn_FormItem' rules={[{ required: true, message: "Plese Enter Password" }]}>
                    <Input.Password className='ForgotPassword_Input' onChange={PasswordChange} />
                </Form.Item>

                <Form.Item label="Confirm Password" name="confirmpassword" className='SignIn_FormItem' rules={[{ required: true, message: "Plese Enter ConfirmPassword" }]}>
                    <Input.Password className='ForgotPassword_Input' onChange={ConfirmPasswordChange} />
                </Form.Item>
                {confirmPasswordVal && <p className='error'>Password Doesn't Match</p>}

                <Button onClick={Submit} htmlType='submit' type='primary' className='ForgotPassword_Button'>Submit</Button>

                <div className='ForgotPassword_BottomText_Container'>
                    <p className='ForgotPassword_BottomText' onClick={BackToLogin}><Ai.AiOutlineLeft style={{ margin: "4px 10px 0 0" }} />Back to login</p>
                </div>

            </Form>}

            {passwordChangedSuccessfully && <div className='Password_Changed_Msg_Container'>
                <p className='Password_Changed_Msg'>Password Changed Successfully!</p>
                <div className='ForgotPassword_BottomText_Container'>
                    <p className='ForgotPassword_BottomText' onClick={BackToLogin}><Ai.AiOutlineLeft style={{ margin: "4px 10px 0 0" }} />Back to login</p>
                </div>
            </div>}
        </div>
    )
}

export default Password






// import React, { useState } from 'react'
// import DhLogoOne from '../../assests/images/DMX datahub.svg'
// import { Input, Button, Form } from 'antd'
// import * as Ai from 'react-icons/ai'

// function Password({ LoginFormVisible, ForgotPasswordVisible, FullLoginFormVisibile, ChangePasswordVisible }) {

//     const [newPassword, setNewPassword] = useState("")
//     const [confirmPassword, setConfirmPassword] = useState("")

//     const [confirmPasswordVal, setConfirmPasswordVal] = useState(false)

//     const [password, setPassword] = useState(true)
//     const [passwordChangedSuccessfully, setPasswordChangedSuccessfully] = useState(false)

//     const PasswordChange = (e) => {
//         setNewPassword(e.target.value)
//     }

//     const val = () => {
//         if (confirmPassword.length <= 1) {
//             setConfirmPasswordVal(false)
//         }
//     }


//     const ConfirmPasswordChange = (e) => {
//         setConfirmPassword(e.target.value)
//         if (confirmPassword.length <= 1) {
//             setConfirmPasswordVal(false)
//         }
//     }

//     const Submit = () => {
//         if (newPassword === confirmPassword && newPassword.length > 0 && confirmPassword.length > 0) {
//             setPassword(false)
//             setPasswordChangedSuccessfully(true)
//         } else if (confirmPassword.length <= 1) {
//             setConfirmPasswordVal(false)
//         }
//         else {
//             setConfirmPasswordVal(true)
//             setPassword(true)
//             setPasswordChangedSuccessfully(false)
//         }
//     }

//     const BackToLogin = () => {
//         LoginFormVisible(true)
//         FullLoginFormVisibile(true)
//         ForgotPasswordVisible(false)
//         ChangePasswordVisible(false)
//     }

//     return (
//         <div>
//             <div className='Password_Logo_Container'>
//                 <img className='Left_Logo' src={DhLogoOne} alt="" srcset="" />
//             </div>

//             {password && <Form autoComplete="off" layout='vertical' className='Password_Parent_Container' >

//                 <p className='Reset_Password_Header_Text'>Reset Password</p>

//                 <Form.Item label="New Password" name="newpassword" className='SignIn_FormItem' rules={[{ required: true, message: "Plese Enter Password" }]}>
//                     <Input.Password className='ForgotPassword_Input' onChange={PasswordChange} />
//                 </Form.Item>

//                 <Form.Item label="Confirm Password" name="confirmpassword" className='SignIn_FormItem' rules={[{ required: true, message: "Plese Enter ConfirmPassword" }]}>
//                     <Input.Password className='ForgotPassword_Input' onChange={ConfirmPasswordChange} />
//                 </Form.Item>
//                 {confirmPasswordVal && <p className='error'>Password Doesn't Match</p>}

//                 <Button onClick={Submit} htmlType='submit' type='primary' className='ForgotPassword_Button'>Submit</Button>

//                 <div className='ForgotPassword_BottomText_Container'>
//                     <p className='ForgotPassword_BottomText' onClick={BackToLogin}><Ai.AiOutlineLeft style={{ margin: "4px 10px 0 0" }} />Back to login</p>
//                 </div>

//             </Form>}

//             {passwordChangedSuccessfully && <div className='Password_Changed_Msg_Container'>
//                 <p className='Password_Changed_Msg'>Password Changed Successfully!</p>
//                 <div className='ForgotPassword_BottomText_Container'>
//                     <p className='ForgotPassword_BottomText' onClick={BackToLogin}><Ai.AiOutlineLeft style={{ margin: "4px 10px 0 0" }} />Back to login</p>
//                 </div>
//             </div>}
//         </div>
//     )
// }

// export default Password