function SinglePoem(props) {
  return (
    <div className="singlepoem--wrapper">
      <h4>{props.title}</h4>
      <p>{props.text}</p>
    </div>
  );
}

export default SinglePoem;
