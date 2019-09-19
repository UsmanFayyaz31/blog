import React from 'react';
import PostPreview from './postPreview.js';
import { Link } from 'react-router-dom';

const Home = ({ posts, address }) => {
  if (posts.length !== 0) {
    return (
      <div id="content">
        {posts.map((data, index) => (
          <Link key={index} to={`/${address}=${posts[index].id}`}><PostPreview index={index} data={posts} /></Link>
        ))}
      </div >
    )
  } else {
    return (
      <div id="content">
        <h2>No Posts found.</h2>
      </div>
    )
  }

}

export default Home;