import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { adminLoginActions } from '../../store'
import classes from './styling/AdminNavigation.module.scss'
import logo from '../../assets/images/svg_bookshelf.svg'

const AdminNavigation = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const backToMainPage = () => {
    dispatch(adminLoginActions.loginAccepted())
    navigate('/')
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
            <button onClick={backToMainPage}>LogOut</button>
          </li>
          <li>
            <Link to="/admin/books">BOOKS</Link>
          </li>
          <li>
            <Link to="/admin/authors">AUTHORS</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default AdminNavigation
