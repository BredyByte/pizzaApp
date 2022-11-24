import { useState } from 'react'

const Categories = ({ categoryId, onClickCategory, categoriesArr }) => {
  return (
    <div className="categories">
      <ul>
        {
         categoriesArr.map((i, id) =>
           <li
             key={id}
             onClick={() => onClickCategory(id)}
             className={ categoryId === id ? "active" : ""}
           >
             { i }
           </li>)
        }
      </ul>
    </div>
  );
}

export default Categories;