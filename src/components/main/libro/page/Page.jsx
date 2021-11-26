import React from 'react';
import './page.scss'

const Page = React.forwardRef((props, ref) => {

  return (
    <div className='Page' id={props.idStyle} ref={ref} >
    
      <h2 style={{ color: 'red' }}>{props.title}</h2>
      <div>{props.text}</div>
      <span >{props.pageNumber}</span>
      <span >{props.absolutePageNumber}</span>
    </div>
  );
});

export default Page;
