import React from 'react';
import PostPreview from './postPreview.js';
import { Link } from 'react-router-dom';

const Home = ({ posts, address }) => {
  return (
    <div id="content">
      {posts.map((data, index) => (
        <Link key={index} to={`/${address}=${posts[index].id}`}><PostPreview index={index} data={posts} /></Link>
      ))}
    </div >
  )
}

export default Home;