import Sort from '../components/Sort';
import Categories from '../components/Categories';
import Skeleton from '../components/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Search from '../components/Search';
import Pagination from '../components/Pagination';
import { useEffect, useState } from 'react';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'Popularity',
    sortProperty: 'rating'
  });
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);


  const categoriesArr = ["All","Meat","Vegetarian","Grill","Spicy","Closed"];
  const onClickCategory = (index) => {
    setCategoryId(index);
  }

  useEffect(() => {
    setIsloading(true);

    const sortBy = sortType.sortProperty.replace('-','');
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const search =  searchValue ? `&search=${searchValue}`: '';


    fetch(`https://637ce41a72f3ce38eab0b9e2.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`)
      .then(res => res.json())
      .then(res => {
        setItems(res);
        setIsloading(false);
      });
    window.scrollTo(0,0);
  }, [categoryId, sortType, searchValue, currentPage]);
  return (
    <>
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} categoriesArr={categoriesArr} />
        <Sort value={sortType} onChangeSort={setSortType} />
      </div>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <h2 className="content__title">{ categoriesArr[categoryId]}</h2>
      <div className="content__items">
        {
          isLoading
            ? [...new Array(6)].map((_,index) => <Skeleton key={index} />)
            : items.map(data => <PizzaBlock key={data.id} {...data} />)
        }
      </div>
      <Pagination onChangePage={setCurrentPage} />
    </>
  )
}

export default Home
