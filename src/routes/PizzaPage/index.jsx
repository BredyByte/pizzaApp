import styles from './PizzaPage.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';

const PizzaPage = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const fetchData = async () => {
    try {
      const res = await axios.get(`https://637ce41a72f3ce38eab0b9e2.mockapi.io/items/${id}`);
      setData(res.data);
    } catch(e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h3>{data.name}</h3>
      <img src={data.imageUrl} alt=""/>
    </div>
  )
}

export default PizzaPage
