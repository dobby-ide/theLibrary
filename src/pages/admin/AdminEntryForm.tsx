import React from 'react'
import { RootState } from '../../store'
import { adminLoginActions } from '../../store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const AdminEntryForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [id, setId] = useState()
  const idHandler = (e: { target: { value: any } }) => {
    setId(e.target.value)
  }
  const signInHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (id === '112233') {
      dispatch(adminLoginActions.loginAccepted())
      navigate('/admin')
    } else {
    }
  }
  return (
    <>
      <div className="form">
        <form>
          <div>
            <label>id</label>
            <input type="text" onChange={idHandler}></input>
          </div>
          <div>
            <button onClick={signInHandler}>Sign-in</button>
            <button>Register</button>
          </div>
        </form>
      </div>
    </>
  )
}
export default AdminEntryForm
