import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { adminLoginActions } from '../../store'
import classes from '../admin/styling/AdminEntryForm.module.scss'

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
    }
  }

  return (
    <>
      <div className={classes.adminFormContainer}>
        <form className={classes.adminForm}>
          <div className={classes.inputContainer}>
            <input
              type="text"
              className={classes.input}
              onChange={idHandler}
              placeholder="admin ID:"></input>
            <label id="lab" className={classes.label}>
              admin ID:
            </label>
          </div>
          <div className={classes.buttonsContainer}>
            <button className={classes.signinButton} onClick={signInHandler}>
              Sign-in
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
export default AdminEntryForm
