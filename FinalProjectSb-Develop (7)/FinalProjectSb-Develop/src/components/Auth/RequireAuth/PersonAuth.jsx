import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

const personToken = 'personToken'

export default function PersonAuth({ children }) {
  let token = useSelector((store) => store.person.token)
  if (!token) {
    token = localStorage.getItem(personToken)
  }
  const location = useLocation()

  if (token) {
    return <Navigate to="/posts" state={{ from: location }} replace />
  }
  return children
}