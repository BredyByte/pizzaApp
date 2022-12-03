import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationProps = {
    onChangePage: (page: number) => void,
    dispatch: any,
    currentPage: number
}

const Pagination: React.FC<PaginationProps> = ({onChangePage, dispatch, currentPage}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => dispatch(onChangePage(e.selected + 1))}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
        />
    )
}

export default Pagination;
