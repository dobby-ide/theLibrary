import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { useParams, useLocation } from 'react-router-dom'

import { RootState } from '../../store'
import UserPage from '../user/UserPage'
import classes from './Homepage.module.scss'
import { useState } from 'react'
import './Modal.css'

const HomePage = () => {
  const [showModal, setShowModal] = useState(true)
  const { state } = useLocation()
  const loggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
  const adminLoggedIn = useSelector((state: RootState) => state.adminLogin.isLoggedIn)
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  return (
    <section className={classes.homepage_container}>
      <div className={classes.homepage_right}>
        <h2>Library management system</h2>
        {state && <p>Successfully registered</p>}
        <button onClick={toggleModal}>your informations</button>
        <CSSTransition in={showModal} timeout={3000} classNames="modal" active unmountOnExit>
          <div className="modal-container">
            <div>
              <div className="modal-content">NAME: {state.name}</div>
              <div className="modal-content">SURNAME: {state.lastName}</div>
              <div className="modal-content">PASSWORD: {state.password}</div>
              <div className="modal-content">{state.email}</div>
            </div>
            <button onClick={toggleModal}>Close Modal</button>
          </div>
        </CSSTransition>
      </div>
      {loggedIn && <UserPage></UserPage>}
    </section>
  )
}
export default HomePage
