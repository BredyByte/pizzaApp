import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface PaginationProps {
    onChangePage: any,
    dispatch: any,
    currentPage: number
}

const Pagination = ({onChangePage, dispatch, currentPage}: PaginationProps) => {
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
