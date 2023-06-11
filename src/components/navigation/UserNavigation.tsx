// @ts-nocheck
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { currentUserActions } from '../../redux/slices/currentUserSlice'
import { userLoginActions } from '../../redux/slices/userIsLoggedInSlice'
import { RootState } from '../../store'
import classes from './style/UserNavigation.module.scss'
import logo from '../../assets/images/svg_bookshelf.svg'
import { useEffect } from 'react'
import { fetchUsers } from '../../redux/slices/userSlice'

const UserNavigation = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUsers('users'))
  }, [dispatch])
  const email = useSelector((state: RootState) => state.currentUser.currentUserEmail)
  const userName = useSelector((state: RootState) => state.currentUser.currentUserName)
  // const users = useSelector((state: RootState) => state.user.Users)
  // const fullUser = useSelector((state: RootState) =>
  //   state.user.Users.filter((currUser) => String(currUser.email) === email)
  // )

  const numberOfBooks = useSelector((state: RootState) => state.currentUser.currentUserBooks)
  const navigate = useNavigate()
  console.log(numberOfBooks)
  const backToMainPage = () => {
    //to fix issue with login still valid
    dispatch(currentUserActions.logout())
    dispatch(userLoginActions.loginAccepted())
    navigate('/userlogin')
  }
  return (
    <header className={classes.header_main}>
      <div className={classes.comboLogoText}>
        <div className={classes.imageContainer}>
          <img className={classes.logo} src={logo}></img>
        </div>
        <div className={classes.logotext}>
          <h3>|IALI|</h3>
          <div className={classes.logoSubText}>
            <p>Integrify</p>
            <p>Academy</p> <p>LIbrary</p>
          </div>
        </div>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <button onClick={backToMainPage}>LogOut {userName}</button>
          </li>
          <li>
            <Link to="/user/return">return</Link>
          </li>
          <li>
            <Link to="/user/search">search</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default UserNavigation
