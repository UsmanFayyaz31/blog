import React from 'react';
import * as Constants from '../constants/index';
import Home from './home.js';
import { connect } from 'react-redux';
import { fetchCategories as fetchCategoriesAction } from './fetchPosts.js';
import { getPostsError, getCategories, getPostsPending } from '../reducer/postsReducer.js';
import { bindActionCreators } from 'redux';


class CategoryPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      title: null,
      isLoading: false,
      error: null
    };

    this.fetchData = this.fetchData.bind(this);
    this.props.history.listen((location, action) => {
      var temp = location.pathname;
      var revs = temp.match(/\D*(\d+)/);
      if (revs !== null) { this.fetchData(revs[1]); }
    });
  }

  fetchData(index) {
    const { categories } = this.props;
    var url = `${Constants.appUrl}posts?categories=${index}`;

    this.setState({ isLoading: true });
    fetch(url)
      .then(response => response.json())
      .then(res => this.setState({ data: res, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));


    for (var i = 0; i < categories.length; i++) {
      if (categories[i].id == index) {
        this.setState({
          title: categories[i].name
        })
        break;
      }
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    var index = this.props.match.params.catId;
    this.fetchData(index);
  }

  render() {
    var temp = `posts`;

    if (this.state.isLoading === false) {
      return (
        <div>
          <h4 id="content">{this.state.title}</h4>
          {(this.state.data !== null) ? <Home posts={this.state.data} address={temp} /> : ""}
        </div>
      )
    } else {
      return (
        <div className="loader"></div>
      )
    }
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