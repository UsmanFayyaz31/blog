import React from 'react';
import * as Constants from '../constants/index';
import Home from './home';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      categories: null,
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    var categoryUrl = `${Constants.appUrl}categories?search=${this.props.match.params.searchQuery}`;
    var postUrl = `${Constants.appUrl}posts?search=${this.props.match.params.searchQuery}`;

    this.setState({ isLoading: true });
    fetch(categoryUrl)
      .then(response => response.json())
      .then(res => this.setState({ categories: res, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));

    this.setState({ isLoading: true });
    fetch(postUrl)
      .then(response => response.json())
      .then(res => this.setState({ posts: res, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    if (this.state.posts !== null && this.state.categories !== null) {
      return (
        <div>
          <div id="content">
            {(this.state.categories.length === 0) ? <h2>No Category Found.</h2> : <h2>Categories:</h2>}
            {this.state.categories.map((data, index) => (
              <a key={index} href={`/category=${data.id}`}><h4 className="category-list">{data.name}</h4></a>
            ))}
            <h2>Posts:</h2>
          </div>
          {<Home posts={this.state.posts} address="posts" />}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default SearchPage;