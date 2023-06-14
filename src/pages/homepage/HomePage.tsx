// @ts-nocheck
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { useParams, useLocation } from 'react-router-dom'

import { RootState } from '../../store'
import UserPage from '../user/UserPage'
import classes from './style/Homepage.module.scss'
import { useState } from 'react'
import './style/Modal.css'

const HomePage = () => {
  const [showModal, setShowModal] = useState(false)
  const { state } = useLocation()
  const loggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
  const adminLoggedIn = useSelector((state: RootState) => state.adminLogin.isLoggedIn)
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  return (
    <section className={classes.homepage_container}>
      <div className={classes.homepage_right}>
        <h2 className="library-name">|| IALI Library || </h2>
        {state && <p>Successfully registered</p>}
        <button onClick={toggleModal}>here is your information</button>
        <CSSTransition in={showModal} timeout={3000} classNames="modal" active unmountOnExit>
          <div className="modal-container">
            <div>
              <div className="modal-content">name: {state.name}</div>
              <div className="modal-content">surname: {state.lastName}</div>
              <div className="modal-content">password: {state.password}</div>
              <div className="modal-content">{state.email}</div>
            </div>
            <button className="modal-closeButton" onClick={toggleModal}>
              Close Window
            </button>
          </div>
        </CSSTransition>
      </div>
      {loggedIn && <UserPage></UserPage>}
    </section>
  )
}
export default HomePage
