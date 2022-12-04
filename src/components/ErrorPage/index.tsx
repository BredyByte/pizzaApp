import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorPage.module.scss';

type ErrorPageProps = {
    title: string,
    message: string,
    backBtn?: boolean,
    img?: string
}

const ErrorPage: React.FC<ErrorPageProps> = ({title, img, message, backBtn}) => {
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
