import Sort, { sortList } from '../components/Sort'
import Categories from '../components/Categories';
import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

import { useEffect, useRef, useState } from 'react'
import qs from 'qs';
import { setCategoryId, setPageCount, setFilters } from '../store/slices/filterSlice';
import { fetchPizzas } from '../store/slices/pizzaSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, searchValue, pageCount } = useSelector(state => state.filter);
  const { items, status } = useSelector(state => state.pizza);

  const categoriesArr = ["All","Meat","Vegetarian","Grill","Spicy","Closed"];
  const onClickCategory = (index) => {
    dispatch(setCategoryId(index));
  };

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
    if(window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
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

  const pizzas = items.map(data => <PizzaBlock key={data.id} {...data} />);
  const skeletons = [...new Array(6)].map((_,index) => <Skeleton key={index}/>)

  return (
    <>
      {
        status === "error"
          ? <div><h1>Error</h1></div>
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
