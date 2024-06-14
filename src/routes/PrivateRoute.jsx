

import { Navigate, useLocation } from 'react-router-dom'
import { LoadingSpinner } from '../Components/LoadingSpiner'
import { useAuth } from '../hooks/useAuth'



export const PrivateRoute = ({children}) => {
  
const {user,loading}= useAuth()
const location=useLocation()

if(loading){
 return <LoadingSpinner/>
}
if(user){
return children
}
  return  <Navigate to={"/login"} state={{from:location}} replace/>

}

