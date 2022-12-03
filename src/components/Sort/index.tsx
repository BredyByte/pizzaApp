import { useEffect, useRef, useState } from 'react'
import { setSort } from '../../store/slices/filterSlice';
import selectors from '../../store/selectors';
import { useSelector, useDispatch } from 'react-redux';

type SortItem = {
  name: string;
  sortProperty: string;
}

export const sortList: SortItem[] = [
  { name: 'Popularity (DESC)', sortProperty: 'rating' },
  { name: 'Popularity (ACS)', sortProperty: '-rating' },
  { name: 'Price (DESC)', sortProperty: 'price' },
  { name: 'Price (ACS)', sortProperty: '-price' },
  { name: 'Alphabetical (DESC)', sortProperty: 'title' },
  { name: 'Alphabetical (ACS)', sortProperty: '-title' },
];

const Sort = () => {
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);
  const { sort } = useSelector(selectors.filterSelector);
  const [open, setOpen] = useState(false);
  const sortName = sort.name;

  const onClickListItem = (i:SortItem) => {
    dispatch(setSort(i))
    setOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!e.path.includes(sortRef.current)) {
        setOpen(false);
      }
    }

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
      <div ref={sortRef} className="sort">
      <div className="sort__label" onClick={() => setOpen(!open)}>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Sorted by:</b>
        <span>{sortName}</span>
      </div>
      {
        open &&
        <div className="sort__popup">
          <ul>
            {
              sortList.map((obj, i) => (
                <li
                  key={i}
                  onClick={() => onClickListItem(obj)}
                  className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                >
                  {obj.name}
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  );
}

export default Sort;