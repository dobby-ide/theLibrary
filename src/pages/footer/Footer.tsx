import { Link } from 'react-router-dom'
import classes from './Footer.module.scss'
const Footer = () => {
  return (
    <footer className={classes.footerContainer}>
      <div>
        <nav>
          <ul className={classes.navigation}>
            <li>
              <Link to="projectResources">developed with love</Link>
            </li>
            <li>
              <Link to="projectResources">project info</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
export default Footer
