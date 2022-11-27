import Sort from '../components/Sort';
import Categories from '../components/Categories';
import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import Search from '../components/Search';

import { useEffect, useState } from 'react';
import { setCategoryId, setPageCount } from '../store/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, searchValue, pageCount } = useSelector(state => state.filter);
  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);


  const categoriesArr = ["All","Meat","Vegetarian","Grill","Spicy","Closed"];
  const onClickCategory = (index) => {
    dispatch(setCategoryId(index));
  }

  useEffect(() => {
    setIsloading(true);

    const sortBy = sort.sortProperty.replace('-','');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search =  searchValue ? `&search=${searchValue}`: '';

    axios.get(`https://637ce41a72f3ce38eab0b9e2.mockapi.io/items?page=${pageCount}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => {
        setItems(res.data);
        setIsloading(false);
      })
    window.scrollTo(0,0);
  }, [categoryId, sort, searchValue, pageCount]);
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
            ? [...new Array(6)].map((_,index) => <Skeleton key={index} />)
            : items.map(data => <PizzaBlock key={data.id} {...data} />)
        }
      </div>
      <Pagination onChangePage={setPageCount} dispatch={dispatch} currentPage={pageCount} />
    </>
  )
}

export default Home
