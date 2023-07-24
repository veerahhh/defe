import React, { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { VerifyToken } from '../api/BackEndURL'
import cookie from 'react-cookies'

export const Auth = () => {
  const [Status, setStatus] = useState()
  useEffect(() => {
    VerifyToken.method(VerifyToken.URL, { 'authentication': cookie.load("DHC") }).then((res) => {
      res.data.status == true ? setStatus(<Outlet />) : setStatus(<Navigate to="/" />)
    }).catch((err) => {
      sessionStorage.clear()
      localStorage.clear()
      cookie.remove("DHC")
      setStatus(<Navigate to="/" />)
    })
  }, [])
  return Status
}

export const UnAuth = () => {
  const [Status, setStatus] = useState()
  useEffect(() => {
    VerifyToken.method(VerifyToken.URL, { 'authentication': cookie.load("DHC") }).then((res) => {
      res.data.status == true ? setStatus(<Navigate to="/dashboard" />) : setStatus(<Outlet />)
    }).catch((err) => {
      sessionStorage.clear()
      localStorage.clear()
      cookie.remove("DHC")
      setStatus(<Outlet />)
    })
  }, [])
  return Status
}