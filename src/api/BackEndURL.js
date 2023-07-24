import axios from 'axios'
import cookie from 'react-cookies'

let URL = process.env.REACT_APP_URL

export const Token= `Bearer ${cookie.load("DHC")}`
// console.log(Token)
export const LogIn = {
    method: axios.post,
    URL: `${URL}/login/`
}

export const TenantLogin={
    method:axios.post,
    URL:`${URL}/tenant_login/`
}

// export const TestValid = {
//     method: axios.get,
//     URL: `${URL}/test_con/`
// }

export const Column = {
    method: axios.get,
    URL: `${URL}/column_desc/`
}

export const TenantRegister={
    method:axios.post,
    URL:`${URL}/tenantregister/`
}

export const VerifyToken = {
    method: axios.post,
    URL: `${URL}/security/`
}
export const RegisterAPI = {
    method: axios.post,
    URL: `${URL}/register/`
}
// export const TenantList = {
//     method: {
//         get: axios.get,
//         post: axios.post,
//         put: axios.put
//     },
//     URL: {
//         get: `${URL}/tenantregister/`,
//         post: `${URL}/tenantregister/`,
//         put: `${URL}/tenantregister/`
//     }
// }
export const Connection = {
    method: {
        get: axios.get,
        post: axios.post,
        put: axios.put,
    },
    URL: {
        get: `${URL}/getconnection/`,
        getOne:`${URL}/getconnection/`,
        post: `${URL}/postconnection/`,
        put: `${URL}/putconnection/`
    }
}
export const ConnectionDetail = {
    method: {
        get: axios.get,
        post: axios.post,
        put: axios.put
    },
    URL: {
        get: `${URL}/connection_det/`,
        post: `${URL}/connection_det/`,
        put: `${URL}/connection_det/`
    }
}

// export const DataType={
//     method:{
//         get:axios.get,
//         post:axios.post,
//     },
//     URL:{
//         get:`${URL}/datatype/`,
//         post:`${URL}/datatype/`
//     }
// }

export const Configuration = {
    method: {
        get: axios.get,
        post: axios.post,
        put: axios.put
    },
    URL: {
        get: `${URL}/db_config/`,
        post: `${URL}/db_config/`,
        put: `${URL}/db_config/`
    }
}

export const SchemaMigrate={
    method:{
        get:axios.get,
        post:axios.post,
        put:axios.put
    },
    URL:{
        get:`${URL}/schema/`,
        post:`${URL}/schema/`,
        put:`${URL}/schema/`

    }
}

export const SchemaTrigger={
    method:{
        put:axios.put,
    },
    URL:{
        put:`${URL}/schema_trigger`
    }
}

export const SplHandling={
    method:{
        get:axios.get,
        post:axios.post,
        put:axios.put
    },
    URL:{
        get:`${URL}/splchar/`,
        post:`${URL}/splchar/`,
        put:`${URL}/splchar/`

    }
}

export const SpecialTrigger={
    method:{
        get:axios.get,
    },
    URL:{
        // post:`${URL}/special_trigger`
    }
}

export const DTransform={
    method:{
        get:axios.get,
        post:axios.post,
        put:axios.put
    },
    URL:{
        get:`${URL}/d_trans/`,
        post:`${URL}/d_trans/`,
        put:`${URL}/d_trans/`
    }
}


export const ScheduleTrigger={
    method:{
        get:axios.get,
    },
    URL:{
        get:`${URL}/table_trigger`
    }
}

export const DataType={
    method:{
        get:axios.get,
        post:axios.post,
    },
    URL:{
        get:`${URL}/datatype/`,
        post:`${URL}/datatype/`
    }
}

export const Pipeline = {
    method: {
        get: axios.get,
        post: axios.post,
        put: axios.put,
    },
    URL: `${URL}/pipeline/`
}

export const PipelineDetail = {
    method: {
        get: axios.get,
        post: axios.post,
        put: axios.put,
    },
    URL: {
        get: `${URL}/pipeline_det/`,
        put: `${URL}/pipeline_det/`,
        post: `${URL}/pipeline_det/`,
    }
}

export const MonitorData = {
    method: {
        get: axios.get,
    },
    URL: {
        get: `${URL}/schedule_monitor/`,
    }
}

export const MonitorSchema = {
    method: {
        get: axios.get,
    },
    URL: {
        get: `${URL}/schema_monitor/ `,
    }
}

export const AuditMonitor={
    method:{
        get: axios.get,
    },
    URL:{
        get:`${URL}/audit_monitor/`
    }
}
export const TenantList = {
    method: {
        get: axios.get,
        post: axios.post,
        put: axios.put
    },
    URL: {
        get: `${URL}/tenant/`,
        post: `${URL}/tenant/`,
        put: `${URL}/tenant/`
    }
}
export const Role = {
    method: {
        get: axios.get,
        post: axios.post,
        put: axios.put
    },
    URL: {
        get: `${URL}/role/`,
        post: `${URL}/role/`,
        put: `${URL}/role/`,
    }
}

export const RoleDetails = {
    method: {
        get: axios.get,
        post: axios.post,
    },
    URL: {
        get: `${URL}/role_detail/`,
        post: `${URL}/role_detail/`,
    }
}
export const User = {
    method: {
        get: axios.get,
        post: axios.post,
    },
    URL: {
        get: `${URL}/user_api/`,
        post: `${URL}/user_api/`
    }
}

export const UserRole = {
    method: {
        get: axios.get,
        put: axios.put,
        post: axios.post,
    },
    URL: {
        get: `${URL}/user_role/`,
        put: `${URL}/user_role/`,
        post: `${URL}/user_role/`,
    }
}

export const Teams ={
    method:{
        get:axios.get,
        post: axios.post,
        put: axios.put,
        delete: axios.delete,

    },
    URL:{
        get:`${URL}/team/`,
        post:`${URL}/team/`,
        put:`${URL}/team/`,
        delete:`${URL}/team/`,

    }
}

export const Members ={
    method:{
        get:axios.get,
        post:axios.post,
    },
    URL:{
        get:`${URL}/member/`,
        post:`${URL}/member/`,
    }
}

export  const Schedule = {
    method: {
        get: axios.get,
        post: axios.post,
        put: axios.put,
        posttime:axios.post
    },
    URL: {
        get: `${URL}/pipe_sc/`,
        post: `${URL}/pipe_sc/`,
        put: `${URL}/pipe_sc/`,
        posttime:`${URL}/schedule/`,
    }
}

export const ScheduleDependency = {
    method: {
        get: axios.get,
        post: axios.post,
        put: axios.put
    },
    URL: {
        get: `${URL}/schedule_dep/`,
        post: `${URL}/schedule_dep/`,
        update: `${URL}/schedule_dep/`,

    }
}

export const SqlExtract = {
    method: {
        get: axios.get,
        post: axios.post,
        put: axios.put
    },
    URL: {
        get: `${URL}/sql_extract_api/`,
        post: `${URL}/sql_extract_api/`,
        put: `${URL}/sql_extract_api/`
    }
}

export const Pages = {
    method: {
        get: axios.get,
        post: axios.post,
    },
    URL: {
        get: `${URL}/pages/`,
        post: `${URL}/pages/ `,
    }
}

export const CountDetail = {
    method: {
        get: axios.get,
    },
    URL: {
        get: `${URL}/new_detail/`,

    }
}
export const ChartTwoCount = {
    method: {
        get: axios.get,
    },
    URL: {
        get: `${URL}/new_count/`
    }
}

export const TotalCount = {
    method: {
        get: axios.get,
    },
    URL: {
        get: `${URL}/total_count/`
    }
}
export const Profile = {
    method: {
        get: axios.get,
        edit: axios.put
    },
    URL: {
        get: `${URL}/profile`,
        put: `${URL}/profile`
    }
}
export const Audit = {
    method: {
        get: axios.get,
    },
    URL: {
        get: `${URL}/preauditdatabase/`
    }
}