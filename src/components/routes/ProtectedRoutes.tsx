import { Navigate } from 'react-router-dom'

function Protected(props: { isSignedIn: string; children: HTMLCollection }) {
  if (!props.isSignedIn) {
    return <Navigate to="/" replace />
  }
  return props.children
}
export default Protected
