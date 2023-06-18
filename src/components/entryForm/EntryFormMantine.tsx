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
import { useState } from 'react'
import axios from 'axios'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import User from '../../model/user'
import { fetchUsers } from '../../redux/slices/userSlice'
import { currentUserActions } from '../../redux/slices/currentUserSlice'
import { userActions } from '../../redux/slices/userSlice'
import { userLoginActions } from '../../redux/slices/userIsLoggedInSlice'
import url from '../../apiurl'
import classes from './style/EntryForm.module.scss'
import './style/ModalForm.scss'
import useForm from './hook/useForm'

export function AuthenticationTitle() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, handleChange, resetForm] = useForm({
    name: '',
    email: '',
    password: ''
  })
  const [isModalOn, setIsModalOn] = useState(false)
  const [okRegistration, setOkRegistration] = useState(false)
  const [emailAlreadyExist, setEmailAlreadyExist] = useState(false)
  const [switchForm, setRegisterNewUser] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      var session_url = `${url}/userLogin`
      var basicAuth = 'Basic ' + window.btoa(formData.email + ':' + formData.password)
      const response = await axios.post(session_url, null, {
        headers: {
          Authorization: basicAuth,
          'Content-Type': 'application/json'
        }
      })
      const { name, id, email, books } = response.data

      dispatch(userLoginActions.loginAccepted())

      dispatch(
        currentUserActions.saveUser({
          name,
          id,
          email,
          numberOfBooks: books
        })
      )

      dispatch(fetchUsers('api/v1/users'))

      navigate('/user', { state: id })
    } catch (err) {
      console.log(err)
    }
  }

  const handleRegistration = (event: any) => {
    event.preventDefault()
    const formDataSave = new URLSearchParams()
    formDataSave.append('username', formData.name)
    formDataSave.append('password', formData.password)
    formDataSave.append('email', formData.email)
    formDataSave.append('role', 'user')
    try {
      var session_url = `${url}/register`
      axios
        .post(session_url, formDataSave)
        .then(function (response) {
          console.log('registered to db')
          console.log(response.data)
          setIsModalOn(true)
          dispatch(
            userActions.addUser(
              new User(formData.name!, formData.lastName!, formData.email!, formData.password!)
            )
          )
          setOkRegistration(true)
        })
        .catch(function (error) {
          console.log(error)
          console.log('Error on Authentication')
        })
    } catch {}
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
          placeholder="name"
          required
          onChange={handleChange}
        />
        <TextInput
          label="Surname"
          name="lastName"
          value={formData.lastName}
          placeholder="last name"
          required
          onChange={handleChange}
        />
        {!emailAlreadyExist ? (
          <TextInput
            onFocus={() => setEmailAlreadyExist(false)}
            label="Email"
            name="email"
            value={formData.email}
            placeholder="email"
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
            placeholder="email"
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
