import React from 'react'
import { useRouteError } from 'react-router-dom';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={ styles.page }>
        <h2 className={ styles.title }>Not Found</h2>
        <p className={ styles.desc } >Unfortunately, this page was not found, or something is broken...😅</p>
    </div>
  )
}

export default NotFound;
