import React from 'react';
import '../App.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import fetchPostsAction from './fetchPosts.js';
import { getPostsError, getPosts, getPostsPending } from '../reducer/postsReducer.js';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import Home from './home';
import * as Constants from '../constants/index'
import PostPage from './posts';
import CodeOfConduct from './codeOfConduct';

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentRender = this.shouldComponentRender.bind(this);
  }

  componentWillMount() {
    const { fetchPosts } = this.props;
    const getPosts = `${Constants.appUrl}posts`;
    fetchPosts(getPosts);
  }

  shouldComponentRender() {
    const { pending } = this.props;
    if (pending === false) {
      return false;
    }
    return true;
  }

  render() {
    const { posts } = this.props;
    if (this.shouldComponentRender()) {
      return (<div></div>);
    }

    return (
      <Router>
        <div>
          <div id="header">
            <div>
              <h1>My Blog</h1>
            </div>
            <div id="navbar-element">
              <Link className="col-sm-2 navbar-elements" to={"/"}><label>Home</label></Link>
              <Link className="col-sm-2 navbar-elements" to={"/termsOfService"}><label>Terms Of Services</label></Link>
              <Link className="col-sm-2 navbar-elements" to={"/codeOfConduct"}><label>Code Of Conduct</label></Link>

              <div className="col-sm-2 navbar-elements">
                <DropdownButton id="dropdown-basic-button" title="Categories">
                  <Dropdown.Item href="#/action-1">Categories1</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Categories1</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Categories1</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Categories1</Dropdown.Item>
                </DropdownButton>
              </div>
              <input id="search-bar" placeholder="search" className="col-sm-2"></input>
            </div>
          </div>
        </div>

        <Switch>
          <Route path={"/termsOfService"} render={() => { return <h1>HTML by Ducket book</h1> }} />
          <Route path={"/codeOfConduct"} component={CodeOfConduct} />
          <Route exact path={"/"} component={() => <Home posts={posts} />} />
          <Route path="/posts=:postsId" component={PostPage} />
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  error: getPostsError(state),
  posts: getPosts(state),
  pending: getPostsPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchPosts: fetchPostsAction
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Body);

