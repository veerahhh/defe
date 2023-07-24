import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Auth, UnAuth } from '../auth/Auth'
import SignIn from "../components/signIn/SignIn";
import SignUp from '../components/singUp/SignUp'
import Dashboard from "../components/dashBoard/Dashboard";
import AdminLayout from '../components/layout/AdminLayout'
import Connection from "../pages/connection/index.js";
import Configuration from '../pages/configuration/index.js'
import Pipeline from "../pages/pipeline/index.js";
import Schedule from "../pages/schedule/index.js";
import MoniterData from "../pages/moniterData/index.js";
import Role from "../pages/settings/role/index.js";
import RoleDetails from "../pages/settings/roleDetails/index.js";
import User from "../pages/settings/user/index.js";
import UserRole from "../pages/settings/userRole/index.js";
import Home from "../pages/settings/Home";
import Pages from "../pages/settings/pages/index.js";
import Profile from "../pages/profile/Profile";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import Utilitytool from '../components/modal/utilitytool/UtilityTool'
import RegisterForm from "../pages/tenant/register/RegisterForm";
import AccessDenied from '../pages/page_not_found/PageNotFound';
import { tenant, admin, user } from './AccessControll'
import Teams from '../pages/settings/teams/index.js';
import { VerifyToken } from '../api/BackEndURL'
import cookie from 'react-cookies'
import Payment from '../pages/dh_payment/Payment';
import Loader from '../components/loader/Loader';
import TenantList from '../pages/tenantList/index.js';
import SpecialHandling from '../components/modal/specialHandling/SpecialHandling';
import DecisionHub from '../pages/decisionHub/index.js';
import Transform from '../pages/dTransform/index';
import DFlattern from '../pages/dFlattern/Dflattern';
import Visualization from '../pages/dVisualization/Index';
import Validate from '../pages/dValidate/index'
const NavigateRoutes = () => {

    const [role, setRole] = useState()
    const [pages, setPages] = useState([])

    const loadPages=()=>{
        VerifyToken.method(VerifyToken.URL, { 'authentication': cookie.load("DHC") }).then((res) => {
            switch (res.data.role) {
                case "Tenant":
                    setPages(tenant)
                    setRole('Tenant')
                    break;
                case "admin":
                    setPages(admin)
                    setRole('Admin')
                    break;
                case "user":
                    setPages(user)
                    setRole('User')
                    break;
                case "Employee":
                    setPages(employee)
                    setRole('Employee')
                    break;
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
       loadPages(true)
    },[])

    const employee = [
        {
            pages: "connection",
            access: "write"
        },
        {
            pages: "configuration",
            access: "write"
        },
        {
            pages: "pipeline",
            access: "write"
        }
    ]

    const access = {
        "connection": <Connection pages={pages} />,
        "configuration": <Configuration pages={pages} />,
        "pipeline": <Pipeline pages={pages} />,
        "schedule": <Schedule pages={pages} />,
        "monitordata": <MoniterData pages={pages} />,
        "settings": <Home pages={pages} />,
        "role": <Role pages={pages} />,
        "roledetails": <RoleDetails pages={pages} />,
        "user": <User pages={pages} />,
        "userrole": <UserRole pages={pages} />,
        "pages": <Pages pages={pages} />,
        "teams": <Teams pages={pages} />,
        "audit": <Utilitytool pages={pages} />,
        "SpecialHandling":<SpecialHandling pages={pages}/>,
        "tenantregister": <RegisterForm />
    }

    return (
        
        <BrowserRouter >

            <Routes>

                <Route exact path="/" element={<UnAuth />}>
                    <Route index element={<SignIn />} />
                    <Route exact path="/SignUp" element={<SignUp />} />
                </Route>

                <Route path="/tenant/register" element={<RegisterForm />} />
                <Route exact path="/" element={<Auth />}>
                    <Route exact path="/" element={<AdminLayout pages={pages} />} >
                        <Route exact path="/dashBoard" element={<Dashboard loadPages={loadPages}/>} />
                        {pages.map((val, key) => {
                            // console.log(val)
                            return (
                                <Route exact path={`/datahub/${val.pages}`} element={access[val.pages.replaceAll(' ', '')]} />
                            )
                        })}
                       
                        <Route exact path="/special" element={<SpecialHandling />} /> 
                         <Route exact path="/tenantlist" element={<TenantList />} />
                        <Route exact path="/profile" element={<Profile />} />
                        <Route exact path="/resetpassword" element={<ResetPassword />} />
                        <Route exact path="/descisionHub/aiscience" element={<DecisionHub />} />
                        <Route exact path='/otherModule/transform'element={<Transform />}/>
                        <Route exact path="/otherModule/dFlatten" element={< DFlattern/>} />
                        <Route exact path='/otherModule/dVisualization' element={<Visualization/>}/>
                        <Route exact path='/otherModule/dValidate' element={<Validate/>}/>
                        {/* <Route exact path="/connection" element={<Connection />} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
                        <Route exact path="/configuration" element={<Configuration />} />
                        <Route exact path="/pipeline" element={<Pipeline />} />
                        <Route exact path="/schedule" element={<Schedule />} />
                        <Route exact path="/monitordata" element={<MoniterData />} />
                        <Route exact path="/role" element={<Role />} />
                        <Route exact path="/roledetails" element={<RoleDetails />} />
                        <Route exact path="/user" element={<User />} />
                        <Route exact path="/userrole" element={<UserRole />} />
                        <Route exact path="/pages" element={<Pages />} />
                        <Route exact path="/settings" element={<Home />} /> */}

                    </Route>
                </Route>
                <Route exact path="/payment" element={<Payment />} />
                <Route exact path="/loader" element={<Loader />} />
                {/* <Route exact path="/special" element={<SpecialHandling />} /> */}
                {/* <Route exact path="*" element={<AccessDenied />} /> */}
            </Routes>

        </BrowserRouter>

    )
}
export default NavigateRoutes