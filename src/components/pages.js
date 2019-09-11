import React from 'react';

const CodeOfConduct = ({ pages }) => {
  return (
    <div id="content">
      <h2 dangerouslySetInnerHTML={{ __html: pages.title.rendered }}></h2>
      <div dangerouslySetInnerHTML={{ __html: pages.content.rendered }}></div>
    </div>
  )

}

export default CodeOfConduct;