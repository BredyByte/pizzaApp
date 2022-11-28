import { Outlet } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const store = useSelector(store => store);
  window.store = store;
  return (
    <div className="wrapper">
      <Header/>
      <div className="content">
        <div className="container">
          <Outlet context={[searchValue, setSearchValue]}/>
        </div>
      </div>
    </div>
  );
}

export default App;
