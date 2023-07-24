import { createSlice } from '@reduxjs/toolkit'
import { metaData } from '../../components/header/MetaData'

const TenantList = metaData.TenantList
const Connection = metaData.Connection
const Configuration = metaData.Configuration
const Pipeline = metaData.Pipeline
const Schedule = metaData.Schedule
const MonitorData = metaData.MonitorData
const SettingsData = metaData.SettingsData
const Audit = metaData.Audit
const SpecialHandling = metaData.SpecialHandling
const AIScience = metaData.AIScience
const Transform = metaData.Transform
const Visualization = metaData.Visualization

export const Header = createSlice({
    name: "HeaderReducer",
    initialState: {
        ActionButton: {
            name: ' ',
            status: '',
            data: [],
        },
        Search: {
            value: ''
        },
        Footer: {
            page: 1,
            pagesize: 7,
        }
    },
    reducers: {
        ActionButton: (state, action) => {

            state.ActionButton.name = action.payload.name
            state.Search.value = ''

            switch (state.ActionButton.name) {
                case 'TenantList':
                    sessionStorage.setItem('status', ('TenantList'))
                    state.ActionButton.data = TenantList
                    state.ActionButton.status = 'TenantList'
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;
                case 'Connection':
                    sessionStorage.setItem('status', ('Connection'))
                    state.ActionButton.data = Connection
                    state.ActionButton.status = 'Connection'
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;
                case 'Configuration':
                    sessionStorage.setItem('status', ('Configuration'))
                    state.ActionButton.status = 'Configuration'
                    state.ActionButton.data = Configuration
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;
                case 'Pipeline':
                    sessionStorage.setItem('status', ('Pipeline'))
                    state.ActionButton.status = 'Pipeline'
                    state.ActionButton.data = Pipeline
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;
                case 'Schedule':
                    sessionStorage.setItem('status', ('Schedule'))
                    state.ActionButton.status = 'Schedule'
                    state.ActionButton.data = Schedule
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;

                case 'Audit':
                    sessionStorage.setItem('status', ('Audit'))
                    state.ActionButton.status = 'Audit'
                    state.ActionButton.data = Audit
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;

                case 'SpecialHandling':
                    sessionStorage.setItem('status', ('SpecialHandling'))
                    state.ActionButton.status = 'SpecialHandling'
                    state.ActionButton.data = Audit
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;

                case 'MonitorData':
                    sessionStorage.setItem('status', ('MonitorData'))
                    state.ActionButton.status = 'MonitorData'
                    state.ActionButton.data = MonitorData
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;


                case 'AIScience':
                    sessionStorage.setItem('status', ('AIScience'))
                    state.ActionButton.status = 'AIScience'
                    state.ActionButton.data = AIScience
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;

                case 'Transform':
                    sessionStorage.setItem('status', ('Transform'))
                    state.ActionButton.status = 'Transform'
                    state.ActionButton.data = Transform
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;

                case 'Visualization':
                    sessionStorage.setItem('status', ('Visualization'))
                    state.ActionButton.status = 'Visualization'
                    state.ActionButton.data = Visualization
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;


                case 'Settings':
                    sessionStorage.setItem('status', ('Settings'))
                    state.ActionButton.status = 'User'
                    state.ActionButton.data = SettingsData
                    state.Footer.page = 1
                    state.Footer.pagesize = 7
                    state.Search.value = ''
                    break;
            }

        },
        ActionStatusChanger: (state, action) => {
            state.ActionButton.status = action.payload.status
            state.Footer.page = 1
            state.Footer.pagesize = 7
            state.Search.value = ''
        },
        SearchValue: (state, action) => {
            state.Search.value = action.payload.value
            state.Footer.page = 1
        },
        FooterValue: (state, action) => {
            state.Footer.page = action.payload.page
            state.Footer.pagesize = action.payload.pagesize
        }
    }
})
export const { ActionButton, ActionStatusChanger, SearchValue, FooterValue } = Header.actions
export default (Header).reducer