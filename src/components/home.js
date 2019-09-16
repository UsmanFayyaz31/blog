import React from 'react';
import PostPreview from './postPreview.js';
import { Link } from 'react-router-dom';

const Home = ({ posts }) => {
  return (
    <div id="content">
      {posts.map((data, index) => (
        <Link key={index} to={`/posts=${posts[index].id}`}><PostPreview index={index} data={posts} /></Link>
      ))}
    </div >
  )
}

export default Home;