import React from 'react'
import AuthenticatedHomePage from '../components/home/AuthenticatedHomePage'
import UnAuthenticatedHomePage from '../components/home/UnAuthenticatedHomePage'
import useAuth from '../../store/useAuth'
import {useStore} from 'zustand'
const HomePage = ({user}) => {
  
  return (
    <>
    {user ? <AuthenticatedHomePage/> : <UnAuthenticatedHomePage/>}
    
    </>
  )
}

export default HomePage