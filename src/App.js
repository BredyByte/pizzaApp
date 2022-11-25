import { Outlet } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import { useState } from 'react';
import { useOutletContext  } from 'react-router-dom';


function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Outlet context={[searchValue, setSearchValue]}/>
        </div>
      </div>
    </div>
  );
}

export default App;
