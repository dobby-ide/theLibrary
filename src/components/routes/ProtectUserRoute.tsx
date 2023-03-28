import { Navigate } from 'react-router-dom'

function ProtectedU({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />
  }
  return children
}
export default ProtectedU
