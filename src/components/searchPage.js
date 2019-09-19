import React from 'react';
import * as Constants from '../constants/index';
import Home from './home';
import { Link } from 'react-router-dom';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: null,
      categories: null,
      isLoading: false,
      error: null
    };

    this.fetchData = this.fetchData.bind(this);
    this.props.history.listen((location, action) => {
      var temp = location.pathname;
      var revs = temp.match(/^\/search=(\S+)/);
      if (revs !== null) { this.fetchData(revs[1]); }
    });
  }

  fetchData(query) {
    var categoryUrl = `${Constants.appUrl}categories?search=${query}`;
    var postUrl = `${Constants.appUrl}posts?search=${query}`;

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

  componentDidMount() {
    this.fetchData(this.props.match.params.searchQuery);
  }

  render() {
    if (this.state.isLoading === false) {
      if (this.state.posts !== null && this.state.categories !== null) {
        return (
          <div>
            <div id="content">
              {(this.state.categories.length === 0) ? <h2>No Category Found.</h2> : <h2>Categories:</h2>}
              {this.state.categories.map((data, index) => (
                <Link key={index} to={`/category=${data.id}`}><h4 className="category-list">{data.name}</h4></Link>
              ))}
              <h2>Posts:</h2>
            </div>
            {<Home posts={this.state.posts} address="posts" />}
          </div>
        )
      } else { return (<div></div>) }
    } else {
      return (
        <div className="loader"></div>
      )
    }
  }
}

export default SearchPage;