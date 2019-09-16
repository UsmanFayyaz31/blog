import React from 'react';
import { connect } from 'react-redux';
import { fetchCategories as fetchCategoriesAction } from './fetchPosts.js';
import { getPostsError, getCategories, getPostsPending } from '../reducer/postsReducer.js';
import { bindActionCreators } from 'redux';
import * as Constants from '../constants/index';
import Home from './home.js';


class CategoryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    const { categories } = this.props;
    var index = this.props.match.params.catId;
    var url = `${Constants.appUrl}posts?categories=${categories[index].id}`;

    this.setState({ isLoading: true });
    fetch(url)
      .then(response => response.json())
      .then(res => this.setState({ data: res, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    const { categories } = this.props;
    var index = this.props.match.params.catId;


    return (
      <div id="content">
        <h4>{categories[index].name}</h4>
        {(this.state.data !== null) ? <Home posts={this.state.data} /> : ""}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: getPostsError(state),
  categories: getCategories(state),
  pending: getPostsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCategories: fetchCategoriesAction
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryPage);
