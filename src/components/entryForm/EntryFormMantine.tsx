// @ts-nocheck
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button
} from '@mantine/core'
import { CSSTransition } from 'react-transition-group'
import { useState, useEffect } from 'react'
import axios from 'axios'

import useForm from './hook/useForm'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import User from '../../model/user'
import { fetchUsers } from '../../redux/slices/userSlice'
import { currentUserActions } from '../../redux/slices/currentUserSlice'
import { userActions } from '../../redux/slices/userSlice'
import { userLoginActions } from '../../redux/slices/userIsLoggedInSlice'
import { RootState } from '../../store'
import classes from './style/EntryForm.module.scss'
import './style/ModalForm.scss'

export function AuthenticationTitle() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, handleChange, resetForm] = useForm({
    name: '',
    email: '',
    password: ''
  })
  const loggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
  const [isModalOn, setIsModalOn] = useState(false)
  const [okRegistration, setOkRegistration] = useState(false)
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false)
  const [switchForm, setRegisterNewUser] = useState(false)
  const users = useSelector((state: RootState) => state.user.Users)
  const fullUser = useSelector((state: RootState) =>
    state.user.Users.filter((currUser) => String(currUser.email) === formData.email)
  )

  // useEffect(() => {
  //   dispatch(fetchUsers('users'))
  // }, [dispatch])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('inside handleSubmit--FOR LOGGING-EntryFormMantine')

    try {
      var session_url = 'http://127.0.0.1:8080/userLogin'

      var basicAuth = 'Basic ' + window.btoa(formData.email + ':' + formData.password)
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
          dispatch(fetchUsers('users'))
          dispatch(userLoginActions.loginAccepted())
          dispatch(
            currentUserActions.saveUser({
              name: fullUser[0].name,
              id: fullUser[0].id,
              email: fullUser[0].email,
              numberOfBooks: fullUser[0].books
            })
          )
          navigate('/user', { state: fullUser[0].id })
        })

        .catch(function (error) {
          console.log(error)
          console.log('Error on Authentication')
        })
    } catch (err) {
      console.log(err)
    }
    // for (let iterator in user.Users) {
    //   console.log(user.Users[iterator])
    //   if (
    //     user.Users[iterator].name === formData.name &&
    //     user.Users[iterator].email === formData.email &&
    //     user.Users[iterator].password === formData.password
    //   ) {
    //     console.log('loggedin')
    //     dispatch(userLoginActions.loginAccepted())
    //     dispatch(
    //       currentUserActions.saveUser({
    //         name: user.Users[iterator].name,
    //         email: user.Users[iterator].email,
    //         id: user.Users[iterator].id,
    //         numberOfBooks: user.Users[iterator].books
    //       })
    //     )
    //     navigate('/user', { state: user.Users[iterator].name })
    //     console.log(loggedIn)
    //   }
    // }
    //CREATES LOGIC TO CHECK IF name surname and email are inside the user
    console.log(fullUser)
  }

  const handleRegistration = (event: any) => {
    event.preventDefault()
    if (user.Users.some((user) => user.email === formData.email)) {
      setOkRegistration(false)
      setEmailAlreadyExist(true)
    } else {
      dispatch(
        userActions.addUser(
          new User(formData.name!, formData.lastName!, formData.email!, formData.password!)
        )
      )
      setOkRegistration(true)
      setIsModalOn(true)
    }
  }
  const toggleModal = () => {
    setIsModalOn(!isModalOn)
    setOkRegistration(!okRegistration)
    setTimeout(() => {
      navigate(`/:${formData.name}`, {
        state: {
          name: formData.name!,
          lastName: formData.lastName!,
          email: formData.email!,
          password: formData.password!
        }
      })
    }, 2000)
  }
  const signInHandler = (event: any) => {
    event.preventDefault()
  }
  const createAccount = () => {
    setRegisterNewUser(!switchForm)
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
        {!switchForm ? `Please login` : `Please Register`}
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?
        {!switchForm ? (
          <Anchor size="sm" component="button" onClick={createAccount}>
            Create account
          </Anchor>
        ) : (
          <Anchor size="sm" component="button" onClick={createAccount}>
            login?
          </Anchor>
        )}
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          label="Name"
          name="name"
          value={formData.name}
          placeholder="you@mantine.dev"
          required
          onChange={handleChange}
        />
        <TextInput
          label="Surname"
          name="lastName"
          value={formData.lastName}
          placeholder="you@mantine.dev"
          required
          onChange={handleChange}
        />
        {!emailAlreadyExist ? (
          <TextInput
            onFocus={() => setEmailAlreadyExist(false)}
            label="Email"
            name="email"
            value={formData.email}
            placeholder="you@mantine.dev"
            required
            onChange={handleChange}
          />
        ) : (
          <TextInput
            className={classes.emailAlreadyExist}
            onFocus={() => setEmailAlreadyExist(false)}
            label="Email already exist"
            name="email"
            value={formData.email}
            placeholder="you@mantine.dev"
            required
            onChange={handleChange}
          />
        )}

        <PasswordInput
          label="Password"
          placeholder="Your password"
          name="password"
          value={formData.password}
          required
          mt="md"
          onChange={handleChange}
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        {!switchForm ? (
          <Button
            onClick={handleSubmit}
            color="red"
            variant="light"
            fullWidth
            mt="xl"
            type="submit">
            Sign in
          </Button>
        ) : (
          <Button
            color="dark"
            variant="light"
            fullWidth
            mt="xl"
            type="submit"
            onClick={handleRegistration}>
            Register
          </Button>
        )}
      </Paper>
      <CSSTransition in={isModalOn} timeout={3000} classNames="modalF" active unmountOnExit>
        <div className="modalF-container">
          <div className="modalF-content">
            <h2 className="modalF-content__title">SUCCESSFULLY REGISTERED</h2>
            <div className="modalF-content__name"> {formData.name}</div>
            <div className="modalF-content__lastName"> {formData.lastName}</div>
            <div className="modalF-content__email">{formData.email}</div>
          </div>
          <button className="modalF-container_button" onClick={toggleModal}>
            x
          </button>
        </div>
      </CSSTransition>
    </Container>
  )
}
export default AuthenticationTitle
