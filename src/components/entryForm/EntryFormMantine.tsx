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
import { useState } from 'react'

import useForm from './hook/useForm'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import User from '../../model/user'
import { currentUserActions, RootState, userActions, userLoginActions } from '../../store'
import classes from './EntryForm.module.scss'
import './Modal.css'

export function AuthenticationTitle() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
  const [isModalOn, setIsModalOn] = useState(false)
  const [okRegistration, setOkRegistration] = useState(false)
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false)
  const [switchForm, setRegisterNewUser] = useState(false)
  const user = useSelector((state: RootState) => state.user)

  const [formData, handleChange, resetForm] = useForm({
    name: '',
    lastName: '',
    email: '',
    password: ''
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    for (let iterator in user.Users) {
      console.log(user.Users[iterator])
      if (
        user.Users[iterator].firstName === formData.name &&
        user.Users[iterator].lastName === formData.lastName &&
        user.Users[iterator].password === formData.password
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

      setTimeout(
        () =>
          navigate(`/:${formData.name}`, {
            state: {
              name: formData.name!,
              lastName: formData.lastName!,
              email: formData.email!,
              password: formData.password!
            }
          }),
        2000
      )
    }
  }
  const toggleModal = () => {
    setIsModalOn(!isModalOn)
    setOkRegistration(!okRegistration)
    navigate(`/:${formData.name}`, {
      state: {
        name: formData.name!,
        lastName: formData.lastName!,
        email: formData.email!,
        password: formData.password!
      }
    })
  }
  const signInHandler = (event: any) => {
    event.preventDefault()
  }
  const createAccount = () => {
    setRegisterNewUser(!switchForm)
  }
  console.log(formData)
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
      <CSSTransition in={isModalOn} timeout={3000} classNames="modal" active unmountOnExit>
        <div className="modal-container">
          <div className="modal-content">
            <h2>SUCCESSFULLY REGISTERED</h2>
            <div className="modal-content__name">NAME: {formData.name}</div>
            <div className="modal-content__lastName">LASTNAME: {formData.lastName}</div>
            <div className="modal-content__email">EMAIL: {formData.email}</div>
          </div>
          <button className="modal-container_button" onClick={toggleModal}>
            x
          </button>
        </div>
      </CSSTransition>
    </Container>
  )
}
export default AuthenticationTitle
