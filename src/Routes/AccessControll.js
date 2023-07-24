export const tenant =[
    {
        pages: "connection",
        view: true,
        read: true,
        write: true,
        connectionDetails: {
            view: true,
            read: true,
            write: true,
        }
    },
    {
        pages: "configuration",
        view: true,
        read: true,
        write: true,
        dataMapping: {
            view: true,
            read: true,
            write: true,
        },
        // schemaMigration: {
        //     view: true,
        //     read: true,
        //     write: true,
        // },  
        // specialHandling:{
        //     view: true,
        //     read: true,
        //     write: true,
        // }   
    },
    {
        pages: "pipeline",
        view: true,
        read: true,
        write: true,
        pipelinesDetail: {
            view: true,
            read: true,
            write: true,
        },
        // sqlExtracts: {
        //     view: true,
        //     read: true,
        //     write: true,
        // },
        schemaMigration: {
            view: true,
            read: true,
            write: true,
        },  
        specialHandling:{
            view: true,
            read: true,
            write: true,
        }   
    },
    {
        pages: "schedule",
        view: true,
        read: true,
        write: true,
        scheduleDependency: {
            view: true,
            read: true,
            write: true,
        },
    },
    {
        pages: "monitordata",
        view: true,
        read: true,
        write: true,
    },
    {
        pages: "settings",
        read: true,
        write: true,
        PagesModule: {
            view: false,
        }
    },
    {
        pages: "role",
        read: true,
        write: true,
    },
    {
        pages: "roledetails",
        read: true,
        write: true,
    },
    {
        pages: "user",
        read: true,
        write: true,
    },
    {
        pages: "userrole",
        read: true,
        write: true,
    },
    {
        pages: "teams",
        read: true,
        write: true,
    },
    {
        pages: "audit",
        read: true,
        write: true,
    },
    {
        pages: "tenantregister",
        read: true,
        write: true,
    },
]

export const admin = [
    {
        pages: "connection",
        view: true,
        read: true,
        write: true,
        connectionDetails: {
            view: true,
            read: true,
            write: true,
        }
    },
    {
        pages: "configuration",
        view: true,
        read: true,
        write: true,
        dataMapping: {
            view: true,
            read: true,
            write: true,
        },
        // schemaMigration: {
        //     view: true,
        //     read: true,
        //     write: true,
        // },   
        // specialHandling:{
        //     view: true,
        //     read: true,
        //     write: true,
        // }   
    },
    {
        pages: "pipeline",
        view: true,
        read: true,
        write: true,
        pipelinesDetail: {
            view: true,
            read: true,
            write: true,
        },
        // sqlExtracts: {
        //     view: true,
        //     read: true,
        //     write: true,
        // },
        schemaMigration: {
            view: true,
            read: true,
            write: true,
        },   
        specialHandling:{
            view: true,
            read: true,
            write: true,
        } 
    },
    {
        pages: "schedule",
        view: true,
        read: true,
        write: true,
        scheduleDependency: {
            view: true,
            read: true,
            write: true,
        },
    },
    {
        pages: "monitordata",
        view: true,
        read: true,
        write: true,
    },
    {
        pages: "settings",
        view: true,
        read: true,
        write: true,
        PagesModule: {
            view: true,
        }
    },
    {
        pages: "role",
        view: true,
        read: true,
        write: true,
    },
    {
        pages: "roledetails",
        view: true,
        read: true,
        write: true,
    },
    {
        pages: "user",
        view: true,
        read: true,
        write: true,
    },
    {
        pages: "userrole",
        view: true,
        read: true,
        write: true,
    },
    {
        pages: "pages",
        view: true,
        read: true,
        write: true,
    },
    {
        pages: "teams",
        view: true,
        read: true,
        write: true,
    },
    {
        pages: "audit",
        view: true,
        read: true,
        write: true,
    },
]

export const user = [
    {
        pages: "connection",
        view: true,
        read: true,
        write: true,
        connectionDetails: {
            view: true,
            read: true,
            write: true,
        }
    },
    {
        pages: "configuration",
        view: true,
        read: true,
        write: true,
        dataMapping: {
            view: true,
            read: true,
            write: true,
        },
        // schemaMigration: {
        //     view: true,
        //     read: true,
        //     write: true,
        // },
        // specialHandling:{
        //     view: true,
        //     read: true,
        //     write: true,
        // }   
    },
    {
        pages: "pipeline",
        view: true,
        read: true,
        write: true,
        pipelinesDetail: {
            view: true,
            read: true,
            write: true,
        },
        // sqlExtracts: {
        //     view: true,
        //     read: true,
        //     write: true,
        // },
        schemaMigration: {
            view: true,
            read: true,
            write: true,
        },
        specialHandling:{
            view: true,
            read: true,
            write: true,
        }
    },
    {
        pages: "schedule",
        view: true,
        read: true,
        write: true,
        scheduleDependency: {
            view: true,
            read: true,
            write: true,
        },
    },
    {
        pages: "monitordata",
        view: true,
        read: true,
        write: true,
    },
    
]