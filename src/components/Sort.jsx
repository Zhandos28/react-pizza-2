import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSortType } from '../redux/slices/filterSlice';

export const varieties = [
  { name: 'популярности', sortProperty: 'rating' },
  { name: 'цене', sortProperty: 'price' },
  { name: 'алфавиту', sortProperty: 'title' },
];

function Sort({ value, onClickSortType }) {
  const sort = useSelector((state) => state.filter.sortType);
  const dispatch = useDispatch();
  const sortRef = React.useRef();

  const [isVisible, setIsVisible] = React.useState(false);

  const chooseVariety = (value) => {
    dispatch(setSortType(value));
    setIsVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      const path = event.path || (event.composedPath && event.composedPath());
      if (!path.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        {isVisible ? (
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 1C10 0.830729 9.93815 0.684245 9.81445 0.560547C9.69075 0.436849 9.54427 0.375 9.375 0.375H0.625C0.455729 0.375 0.309245 0.436849 0.185547 0.560547C0.061849 0.684245 0 0.830729 0 1C0 1.16927 0.061849 1.31576 0.185547 1.43945L4.56055 5.81445C4.68424 5.93815 4.83073 6 5 6C5.16927 6 5.31576 5.93815 5.43945 5.81445L9.81445 1.43945C9.93815 1.31576 10 1.16927 10 1Z"
              fill="#2C2C2C"
            />
          </svg>
        ) : (
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
        )}
        <b>Сортировка по:</b>
        <span onClick={() => setIsVisible(!isVisible)}>{sort.name}</span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {varieties.map((obj, index) => {
              return (
                <li
                  key={index}
                  onClick={() => chooseVariety(obj)}
                  className={sort.sortProperty === obj.sortProperty ? 'active' : ''}>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
