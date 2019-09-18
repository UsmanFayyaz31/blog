import React from 'react';
import { Dropdown } from 'react-bootstrap';

const DropdownCategories = ({ categories }) => {
  return (
    categories.map((data, index) => (
      <Dropdown.Item key={index} href={`/category=${categories[index].id}`}>{categories[index].name}</Dropdown.Item>
    ))
  )
}

export default DropdownCategories;