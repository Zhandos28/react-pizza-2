import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Sort, { varieties } from '../components/Sort';
import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMount = React.useRef(false);

  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);
  const { searchValue } = React.useContext(SearchContext);

  const getPizzas = () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `&category=${categoryId}` : '';
    const sortBy = sortType.sortProperty;

    dispatch(fetchPizzas({ search, category, sortBy, currentPage }));

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = varieties.find((item) => item.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (isMount.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMount.current = true;
  }, [categoryId, sortType.sortProperty, currentPage]);

  React.useEffect(() => {
    // if (!isSearch.current) {
    getPizzas();
    // }

    // isSearch.current = false;
  }, [categoryId, sortType.sortProperty, searchValue, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            К сожелению, не удалось загрузить пиццы <icon>😕</icon>
          </h2>
          <p>Повторите попытку по позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => {
                return <Skeleton key={index} />;
              })
            : items && items.map((item) => <PizzaBlock key={item.id} {...item} />)}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => dispatch(setCurrentPage(number))}
      />
    </div>
  );
}

export default Home;
