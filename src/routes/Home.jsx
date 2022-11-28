import Sort, { sortList } from '../components/Sort'
import Categories from '../components/Categories';
import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

import { useEffect, useRef, useState } from 'react'
import qs from 'qs';
import { setCategoryId, setPageCount, setFilters } from '../store/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, searchValue, pageCount } = useSelector(state => state.filter);

  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const categoriesArr = ["All","Meat","Vegetarian","Grill","Spicy","Closed"];
  const onClickCategory = (index) => {
    dispatch(setCategoryId(index));
  };

  const fetchPiazzas = () => {
    setIsloading(true);

    const sortBy = sort.sortProperty.replace('-','');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search =  searchValue ? `&search=${searchValue}`: '';

    axios.get(`https://637ce41a72f3ce38eab0b9e2.mockapi.io/items?page=${pageCount}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => {
        setItems(res.data);
        setIsloading(false);
      });
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
      fetchPiazzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, pageCount]);

  const pizzas = items.map(data => <PizzaBlock key={data.id} {...data} />);
  const skeletons = [...new Array(6)].map((_,index) => <Skeleton key={index}/>)

  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} categoriesArr={categoriesArr} />
        <Sort/>
        <Search />
      </div>
      <h2 className="content__title">{ categoriesArr[categoryId]}</h2>
      <div className="content__items">
        {
          isLoading
            ? skeletons
            : pizzas
        }
      </div>
      <Pagination onChangePage={setPageCount} dispatch={dispatch} currentPage={pageCount} />
    </>
  )
}

export default Home
