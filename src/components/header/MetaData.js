import ActionButton from './atoms/actionButtons/ActionButton'
import NewButton from './atoms/newButton/NewButton'

export const metaData = {
    AIScience: [{
        action: ActionButton,
        search: true,
        searchText: {
            columnDescription: "column Name",
            Cleansing: "Clean Name"

        },
        addButton: NewButton,
    }],

    Transform: [{
        action: ActionButton,
        search: true,
        searchText: {
            Transform: "Transform Name",
            TalendConfig:"Talend Name"
        },
        addButton: NewButton
    }],
    Visualization: [{
        action: ActionButton,
        // search: true,
        searchText: {
            Data: "Data",
        },
        addButton: NewButton
    }],

    Connection: [{
        action: ActionButton,
        search: true,
        searchText: {
            Connection: "Connection Name",
            ConnectionDetails: "Connection Details Name"
        },
        addButton: NewButton,
    }],

    Configuration: [{
        action: ActionButton,
        search: true,
        searchText: {
            Configuration: 'Configuration Name',
            DataMapping: 'Data Mapping Name',
            // SchemaMigration:'Schema Name',
            // SpecialHandling:'search'
        },
        addButton: NewButton,
    }],

    Pipeline: [{
        action: ActionButton,
        search: true,
        searchText: {
            Pipeline: 'Pipelines Name',
            PipelineDetails: 'Pipelines Detail Name',
            SqlExtract: 'Sql Extract Name',
            SchemaMigration: 'Schema Name',
            SpecialHandling: 'Handling Name'
        },
        addButton: NewButton,
    }],

    Schedule: [{
        action: ActionButton,
        search: true,
        searchText: {
            Schedule: 'Schedule Name',
            ScheduleDependancy: 'Schedule Dependancy Name'
        },
        addButton: NewButton
    }],
    Audit: [{
        action: ActionButton,
        search: false,
        searchText: {
            PostAudit: 'PostAudit',
            PreAudit: 'PreAudit',
        },
        addButton: NewButton,
    }],
    MonitorData: [{
        action: ActionButton,
        search: false,
        searchText: {
            MonitorData: 'Schedule Name',
            MonitorSchema: 'Monitor Schema',
        },
        addButton: NewButton,
    }],

    SettingsData: [{
        action: ActionButton,
        search: true,
        searchText: {
            User: 'User',
            Pages: 'Pages',
            // Teams: 'Teams',
            Role: 'Role Name',
            TenantList: "Company Name",
            RoleDetails: 'Role Details Name',
        },
        addButton: NewButton,
        // role:{
        //     action: ActionButton,
        //     search:true,
        //     searchText: {
        //         Role: 'Role Name',
        //     },
        //     addButton: NewButton,
        // },
        // roleDetails:{
        //     action: ActionButton,
        //     searchText: {
        //         RoleDetails: 'Role Details Name',
        //     },
        //     addButton: NewButton,
        // },
        // user:{
        //     action: ActionButton,
        //     search:true,
        //     searchText: {
        //         User: 'User Name',
        //     },
        //     addButton: NewButton,
        // },
        // userRole:{
        //     action: ActionButton,
        //     search:true,
        //     searchText: {
        //         UserRole: 'User Role Name',
        //     },
        //     addButton: NewButton,
        // },
        // pages:{
        //     action: ActionButton,
        //     search:true,
        //     searchText: {
        //         Pages: 'Pages',
        //     },
        //     addButton: NewButton,
        // },
        // teams:{
        //     action: ActionButton,
        //     search:true,
        //     searchText: {
        //         Teams: 'Teams',
        //     },
        //     addButton: NewButton,
        // }

    }]

}