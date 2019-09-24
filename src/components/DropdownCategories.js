import React from 'react';
import { Link } from 'react-router-dom';
import { DropdownButton } from 'react-bootstrap';

const DropdownCategories = ({ categories }) => {
  return (
    <DropdownButton drop="right" className="col-sm-12 navbar-elements col-lg-2" id="dropdown-basic-button" title="Categories">
      {categories.map((data, index) => (
        <Link key={index} to={`/category=${data.id}`}><p className="dropdown-list">{data.name}</p></Link>
      ))}
    </DropdownButton>
  )
}

export default DropdownCategories;