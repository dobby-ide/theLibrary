import React from 'react'
import { useState } from 'react'
import User from '../../model/user'
import { userLoginActions, userActions, currentUserActions } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import classes from './EntryForm.module.scss'
import { Link, useNavigate } from 'react-router-dom'
//to implement: logic to enable/disable the buttons
const EntryForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
  const [okRegistration, setOkRegistration] = useState(false)
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
  const registerNewUser = (event: any) => {
    event.preventDefault()
    if (user.Users.some((user) => user.email === email)) {
      setOkRegistration(false)
    } else {
      dispatch(userActions.addUser(new User(name!, surname!, email!)))
      setOkRegistration(true)
      navigate('/')
    }
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
        dispatch(
          currentUserActions.saveUser({
            name: user.Users[iterator].firstName,
            email: user.Users[iterator].email
          })
        )
        navigate('/user', { state: user.Users[iterator].firstName })
        console.log(loggedIn)
      }
    }
    //CREATES LOGIC TO CHECK IF name surname and email are inside the user
  }

  return (
    <>
      <div className={classes.userFormContainer}>
        <form className={classes.userForm}>
          <div className={classes.inputContainer}>
            <input
              placeholder="name"
              className={classes.input}
              type="text"
              onChange={nameInputChangeHandler}></input>
            <label className={classes.labelName}>name</label>
          </div>
          <div>
            <input
              placeholder="surname"
              className={classes.input}
              type="text"
              onChange={surnameInputChangeHandler}></input>
            <label className={classes.labelSurname}>surname</label>
          </div>
          <div>
            <input
              placeholder="e-mail"
              className={classes.input}
              type="text"
              onChange={emailInputChangeHandler}></input>
            <label className={classes.labelEmail}>e-mail</label>
          </div>
          <div className={classes.buttonContainer}>
            <Link to="/user" className={classes.signInButton}>
              <button onClick={signInHandler}>Sign-in</button>
            </Link>
            <button onClick={registerNewUser}>Register</button>
          </div>
          <div className="wasSuccessful">{okRegistration && <p>success</p>}</div>
        </form>
      </div>
    </>
  )
}

export default EntryForm
