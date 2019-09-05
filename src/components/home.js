import React from 'react';
import PostPreview from './postPreview.js';
import { Link } from 'react-router-dom';

const Home = ({ posts }) => {
  return (
    <div id="content">
      <h4>Recent Posts</h4>

      {posts.map((data, index) => (
        <Link key={index} to={`/posts=${index}`}><PostPreview index={index} data={posts} /></Link>
      ))}
    </div >
  )
}

export default Home;