import { useGetCategoriesQuery } from './categoriesApiSlice';
import { Link } from 'react-router-dom';

import React from 'react';

function CategoriesList() {
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  let content;
  if (isLoading) {
  } else if (isSuccess) {
    content = (
      <section className='categories'>
        <h1>Categories</h1>
        <ul>
          {categories.map((category) => {
            return <li key={category.id}>{category.name}</li>;
          })}
        </ul>
        <Link to='/welcome'>Back to Welcome</Link>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
}

export default CategoriesList;
