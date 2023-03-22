import React from 'react'
import { useState } from 'react'
import { userLoginActions } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import classes from './EntryForm.module.scss'
import { Link, useNavigate } from 'react-router-dom'
//to implement: logic to enable/disable the buttons
const EntryForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
  const [name, setName] = useState()
  const [surname, setSurname] = useState()
  const [email, setEmail] = useState()
  const user = useSelector((state: RootState) => state.user)

  const nameInputChangeHandler = (e: { target: { value: any } }) => {
    setName(e.target.value)
  }
  const surnameInputChangeHandler = (e: { target: { value: any } }) => {
    setSurname(e.target.value)
  }
  const emailInputChangeHandler = (e: { target: { value: any } }) => {
    setEmail(e.target.value)
  }
  const signInHandler = (event: any) => {
    event.preventDefault()

    for (let iterator in user.Users) {
      if (
        user.Users[iterator].firstName === name &&
        user.Users[iterator].lastName === surname &&
        user.Users[iterator].email === email
      ) {
        console.log('loggedin')
        dispatch(userLoginActions.loginAccepted())
        navigate('/user')
        console.log(loggedIn)
      }
    }
    //CREATES LOGIC TO CHECK IF name surname and email are inside the user
  }
  console.log(loggedIn)
  return (
    <>
      <div className="form">
        <form>
          <div>
            <label>name</label>
            <input type="text" onChange={nameInputChangeHandler}></input>
          </div>
          <div>
            <label>surname</label>
            <input type="text" onChange={surnameInputChangeHandler}></input>
          </div>
          <div>
            <label>email</label>
            <input type="text" onChange={emailInputChangeHandler}></input>
          </div>
          <div>
            <Link to="/user" className={classes.signInButton}>
              <button onClick={signInHandler}>Sign-in</button>
            </Link>
            <button>Register</button>
          </div>
        </form>
      </div>
    </>
  )
}
export default EntryForm
