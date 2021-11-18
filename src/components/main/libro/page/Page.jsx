import React, { useRef } from 'react';

const Page = React.forwardRef((props, ref) => {
  const demoPageEl = useRef(null);
  return (
    <div className='demoPage' ref={ref}>
    
      <p>{props.children}</p>
      <p>{props.pageNumber}</p>
    </div>
  );
});

export default Page;
