import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = React.useState({
    imageUrl: '',
    title: '',
    price: '',
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizzaById() {
      try {
        const { data } = await axios.get('https://642faaf0b289b1dec4b740b4.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка при получение пиццы');
        navigate('/');
      }
    }
    fetchPizzaById();
  }, []);

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
}

export default FullPizza;
