import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { userActions } from '../../store'
import User from '../../model/user'
import { userLoginActions } from '../../store'
import { currentUserActions } from '../../store'
import { signInWithGoogle } from '../../firebase_setup/firebase'
import classes from './styling/MainNavigation.module.scss'
import logo from '../../assets/images/svg_bookshelf.svg'

const MainNavigation = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authenticate = async () => {
    const google = await signInWithGoogle().then((result) => result.user)

    dispatch(userActions.addUser(new User(google.displayName!, google.displayName!, google.email!)))
    dispatch(userLoginActions.loginAccepted())
    dispatch(
      currentUserActions.saveUser({
        name: google.displayName,
        email: google.email
      })
    )
    navigate('/user', { state: google.displayName })
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
        <ul className={classes.ul}>
          <li>
            <Link to="/adminlogin">
              admin <span>login</span>
            </Link>
          </li>
          <li>
            <Link to="/userlogin">
              user <span>login</span>
            </Link>
          </li>
          <li>
            <Link to="/browsebook">browse books</Link>
          </li>
          <li>
            <Link to="/browsebook">
              <button onClick={authenticate}>SIGN IN WITH GOOGLE</button>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default MainNavigation
