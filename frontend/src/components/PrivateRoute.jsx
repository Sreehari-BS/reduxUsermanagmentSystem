import { Navigate, Outlet } from "react-router-dom"
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector"

const PrivateRoute = () => {
    const {userInfo} = useSelector((state) => state.auth)
  return (
    userInfo ? <Outlet /> : <Navigate to="/login" replace />
  )
}

export default PrivateRoute