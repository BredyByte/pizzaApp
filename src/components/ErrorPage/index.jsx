import styles from './ErrorPage.module.scss';
import { Link } from 'react-router-dom';
const ErrorPage = ({ title, message, backBtn, img }) => {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{ title }<span>☹️</span> </h2>
      <p className={styles.message}>{ message }</p>
      {
        img &&
        <img className={styles.img} src={img} alt="The Cart is Empty"/>
      }
      {
        backBtn &&
        <Link className={`${styles.btn} button`} to="/">
          <span>Go back</span>
        </Link>
      }
    </div>
  )
}

export default ErrorPage
