import { Navigate } from 'react-router-dom'

function ProtectedU(props: { isSignedIn: string; children: HTMLCollection }) {
  if (!props.isSignedIn) {
    return <Navigate to="/" replace />
  }
  return props.children
}
export default ProtectedU
