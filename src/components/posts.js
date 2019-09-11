import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts as fetchPostsAction } from './fetchPosts.js';
import { getPostsError, getPosts, getPostsPending } from '../reducer/postsReducer.js';
import { bindActionCreators } from 'redux';

class PostPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { posts } = this.props;
    var index = this.props.match.params.postsId;
    return (
      <div id="content">
        <h2 dangerouslySetInnerHTML={{ __html: posts[index].title.rendered }}></h2>
        <div dangerouslySetInnerHTML={{ __html: posts[index].content.rendered }}></div>
      </div>
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
)(PostPage);
