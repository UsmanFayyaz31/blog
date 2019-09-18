import React from 'react';
import * as Constants from '../constants/index';
import Home from './home.js';


class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      data: null,
      isLoading: false,
      error: null
    };
  }

  componentWillReceiveProps() {
    var index = this.props.match.params.catId;
    var url = `${Constants.appUrl}posts?categories=${index}`;


    this.setState({ isLoading: true });
    fetch(url)
      .then(response => response.json())
      .then(res => this.setState({ data: res, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    var temp = `posts`;

    if (this.state.data !== null) {
      return (
        <div>
          <h4 id="content">{this.state.data.name}</h4>
          {(this.state.data !== null) ? <Home posts={this.state.data} address={temp} /> : ""}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default CategoryPage;
