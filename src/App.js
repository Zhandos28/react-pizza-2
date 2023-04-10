import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';
import Home from './pages/Home';
import Cart from './pages/Cart';

import './scss/app.scss';

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
