import styles from './Categories.module.scss';
interface CategoriesProps {
    categoryId: number,
    onClickCategory: any,
    categoriesArr: string[],
}

const Categories = ({ categoryId, onClickCategory, categoriesArr }:CategoriesProps) => {
  return (
    <div className="categories">
      <ul>
        {
          categoriesArr.map((i, id) =>
            <li
              key={id}
              onClick={() => onClickCategory(id)}
              className={`${categoryId === id ? "active" : ""} btn`}
            >
              {i}
            </li>)
        }
      </ul>
    </div>
  );
}

export default Categories;