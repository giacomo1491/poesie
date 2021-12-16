import React from 'react';
import './page.scss';

const Page = React.forwardRef((props, ref) => {
  // console.log(props);
  return (
    <div className='Page' id={props.idStyle} ref={ref}>
      <div className='imgTitleLikeCounteriner'>
        <h2 style={{ color: 'red' }}>{props.title} </h2>

        {props.pageIndex === 0 &&
          props.poem.description !== 'prefazione' &&
          props.poem.description !== 'postfazione' &&
          props.poem.description !== 'indice' && (
            <>
              <button
                onClick={props.addLike}
                className='like'
                style={props.likeOpacity}
              ></button>
              <span className='likesCounter'>{props.poem.likes.length}</span>
            </>
          )}
      </div>

      <div>{props.text}</div>
      <p id='pageDescription'>{props.pageDescription}</p>
      <span className='pageNumber'>{props.pageNumber}</span>
    </div>
  );
});

export default Page;
