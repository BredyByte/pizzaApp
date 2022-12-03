import React from 'react';
import styles from './Categories.module.scss';

type CategoriesProps = {
    categoryId: number,
    onClickCategory: (i: number) => void,
    categoriesArr: string[],
}

const Categories: React.FC<CategoriesProps> = ({ categoryId, onClickCategory, categoriesArr }) => {
  return (
    <div className="categories">
      <ul>
        {
          categoriesArr.map((i, id) =>
            <li
              key={id}
              onClick={() => onClickCategory(id)}
              className={`btn ${categoryId === id ? "active" : ""}`}
            >
              {i}
            </li>)
        }
      </ul>
    </div>
  );
}

export default Categories;