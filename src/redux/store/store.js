import { configureStore } from "@reduxjs/toolkit"
import Header from "../reducer/HeaderReducer"
import PipelineReducer from "../reducer/pipeline/PipelineReducer"
import SqlExtract from "../reducer/pipeline/SqlExtract"
import ConnectionReducer from "../reducer/connection/ConnectionReducer"
import ConnectionDetailReducer from "../reducer/connection/ConnectionDetailReducer"
import ConfigurationReducer from "../reducer/configuration/ConfigurationReducer"
import ScheduleDependency from "../reducer/schedule/ScheduleDependency"
import ScheduleReducer from '../reducer/schedule/ScheduleReducer'
import PipelineDetailReducer from "../reducer/pipeline/PipelineDetailReducer"
import RoleReducer from "../reducer/settings/RoleReducer"
import RoleDetailsReducer from "../reducer/settings/RoleDetailsReducer"
import UserReducer from "../reducer/settings/UserReducer"
import UserRoleReducer from "../reducer/settings/UserRoleReducer"
import PagesReducer from "../reducer/settings/PagesReducer"
import CountReducer from "../reducer/count/CountReducer"
import ProfileReducer from "../reducer/profile/ProfileReducer"
import monitorReducer from "../reducer/monitordata/monitorReducer"
import monitorSchemaReducer from "../reducer/monitordata/monitorSchemaReducer"
import DataTypeReducer from "../reducer/configuration/DataTypeReducer"
import SchemaMigration from "../reducer/pipeline/SchemamigReducer"
import TeamsReducer from "../reducer/settings/TeamsReducer"
import AuditReducer from "../reducer/audit/AuditReducer"
import AuditMonitorReducer from "../reducer/monitordata/monitorReducer"
import TenantListReducer from "../reducer/tenantList/TenantListReducer"
import SpecialHandling from '../reducer/pipeline/SplHandlingReducer'
import ColumnReducer from '../reducer/decisionhub/Column'
import DTransFormReducer from "../reducer/transform/DTransform"

export default configureStore({
  reducer: {
    Header: Header,
    Tenant:TenantListReducer,
    Pipeline: PipelineReducer,
    PipelineDetail: PipelineDetailReducer,
    SqlExtract: SqlExtract,
    Connection: ConnectionReducer,
    ConnectionDetail: ConnectionDetailReducer,
    Configuration: ConfigurationReducer,
    DataType: DataTypeReducer,
    SchemaMigration: SchemaMigration,
    SpecialHandling:SpecialHandling,
    Schedule: ScheduleReducer,
    ScheduleDependency: ScheduleDependency,
    MonitorData: monitorReducer,
    MonitorSchema: monitorSchemaReducer,
    Role: RoleReducer,
    RoleDetails: RoleDetailsReducer,
    User: UserReducer,
    UserRole: UserRoleReducer,
    Page: PagesReducer,
    Count: CountReducer,
    Profile: ProfileReducer,
    Teams: TeamsReducer,
    Audit: AuditReducer,
    AuditMonitor:AuditMonitorReducer,
    Column:ColumnReducer,
    DTransform:DTransFormReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})