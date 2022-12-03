import styles from './ErrorPage.module.scss';
import { Link } from 'react-router-dom';

interface ErrorProps {
    title: string,
    message: string,
    backBtn?: boolean,
    img?: string
}

const ErrorPage = ({title, img, message, backBtn}:ErrorProps) => {
    console.log()
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
        <Link className="btn" to="/">
          Go back
        </Link>
      }
    </div>
  )
}

export default ErrorPage
