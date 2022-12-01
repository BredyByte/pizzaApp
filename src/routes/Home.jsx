import Sort, { sortList } from '../components/Sort'
import Categories from '../components/Categories';
import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import Search from '../components/Search';
import ErrorPage from '../components/ErrorPage';
import selectors from '../store/selectors';

import { useEffect, useRef, useState } from 'react'
import qs from 'qs';
import { setCategoryId, setPageCount, setFilters } from '../store/slices/filterSlice';
import { fetchPizzas } from '../store/slices/pizzaSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, searchValue, pageCount } = useSelector(selectors.filterSelector);
  const { items, status } = useSelector(selectors.pizzaSelector);

  const categoriesArr = ["All","Meat","Vegetarian","Grill","Spicy","Closed"];
  const onClickCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const pizzas = items.map(data => <PizzaBlock key={data.id} {...data} />);
  const skeletons = [...new Array(4)].map((_,index) => <Skeleton key={index}/>)

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-','');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search =  searchValue ? `&search=${searchValue}`: '';

    dispatch(fetchPizzas({
      sortBy,
      order,
      category,
      search,
      pageCount
    }));
    window.scrollTo(0,0);
  }

  useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        pageCount
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, pageCount]);

  useEffect(() => {
    if(location.search) {
      const params = qs.parse(location.searchsubstring(1));
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort
        })
      );
      isSearch.current = true
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0,0);
    if(!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, pageCount]);

  return (
    <>
      {
        status === "error"
          ? <ErrorPage
            title="Pizzas not found"
            message="Someone stole all our pizzas... Don't worry, we'll find the thief soon."
          />
          : <>
              <div className="content__top">
                <Categories categoryId={categoryId} onClickCategory={onClickCategory} categoriesArr={categoriesArr} />
                <Sort/>
                <Search />
              </div>
              <h2 className="content__title">{ categoriesArr[categoryId]}</h2>
              <div className="content__items">
                {
                  (status === 'loading')
                    ? skeletons
                    : pizzas
                }
              </div>
              <Pagination onChangePage={setPageCount} dispatch={dispatch} currentPage={pageCount} />
            </>
      }
    </>

  )
}

export default Home
