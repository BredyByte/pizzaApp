import React from 'react'
import { useRouteError } from 'react-router-dom';
import styles from './NotFound.module.scss';



const NotFound = () => {
  const error = useRouteError();
  return (
    <div className={ styles.page }>
      <h1>Not Found</h1>
      <p className={ styles.desc } >Unfortunately, this page was not found, or something is broken...😅</p>
    </div>
  )
}

export default NotFound;
