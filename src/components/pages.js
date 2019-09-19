import React from 'react';
import * as Constants from '../constants/index';

class CodeOfConduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      error: null,
      index: this.props.index
    };
  }

  componentDidMount() {
    var url = `${Constants.appUrl}pages/${this.state.index}`;

    this.setState({ isLoading: true });
    fetch(url)
      .then(response => response.json())
      .then(res => this.setState({ data: res, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }

  render() {
    if (this.state.data !== null) {
      return (
        <div id="content">
          <h2 dangerouslySetInnerHTML={{ __html: this.state.data.title.rendered }}></h2>
          <div dangerouslySetInnerHTML={{ __html: this.state.data.content.rendered }}></div>
        </div>
      )
    } else {
      return (<div className="loader"></div>)
    }
  }
}

export default CodeOfConduct;