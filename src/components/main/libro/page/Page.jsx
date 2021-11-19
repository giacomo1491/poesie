import React from 'react';

const Page = React.forwardRef((props, ref) => {
  // const demoPageEl = useRef(null);
  return (
    <div className='demoPage' id={props.idStyle} ref={ref}>
      <h2 style={{ color: 'red' }}>{props.title}</h2>
      <div >{props.text}</div>
      <span>{props.pageNumber}</span>
    </div>
  );
});

export default Page;
