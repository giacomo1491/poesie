import React from "react";
import "./page.scss";

const Page = React.forwardRef((props, ref) => {
  // console.log(props);
  return (
    <div className="Page" id={props.idStyle} ref={ref}>
      <div className="imgTitleLikeCounteriner">
        <h2 style={{ marginLeft: props.titleMargin }}>{props.title} </h2>
        {props.pageIndex === 0 &&
          props.poem.description !== "prefazione" &&
          props.poem.description !== "postfazione" &&
          props.poem.description !== "indice" &&
          props.poem.description !== "genreChanger" && (
            <>
              <button onClick={props.addLike} className="like">
                <span className="likesCounter">{props.poem.likes.length}</span>
                <span className="alert">{props.alert}</span>
              </button>
            </>
          )}
      </div>
      <div className="text">{props.text}</div>
      <p id="pageDescription">{props.pageDescription}</p>
      <span className="pageNumber">{props.pageNumber}</span>
    </div>
  );
});

export default Page;
