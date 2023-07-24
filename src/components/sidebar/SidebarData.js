// import * as Tb from 'react-icons/tb'
// import * as Cg from 'react-icons/cg'
// import * as Hi from 'react-icons/hi'
// import * as Ai from 'react-icons/ai'
// import * as Fi from 'react-icons/fi'
// import * as Bs from 'react-icons/bs'

// export const SidebarData = [
//     {
//         id: 'Dashboard',
//         icon: Tb.TbLayoutGrid,
//         name: 'Dashboard',
//         path: "/dashboard", 
//     },
//     {
//       id: 'Datahub',
//       icon: Tb.TbLayoutGrid,
//       name: 'Datahub',
//       // path: "/dashboard",
       
//   },
//     {
//         id: 'Connection',
//         icon: Cg.CgPlug,
//         name: 'Connections',
//         path: "/connection",
//     },
//     {
//         id: 'Configuration',
//         icon: Hi.HiOutlineDatabase,
//         name: 'Configurations',
//         path: "/configuration",
//     },
//     {
//         id: 'Pipeline',
//         icon: Ai.AiOutlineNodeIndex,
//         name: 'Pipelines',
//         path: "/pipeline",
//     },
//     {
//         id: 'Schedule',
//         icon: Hi.HiOutlineClock,
//         name: 'Schedules',
//         path: "/schedule",
//     },
//     {
//         id: 'Audit',
//         icon: Bs.BsTools,
//         name: 'Audit',
//         path: "/audit",
//     },
//     {
//         id: 'MonitorData',
//         icon: Tb.TbHeartRateMonitor,
//         name: 'MonitorData',
//         path: "/monitordata",
//     },
//     {
//         id: 'AIScience',
//         icon: Hi.HiOutlineOfficeBuilding,
//         name: 'Data Science',
//         path: "/aiscience",
//     },
    

//     {
//         id: 'Settings',
//         icon: Fi.FiSettings,
//         name: 'Settings',
//         path: "/settings",
//     },

// ]


import * as Tb from 'react-icons/tb'
import * as Cg from 'react-icons/cg'
import * as Hi from 'react-icons/hi'
import * as Ai from 'react-icons/ai'
import * as Fi from 'react-icons/fi'
import * as Bs from 'react-icons/bs'
import * as Si from 'react-icons/si'
export const SidebarData = [
  {
    id: 'Dashboard',
    icon: Tb.TbLayoutGrid,
    name: 'Dashboard',
    path: "/dashboard", 
  },
  {
    id: 'Datahub',
    name: 'Datahub',
    icon: Hi.HiOutlineOfficeBuilding,
    path: "/datahub",
    subModules: [
      {
        id: 'Connection',
        icon: Cg.CgPlug, 
        name: 'Connections',
        path: "/datahub/connection",
      },
      {
        id: 'Configuration',
        icon: Hi.HiOutlineDatabase,
        name: 'Configurations',
        path: "/datahub/configuration",
      },
      {
        id: 'Pipeline',
        icon: Ai.AiOutlineNodeIndex, 
        name: 'Pipelines',
        path: "/datahub/pipeline",
      },
      {
        id: 'Schedule',
        icon: Hi.HiOutlineClock,
        name: 'Schedules',
        path: "/datahub/schedule",
      },
      {
        id: 'Audit',
        icon: Bs.BsTools,
        name: 'Audit',
        path: "/datahub/audit",
      },
      {
        id: 'MonitorData',
        icon: Tb.TbHeartRateMonitor,
        name: 'MonitorData',
        path: "/datahub/monitordata",
      },
    ]
  },
  // {
  //   id: 'DescisionHub',
  //   name: 'DescisionHub',
  //   icon: Si.SiHubspot,
  //   path: "/descisionHub",
  //   subModules: [
  //     {
  //       id: 'AIScience',
  //       icon: Hi.HiOutlineOfficeBuilding,
  //       name: 'Data Science',
  //       path: "/descisionHub/aiScience",
  //     },
  //   ]
  // },
  {
    id: 'Othermodules',
    name: 'Other Modules',
    icon: Si.SiFlathub,
    path: "/otherModule",
    subModules: [
      {
        id: 'Data Flatten',
        icon: Hi.HiOutlineOfficeBuilding,
        name: 'D-Flatten',
        path: "/otherModule/dFlatten",
      },
      {
        id: 'Visualization',
        icon: Hi.HiOutlineOfficeBuilding,
        name: 'D-Visual',
        path: "/otherModule/dVisualization",
      },
      {
        id: 'Data Validate',
        icon: Hi.HiOutlineOfficeBuilding,
        name: 'D-Validate',
        path: "/otherModule/dValidate",
      },
      {
        id: 'Transform',
        icon: Hi.HiOutlineOfficeBuilding,
        name: 'D-Transform',
        path: "/otherModule/transform",
      },
    ]
  },
  {
    id: 'Settings',
    icon: Fi.FiSettings,
    name: 'Settings',
    path: "/datahub/settings",
  },
];

  



