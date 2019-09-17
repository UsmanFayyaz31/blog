import React from 'react';
import * as Constants from '../constants/index';

class PostPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      error: null
    };
  }

  componentDidMount() {
    var index = this.props.match.params.postsId;
    var url = `${Constants.appUrl}posts/${index}`;

    this.setState({ isLoading: true });
    fetch(url)
      .then(response => response.json())
      .then(res => this.setState({ data: res, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }


  render() {
    if(this.state.data !== null){
      return (
        <div id="content">
          <h2 dangerouslySetInnerHTML={{ __html: this.state.data.title.rendered }}></h2>
          <div dangerouslySetInnerHTML={{ __html: this.state.data.content.rendered }}></div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default PostPage;