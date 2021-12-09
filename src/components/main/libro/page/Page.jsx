import React from 'react';
import './page.scss';

const Page = React.forwardRef((props, ref) => {
  return (
    <div className='Page' id={props.idStyle} ref={ref}>
      <div className='imgTitleLikeCounteriner'>
        <h2 style={{ color: 'red' }}>{props.title} </h2>
        <img
          className='like'
          onClick={props.addLike}
          style={props.likeOpacity}
          src={props.likeImg}
          alt='like'
        />
        <span className='likesCounter'>{props.likesCounter}</span>
      </div>

      <div>{props.text}</div>
      <p id='pageDescription'>{props.pageDescription}</p>
      <span className='pageNumber'>{props.pageNumber}</span>
    </div>
  );
});

export default Page;
