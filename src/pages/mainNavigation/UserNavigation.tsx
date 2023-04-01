import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { userLoginActions, currentUserActions, RootState } from '../../store'
import classes from './styling/UserNavigation.module.scss'
import logo from '../../assets/images/svg_bookshelf.svg'

const UserNavigation = () => {
  const userName = useSelector((state: RootState) => state.currentUser.currentUserName)
  const location = useLocation()
  let user = location.state
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
