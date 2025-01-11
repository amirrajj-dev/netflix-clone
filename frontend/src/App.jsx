import {Routes , Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'
import useAuth from '../store/useAuth'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import {LoaderCircle} from 'lucide-react'
import SearchPage from './pages/SearchPage'
import SearchHistoryPage from './pages/SearchHistoryPage'
import DetailsPage from './pages/DetailsPage'
import NotFound from './components/NotFound'
const App = () => {
  const {user , isCheckingAuth , checkAuth} = useAuth()
  useEffect(()=>{
    checkAuth()
  } , [])
  
  if (isCheckingAuth){
    return (
      <div className="flex items-center justify-center bg-black/80 min-h-screen font-sans">
        <LoaderCircle size={60} className='text-blue-500 animate-spin' />
      </div>
    )
  }
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage user={user} />}></Route>
      <Route path='/signup' element={user ? <Navigate to={'/'} /> : <SignUpPage />}></Route>
      <Route path='/login' element={user  ? <Navigate to={'/'} />  : <LoginPage />}></Route>
      <Route path='/search' element={<SearchPage/>}></Route>
      <Route path='/search-history' element={user ? <SearchHistoryPage/> : <Navigate to={'/login'} />}></Route>
      <Route path='/watch/:id' element={user ? <DetailsPage/> : <Navigate to={'/login'} />}></Route>
      <Route path='/*' element={<NotFound/>}></Route>
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App