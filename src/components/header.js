import React from 'react';
import '../App.css';
import { DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchPosts as fetchPostsAction, fetchPages as fetchPagesAction, fetchCategories as fetchCategoriesAction } from './fetchPosts.js';
import { getPostsError, getPosts, getPages, getCategories, getPostsPending } from '../reducer/postsReducer.js';
import { bindActionCreators } from 'redux';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Home from './home';
import DropdownCategories from './DropdownCategories';
import * as Constants from '../constants/index';
import PostPage from './posts';
import Pages from './pages';
import categoriesPage from './categoriesPage';
import SearchPage from './searchPage';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: ""
    }
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    event.preventDefault();
    this.setState({ inputData: event.target.value })
  }

  componentWillMount() {
    const { fetchPosts, fetchPages, fetchCategories } = this.props;
    const getPosts = `${Constants.appUrl}posts`;
    const getPages = `${Constants.appUrl}pages`;
    const getCategories = `${Constants.appUrl}categories`;

    fetchPosts(getPosts);
    fetchPages(getPages);
    fetchCategories(getCategories);
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === false) {
      return false;
    }
    return true;
  }

  render() {
    var temp, temp1;
    const { posts, pages, categories } = this.props;
    if (this.shouldComponentRender()) {
      return (<div></div>);
    }

    if (pages !== null) {
      temp = pages[3].id;
      temp1 = pages[5].id;
    }

    if (posts !== null && pages !== null) {
      return (
        <Router>
          <div>
            <div id="header">
              <div>
                <h1>My Blog</h1>
              </div>
              <div id="navbar-element">
                <Link className="col-sm-2 navbar-elements" to={"/blog"}><label>Home</label></Link>
                <Link className="col-sm-2 navbar-elements" to={`/page=${temp}`}><label>Terms Of Services</label></Link>
                <Link className="col-sm-2 navbar-elements" to={`/page=${temp1}`}><label>Code Of Conduct</label></Link>

                <div className="col-sm-2 navbar-elements">
                  <DropdownButton id="dropdown-basic-button" title="Categories">
                    <DropdownCategories categories={categories} />
                  </DropdownButton>
                </div>
                <input className="col-sm-2" id="search-bar" placeholder="search" onChange={this.updateInput}></input>
                <Link id="submit-button" className="navbar-elements" to={`/search=${this.state.inputData}`}><button>Submit</button></Link>
              </div>
            </div>
          </div>

          <Switch>
            <Route path={`/page=${temp}`} component={() => <Pages index={temp} />} />
            <Route path={`/page=${temp1}`} component={() => <Pages index={temp1} />} />
            <Route exact path={"/"} component={() => <Home posts={posts} address="posts" />} />
            <Route exact path={"/blog"} component={() => <Home posts={posts} address="posts" />} />
            <Route exact path="/category=:catId" component={categoriesPage} />
            <Route exact path="/posts=:postsId" component={PostPage} />
            <Route exact path="/search=:searchQuery" component={SearchPage} />
          </Switch>
        </Router>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

const mapStateToProps = state => ({
  error: getPostsError(state),
  posts: getPosts(state),
  pages: getPages(state),
  categories: getCategories(state),
  pending: getPostsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPosts: fetchPostsAction,
  fetchPages: fetchPagesAction,
  fetchCategories: fetchCategoriesAction
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);

