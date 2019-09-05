import React from 'react';

function PostPreview({ index, data, func }) {

  function strip_html_tags(str) {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();
    return str.replace(/<[^>]*>/g, '');
  }
  var temp = strip_html_tags(data[index].content.rendered.slice(0, 199));
  temp = [...temp, "...."];

  return (
    <div id={"container" + index} className="container col-sm-5">
      <div id="title-container">
        <h5 id="title-of-post" dangerouslySetInnerHTML={{ __html: data[index].title.rendered }}></h5>
      </div>
      <hr />
      <p>{temp}</p>
    </div>
  )
}

export default PostPreview;