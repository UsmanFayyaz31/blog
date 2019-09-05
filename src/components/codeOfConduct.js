import React from 'react';
import fetchPostsAction from './fetchPosts.js';
import { getPostsError, getPosts, getPostsPending } from '../reducer/postsReducer.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class CodeOfConduct extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div></div>
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
)(CodeOfConduct);
