import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const PizzaPage: React.FC = () => {
  const [data, setData] = useState<{
    imageUrl: string,
    price: number,
    name: string
  }>();

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

  if(!data) {
    return (
      <h3>Loading...</h3>
    )
  }
  return (
    <div>
      <h3>{data.name}</h3>
      <img src={data.imageUrl} alt=""/>
      <p>{data.price}</p>
    </div>
  )
}

export default PizzaPage
