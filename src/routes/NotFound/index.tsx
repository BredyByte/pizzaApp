import React from 'react';
import { useRouteError, useNavigate, Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
    const errorRes: any = useRouteError();
    console.log(errorRes)
    return (
        <div className={ styles.page }>
            <h2 className={ styles.title }>{errorRes.statusText}</h2>
            <p className={ styles.desc } >Unfortunately, this page was not found, or something is broken...😅</p>
            {
                errorRes.status === 404 && <Link className="btn" to="/">Go back</Link>
            }
        </div>
  )
}

export default NotFound;
