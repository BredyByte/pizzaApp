import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { Skeleton, PizzaBlock, Pagination, Search, ErrorPage, Categories, Sort, sortList } from '../../components';
import selectors from '../../store/selectors';
import { setCategoryId, setPageCount, setFilters } from '../../store/filter/slice';
import { fetchPizzas } from '../../store/pizza/slice';
import {useAppDispatch} from "../../store/store";

type StructureItem = {
  id: number,
  imageUrl: string,
  name: string
}
type PizzaItems = {
  id: string,
  imageUrl: string,
  name: string,
  types: number[],
  sizes: number[],
  price: number,
  rating: number,
  description: string,
  structure: StructureItem[]
}


const categoriesArr = ["All","Meat","Vegetarian","Grill","Spicy","Closed"];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, searchValue, pageCount } = useSelector(selectors.filterSelector);
  const { items, status } = useSelector(selectors.pizzaSelector);

  React.useCallback((id:number) => {
    dispatch(setCategoryId(id));
  }, [])

  const onClickCategory =   React.useCallback((id:number) => {
    dispatch(setCategoryId(id));
  }, [])

  const pizzas = items.map((data:any)=> <PizzaBlock key={data.id} {...data} />);
  const skeletons = [...new Array(4)].map((_,index) => <Skeleton key={index}/>)

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-','');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = Number(categoryId) > 0 ? `&category=${categoryId}` : '';
    const search =  searchValue ? `&search=${searchValue}`: '';

    dispatch(
        fetchPizzas({
          sortBy,
          order,
          category,
          search,
          pageCount
        })
    );
    window.scrollTo(0,0);
  }

  React.useEffect(() => {
    if(isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        pageCount
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, pageCount, navigate]);

  React.useEffect(() => {
    if(location.search) {
      const params = qs.parse(location.search.substring(1));
      const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);
      dispatch(
          setFilters({
            ...params,
            // @ts-ignore
            sort
          })
      );

      isSearch.current = true
    }
  }, [dispatch]);

  React.useEffect(() => {
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
                <Categories categoryId={Number(categoryId)} onClickCategory={onClickCategory}/>
                <Sort sort={sort}/>
                <Search />
              </div>
              <h2 className="content__title">{ categoriesArr[Number(categoryId)]}</h2>
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
