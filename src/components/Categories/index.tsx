import React from 'react';

type CategoriesProps = {
    categoryId: number,
    onClickCategory: (i: number) => void,
}
const categoriesArr: string[] = ["All","Meat","Vegetarian","Grill","Spicy","Closed"];

const Categories: React.FC<CategoriesProps> = React.memo( ({ categoryId, onClickCategory }) => {
    return (
        <div className="categories">
            <ul>
                {categoriesArr.map((i, id) => <li
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
})

export default Categories;