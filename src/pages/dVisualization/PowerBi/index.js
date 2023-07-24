import React, { Fragment, useEffect } from 'react'
import Header from '../../components/header/Header';
import CommonTable from "../../components/table/CommonTable";
import { Switch, Modal, Drawer, Button, Space } from 'antd';
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loader/Loader"
import { useSelector, useDispatch } from 'react-redux'
import { connectionGet, ConnPopupAdd, ConnPopupEdit, ConnPopupView, GetId, connectionGetId } from '../../redux/reducer/connection/ConnectionReducer'
import { ConndtlPopupAdd, ConndtlPopupEdit, ConndtlPopupView, connectionDetailGet, ConndtlGetId, connectionDetailGetId } from '../../redux/reducer/connection/ConnectionDetailReducer';
import { ActionStatusChanger } from '../../redux/reducer/HeaderReducer'
import * as Fi from 'react-icons/fi'
import * as Fa from 'react-icons/fa'

import Tableauadd from '../../components/modal/visualization/tableau/Add/Tableau';
function Index() {



    const dispatch = useDispatch()

    const searchData = useSelector((state) => state.Header.Search.value)
    const footerPage = useSelector((state) => state.Header.Footer.page)
    const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)
  return (
    <Fragment>
        <Header/>
        <Tableauadd/>
    </Fragment>
  )
}

export default Index