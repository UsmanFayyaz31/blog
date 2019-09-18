import React from 'react';
import { Link } from 'react-router-dom';

const DropdownCategories = ({ categories }) => {
  return (
    categories.map((data, index) => (
      <Link key={index} to={`/category=${data.id}`}><p className="dropdown-list">{data.name}</p></Link>
    ))
  )
}

export default DropdownCategories;