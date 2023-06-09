import { Link } from 'react-router-dom'

import classes from './style/Footer.module.scss'
import brain from '../../assets/images/brain.svg'

const Footer = () => {
  return (
    <footer className={classes.footerContainer}>
      <div>
        <nav>
          <ul className={classes.navigation}>
            <li>
              <Link to="/projectResources">
                <div className={classes.li_img}>
                  developed with
                  <img className={classes.brain} src={brain}></img>
                </div>
              </Link>
            </li>
            <li>
              <Link to="/projectResources">
                <div className={classes.li}>project info</div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
export default Footer
