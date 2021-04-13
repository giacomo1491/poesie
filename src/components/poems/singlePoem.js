function SinglePoem(props) {
  const formattedText = props.text.replaceAll('\n', '<br />');
  return (
    <div className="singlepoem--wrapper">
      <h4>{props.title}</h4>
      <p><span dangerouslySetInnerHTML={{ __html: formattedText }} /></p>
    </div>
  );
}

export default SinglePoem;
