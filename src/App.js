import { Outlet } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import { useState } from 'react';

function App() {
  const [searchValue, setSearchValue] = useState('');
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
