import React from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { fetchPosts as fetchPostsAction, fetchPages as fetchPagesAction, fetchCategories as fetchCategoriesAction } from './fetchPosts.js';
import { getPostsError, getPosts, getPages, getCategories, getPostsPending } from '../reducer/postsReducer.js';
import { bindActionCreators } from 'redux';
import { HashRouter as Router, Redirect, Route, Link, Switch } from 'react-router-dom';
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
      inputData: "",
      isSearch: false
    }
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    event.preventDefault();
    this.setState({ inputData: event.target.value })
  }

  componentDidMount() {
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

  handleButton(event) {
    if (event.key === "Enter") {
      this.setState({
        isSearch: true
      });
      this.setState({
        isSearch: false
      });
    }
  }

  render() {
    onkeypress = this.handleButton;
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

                <Link to={"/blog"}>
                  <div className="navbar-elements col-sm-12 col-lg-2">
                    <label>Home</label>
                  </div>
                </Link>

                <Link to={`/page=${temp}`}>
                  <div className="navbar-elements col-sm-12 col-lg-2">
                    <label>Terms Of Services</label>
                  </div>
                </Link>

                <Link to={`/page=${temp1}`}>
                  <div className="navbar-elements col-sm-12 col-lg-2">
                    <label>Code Of Conduct</label>
                  </div>
                </Link>

                <DropdownCategories categories={categories} />

                <div className="col-sm-12 navbar-elements col-lg-4">
                  <input id="search-bar" placeholder="search" onChange={this.updateInput}></input>
                  <Link id="submit-button" className="navbar-elements" to={`/search=${this.state.inputData}`}><button>Submit</button></Link>
                </div>

              </div>
            </div>
          </div>

          {(this.state.isSearch) ? <Redirect to={`/search=${this.state.inputData}`} /> : ""}
          <Switch>
            <Route path={`/page=${temp}`} component={() => <Pages index={temp} />} />
            <Route path={`/page=${temp1}`} component={() => <Pages index={temp1} />} />
            <Route exact path={"/"} component={() => <Home posts={posts} address="posts" />} />
            <Route exact path={"/blog"} component={() => <Home posts={posts} address="posts" />} />
            <Route exact path="/category=:catId" component={categoriesPage} />
            <Route exact path="/posts=:postsId" component={PostPage} />
            <Route exact path="/search=:searchQuery" component={SearchPage} />
          </Switch>

          <div id="footer">
            <h6 id="footer-desc">The content of this blog is obtained from WPBakery</h6>
          </div>
        </Router>
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

// dropdown category list does not disappear after clicking, 2-the postPreview function strip html tags need to be reconfiguired., 3-second timesearch does not provide the correct transition for the new data