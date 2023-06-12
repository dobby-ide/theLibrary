// @ts-nocheck
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

import { adminLoginActions } from '../../redux/slices/adminLoginSlice'
import classes from './style/AdminEntryForm.module.scss'
axios.defaults.withCredentials = true

const AdminEntryForm = () => {
  const [register, setRegister] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()

  const userNameHandler = (e: { target: { value: any } }) => {
    setUserName(e.target.value)
  }
  const passwordHandler = (e: { target: { value: any } }) => {
    setPassword(e.target.value)
  }
  const emailHandler = (e) => {
    setEmail(e.target.value)
  }

  const registerHandler = async (e: { preventDefault: () => void }) => {
    console.log('register..maybe??')
    e.preventDefault()
    const formData = new URLSearchParams()
    formData.append('username', userName)
    formData.append('password', password)
    formData.append('email', email)
    formData.append('role', 'admin')
    try {
      var session_url = `http://10.0.0.142:8080/register`
      axios
        .post(session_url, formData)
        .then(function (response) {
          console.log('registered to db')
          console.log(response.data)
          // if (id === '112233') {
          //   dispatch(adminLoginActions.loginAccepted())
          //   navigate('/admin')
          // }
        })
        .catch(function (error) {
          console.log(error)
          console.log('Error on Authentication')
        })
    } catch {}
  }

  const loginHandler = async (e: { preventDefault: () => void }) => {
    console.log('signing in..maybe??')
    e.preventDefault()

    try {
      var session_url = `http://10.0.0.142:8080/userLogin`

      var basicAuth = 'Basic ' + window.btoa(userName + ':' + password)
      // var basicAuth = 'Basic ' + window.btoa(username + ':' + password)
      // console.log(basicAuth)
      axios
        .post(session_url, null, {
          headers: {
            Authorization: basicAuth,
            'Content-Type': 'application/json'
          }
        })
        .then(function (response) {
          console.log('Authenticated')
          console.log(response.data)
          console.log(response)
          // if (id === '112233') {
          dispatch(adminLoginActions.loginAccepted())
          navigate('/admin')
          // }
        })
        .catch(function (error) {
          console.log(error)
          console.log('Error on Authentication')
        })
    } catch {}
  }

  return (
    <>
      <div className={classes.adminFormContainer}>
        <button onClick={() => setRegister(true)}>Register</button> or{' '}
        <button onClick={() => setRegister(false)}>Login</button>
        {register ? (
          <form className={classes.adminForm}>
            <div className={classes.inputContainer}>
              <input
                type="text"
                className={classes.input}
                onChange={userNameHandler}
                placeholder="name"></input>
              <label id="lab" className={classes.label}>
                name
              </label>
              <input
                type="text"
                className={classes.input}
                onChange={emailHandler}
                placeholder="email"></input>
              <label id="lab" className={classes.label}>
                email
              </label>
              <input
                type="text"
                className={classes.input}
                onChange={passwordHandler}
                placeholder="password"></input>
              <label id="lab" className={classes.label}>
                password
              </label>
            </div>
            <div className={classes.buttonsContainer}>
              <button className={classes.signinButton} onClick={registerHandler}>
                register
              </button>
            </div>
          </form>
        ) : (
          <form className={classes.adminForm}>
            <div className={classes.inputContainer}>
              <input
                type="text"
                className={classes.input}
                onChange={userNameHandler}
                placeholder="name"></input>
              <label id="lab" className={classes.label}>
                name
              </label>
              <input
                type="text"
                className={classes.input}
                onChange={passwordHandler}
                placeholder="password"></input>
              <label id="lab" className={classes.label}>
                password
              </label>
            </div>
            <div className={classes.buttonsContainer}>
              <button className={classes.signinButton} onClick={loginHandler}>
                login
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  )
}
export default AdminEntryForm
