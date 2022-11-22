import { useState } from 'react'

const Categories = () => {
  const [indexActive, setIndexActive] = useState(0);
  const categoriesArr = ["Все","Мясные","Вегетарианская","Гриль","Острые","Закрытые"];

  const onClickHandler = (index) => {
    setIndexActive(index);
  }

  return (
    <div className="categories">
      <ul>
        {
         categoriesArr.map((i, id) =>
           <li
             key={id}
             onClick={() => onClickHandler(id)}
             className={ indexActive === id ? "active" : ""}
           >
             { i }
           </li>)
        }
      </ul>
    </div>
  );
}

export default Categories;