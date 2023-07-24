// import React, { useState } from 'react'
// import './Sidebar.css'

// import { Divider, Avatar, Popover } from 'antd'
// import { NavLink,useNavigate } from 'react-router-dom';
// import { SidebarData} from './SidebarData'
// import FullLogo from '../../assests/images/DMX datahub.svg'
// import SmallLogo from '../../assests/images/Small DH logo 1.svg'
// import DecisionmindsLogo from '../../assests/images/Decision-Minds-Logo.svg'
// import * as Fa from 'react-icons/fa'
// import * as Hi from 'react-icons/hi'
// import * as Md from 'react-icons/md'
// import { useDispatch } from 'react-redux'
// import { ActionButton } from '../../redux/reducer/HeaderReducer'
// import cookie from 'react-cookies'


// function Sidebar(props) {

//     const { open, toggle } = props
//     const dispatch = useDispatch()
//     const navigate=useNavigate()

//     const logout = () => {
//         localStorage.clear()
//         sessionStorage.clear()
//         cookie.remove("DHC")
//         cookie.remove("VerifyToken")
//         navigate('/')
//         window.location.reload(false);
//     }

//     const profile=()=>{
//         navigate('/profile')
//     }

//     const resetPassword=()=>{
//         navigate('/resetpassword')
//     }

//     const profileData = [
//         {
//             icon: Fa.FaRegUser,
//             name: "Profile",
//             color: 'rgba(12,80,163,255)',
//             func:profile,
//         },
//         {
//             icon:Md.MdOutlinePassword,
//             name: "Reset Password",
//             color: 'rgba(0,150,136,1)',
//             func:resetPassword,
//         },
//         {
//             icon: Hi.HiOutlineLogout,
//             name: "Logout",
//             color: 'red',
//             func: logout,
//         },
//     ]

//     const content = (
//         <div className='Profile-Parent-Container'>
//             {profileData.map((val)=>{
//                 return(
//             <div className='Profile-Inner-Container' onClick={val.func}>
//                 <p className='Profile-Content'><val.icon className='Profile-Icon' size={17} color={val.color}/><span className='Profile-Text'>{val.name}</span></p>
//             </div>
//             )
//         })}
//         </div>
//     );

//     return (
//         <div className={toggle === false ? 'Sidebar-Parent-Container-Open' : 'Sidebar-Parent-Container-Close'}>
//             <div className={toggle === false ? 'Sidebar-Inner-Container-Open' : 'Sidebar-Inner-Container-Close'}>
//                 <div className={toggle === false ? 'Sidebar-Head-Logo-Container-Open' : 'Sidebar-Head-Logo-Container-Close'} onClick={open}>
//                     <img className={toggle === false ? "Sidebar-Full-Head-Logo-Open" : "Sidebar-Full-Head-Logo-Close"} src={FullLogo} alt="" />
//                     <img className={toggle === false ? "Sidebar-Small-Head-Logo-Open" : "Sidebar-Small-Head-Logo-Close"} src={SmallLogo} alt="" />
//                 </div>
//                 <Divider style={{ margin: "10px 0 10px 0", borderColor: "#ddd" }} />
//                 <div className={toggle === false ? 'Sidebar-Content-Container-Open' : 'Sidebar-Content-Container-Close'}>
//                     {SidebarData.map((val, key) => {
//                         return (
//                             <NavLink to={val.path} className="Sidebar-Icon-Text-Container" activeclassName='active'
//                                 onClick={() => {
//                                     dispatch(ActionButton({ name: val.id }))
//                                 }}
//                             >
//                                 <p onClick={() => dispatch(ActionButton({ name: val.id }))} className={toggle === false ? 'Sidebar-Content-Tag-Open' : 'Sidebar-Content-Tag-Close'}><val.icon className={toggle === false ? 'Sidebar-Icon-Open' : 'Sidebar-Icon-Close'} size={23} /><span className='Sidebar-Text' style={{ display: ((toggle === false ? "block" : "none")) }}>{val.name}</span></p>
//                             </NavLink>
//                         )
//                     })}
//                 </div>
//                 <Divider style={{ margin: "10px 0 10px 0", borderColor: "#ddd" }} />
//                 <div className={toggle === false ? 'Sidebar-Footer-Container-Open' : 'Sidebar-Footer-Container-Close'}>
//                     <Popover content={content} trigger="click" placement={toggle===false?"top":"left"}>
//                         <div className={toggle === false?'Sidebar-Footer-Profile-Container-Open':'Sidebar-Footer-Profile-Container-Close'}>
//                             <Avatar className={toggle === false ? "Sidebar-Avatar-Open" : "Sidebar-Avatar-Close"} size="large" src="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_960_720.png" />
//                             <div className={toggle === false ? "Sidebar-User-Info-Open" : "Sidebar-User-Info-Close"}>
//                                 <p className='Sidebar-User-Name'>User</p>
//                                 <p className='Sidebar-user-Email'>user123@decsionminds.com</p>
//                             </div>
//                         </div>
//                     </Popover>
//                     <img className={toggle === false ? "Sidebar-Decisionminds-Logo-Open" : "Sidebar-Decisionminds-Logo-Close"} src={DecisionmindsLogo} alt="" />
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Sidebar

import React, { useState } from 'react'
import './Sidebar.css'
import { DownOutlined } from '@ant-design/icons';
import { Divider, Avatar, Popover, Menu } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData'
import FullLogo from '../../assests/images/datahub white.svg'
import SmallLogo from '../../assests/images/mx white.svg'
import DecisionmindsLogo from '../../assests/images/Decision-Minds-Logo.svg'
import * as Fa from 'react-icons/fa'
import * as Hi from 'react-icons/hi'
import * as Md from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { ActionButton } from '../../redux/reducer/HeaderReducer'
import cookie from 'react-cookies'

const { SubMenu } = Menu;
function Sidebar(props) {

    const { open, toggle } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        sessionStorage.clear()
        cookie.remove("DHC")
        cookie.remove("VerifyToken")
        navigate('/')
        window.location.reload(false);
    }

    const profile = () => {
        navigate('/profile')
    }

    const resetPassword = () => {
        navigate('/resetpassword')
    }

    const profileData = [
        {
            icon: Fa.FaRegUser,
            name: "Profile",
            color: 'rgba(12,80,163,255)',
            func: profile,
        },
        {
            icon: Md.MdOutlinePassword,
            name: "Reset Password",
            color: 'rgba(0,150,136,1)',
            func: resetPassword,
        },
        {
            icon: Hi.HiOutlineLogout,
            name: "Logout",
            color: 'red',
            func: logout,
        },
    ]

    const content = (
        <div className='Profile-Parent-Container'>
            {profileData.map((val) => {
                return (
                    <div className='Profile-Inner-Container' onClick={val.func}>
                        <p className='Profile-Content'><val.icon className='Profile-Icon' size={17} color={val.color} /><span className='Profile-Text'>{val.name}</span></p>
                    </div>
                )
            })}
        </div>
    );

    return (
        <div className={toggle === false ? 'Sidebar-Parent-Container-Open' : 'Sidebar-Parent-Container-Close'}>
            <div className={toggle === false ? 'Sidebar-Inner-Container-Open' : 'Sidebar-Inner-Container-Close'}>
                <div className={toggle === false ? 'Sidebar-Head-Logo-Container-Open' : 'Sidebar-Head-Logo-Container-Close'} onClick={open}>
                    <img className={toggle === false ? "Sidebar-Full-Head-Logo-Open" : "Sidebar-Full-Head-Logo-Close"} src={FullLogo} alt="" />
                    <div>
                        <img className={toggle === false ? "Sidebar-Small-Head-Logo-Open" : "Sidebar-Small-Head-Logo-Close"} src={SmallLogo} alt="" />
                    </div>

                </div>

                <Divider style={{ margin: "10px 0 10px 0", borderColor: "#ddd", opacity: 0.2 }} />
                {/* <div className={toggle === false ? 'Sidebar-Content-Container-Open' : 'Sidebar-Content-Container-Close'}>
                    {SidebarData.map((val, key) => {
                        return (
                            <NavLink to={val.path} className="Sidebar-Icon-Text-Container" activeclassName='active'
                                onClick={() => {
                                    dispatch(ActionButton({ name: val.id }))
                                }}
                            >
                                <p onClick={() => dispatch(ActionButton({ name: val.id }))} className={toggle === false ? 'Sidebar-Content-Tag-Open' : 'Sidebar-Content-Tag-Close'}><val.icon className={toggle === false ? 'Sidebar-Icon-Open' : 'Sidebar-Icon-Close'} size={23} /><span className='Sidebar-Text' style={{ display: ((toggle === false ? "block" : "none")) }}>{val.name}</span></p>
                            </NavLink>
                        )
                    })}
                </div> */}
                <div className={toggle === false ? 'Sidebar-Content-Container-Open' : 'Sidebar-Content-Container-Close'} >
                    <Menu mode="inline" inlineCollapsed={toggle} defaultSelectedKeys={['Dashboard']} className="SidebarAll-Container">
                        {SidebarData.map((val, key) => {
                            // console.log(val)

                            return val.subModules ? (
                                <SubMenu className='sidebar_subMenu' key={key.id} title={val.name} icon={val.icon ? <val.icon size={20} /> : null} >
                                    {val.subModules.map((subModule, index) => (
                                        <Menu.Item index={index.id} className='Sidebar_Menu_Item' icon={subModule.icon ? <subModule.icon className='subModule_text' size={20} /> : null}>
                                            <NavLink onClick={() => {
                                                dispatch(ActionButton({ name: subModule.id }))
                                            }} className="subModule_name" to={subModule.path}>{subModule.name}</NavLink>
                                        </Menu.Item>
                                    ))}
                                </SubMenu>
                            ) : (
                                <Menu.Item  key={val.id} icon={val.icon ? <val.icon className='sidebarIcon' size={20} /> : null} >
                                    <NavLink onClick={() => dispatch(ActionButton({ name: val.id }))} to={val.path}>{val.name}</NavLink>
                                </Menu.Item>
                            );
                        })}
                    </Menu>
                </div>

                <Divider style={{ margin: "1px 0 10px 0", opacity: 0.2 }} />
                <div className={toggle === false ? 'Sidebar-Footer-Container-Open' : 'Sidebar-Footer-Container-Close'}>
                    <Popover content={content} trigger="click" placement={toggle === false ? "top" : "left"}>
                        <div className={toggle === false ? 'Sidebar-Footer-Profile-Container-Open' : 'Sidebar-Footer-Profile-Container-Close'}>
                            <Avatar className={toggle === false ? "Sidebar-Avatar-Open" : "Sidebar-Avatar-Close"} size="large" src="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_960_720.png" />
                            <div className={toggle === false ? "Sidebar-User-Info-Open" : "Sidebar-User-Info-Close"}>
                                <p className='Sidebar-User-Name'>User</p>
                                <p className='Sidebar-user-Email'>user123@decsionminds.com</p>
                            </div>
                        </div>
                    </Popover>
                    <img className={toggle === false ? "Sidebar-Decisionminds-Logo-Open" : "Sidebar-Decisionminds-Logo-Close"} src={DecisionmindsLogo} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar