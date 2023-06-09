import fs14dataFlow from '../../../assets/images/fs14dataFlow.svg'
import classes from './ProjectResources.module.scss'
const ProjectResource = () => {
  const text = ''
  return (
    <section className={classes.projectRes_container}>
      <h3>The data journey for the project</h3>
      <div className={classes.flexContainer}>
        <div className={classes.flexContainer_right}>
          <img src={fs14dataFlow}></img>
        </div>
        <div className={classes.flexContainer_left}>
          <p>The app uses a small amount of mock data generated by javascript classes.</p>
          <p>
            Data travels through the application by being stored in central position through the
            redux store. Redux operates via "@reduxjs/toolkit"
          </p>
          <p>
            In combination with a good routing system ("React-router-dom 6") the data can travel
            safely via an Admin route or a user Route and cannot be accessed if user or Admin are
            not logged in
          </p>
          <p>User can borrow, browse (filter and search), return and view details of books.</p>
          <p>Admin can also create Books and Authors, as well as update or delete</p>
        </div>
      </div>
    </section>
  )
}
export default ProjectResource