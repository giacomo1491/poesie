import React from 'react';
import poems from './di_mare.json';

function Poems() {
  return (
    <div>
      {/* {poems[0].text.split('\n').map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            {item}
            <br />
          </React.Fragment>
        );
      })} */}
      {poems.map((poem, index) => {
        return (
          <div
            key={index}
            style={{
              border: '1px solid black',
              width: 'max-content',
              margin: '2%',
            }}
          >
            <h2 style={{ color: 'red' }}>{poem.title}</h2>
            <p>
              {poem.text.split('\n').map((item, index) => {
                return (
                  <>
                    <p key={index}>{item}</p>
                    <br />
                  </>
                );
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Poems;

// {poem.text.split('\n').map((item, index) => {
// return (
//  <p key={index}>{item}</p>
//  <br />
