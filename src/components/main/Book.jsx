import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import Page from "./Page";
import React, { useCallback } from "react";
import FadeIn from "react-fade-in";
import { FaSpinner } from "react-icons/fa";
import { useTheme } from "../../ThemeContext";
import { useNavigate } from "react-router-dom";

// https://www.npmjs.com/package/react-pageflip
// https://reactjs.org/docs/forwarding-refs.html

function Book() {
  const [poems, setPoems] = useState([]);
  const book = useRef();
  const indexBook = useRef([]);
  const { currentUser, setNavActive, backendUrl } = useTheme();
  let navigate = useNavigate();
  let bookWidth = window.outerWidth - window.outerWidth / 10;
  let bookHeight = window.innerHeight - window.innerHeight / 7;


  const loadPoems = async () => {
    const response = await fetch(`${backendUrl}`);
    const poemsResponse = await response.json();
    setPoems(poemsResponse);
  };

  useEffect(() => {
    (async () => {
      await loadPoems();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFlip = useCallback((e) => {
    // console.log('Current page: ' + e.data);
  }, []);

  const navBannersBook = [
    { title: "indice", page: 0 },
    { title: "prefazione", page: 7 },
    { title: "postfazione", page: 180 },
  ];

  const goToPoem = (poemTitle, num) => {
    const current = indexBook.current;
    const poemFound = current.find((item) => item.poemTitle === poemTitle);
    poemFound && book.current.pageFlip().flip(poemFound.pageCounter + num);
  };

  let pageCounter = 0;

  const handleAddLike = async (poem, description) => {
    await fetch(`${backendUrl}/addLike/${description}/${poem._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      likes: poem.likes,
      body: JSON.stringify({ userName: currentUser.userName }),
    });
    (async () => {
      await loadPoems();
    })();
  };

  return (
    <div className="Book">
      {/* <p>{window.innerWidth}</p> */}
      {/* <p>{window.outerWidth}</p> */}
      {/* <p>{window.innerHeight}</p>
      <p>{window.outerHeight}</p> */}

      <ul className="bookNavbar">
        {navBannersBook.map((banner, index) => (
          <li
            key={index}
            onClick={() => book.current.pageFlip().flip(banner.page)}
          >
            <p>{banner.title}</p>
          </li>
        ))}
      </ul>

      {poems.length < 1 && (
        <FadeIn transitionDuration="800">
          <div>
            <FaSpinner className="spinner" />
            <span className="loading"> Loading...</span>
          </div>
        </FadeIn>
      )}
      <HTMLFlipBook
        ref={book}
        onFlip={onFlip}
        flippingTime={1250}
        width={
          window.outerWidth >= 1000 && window.outerWidth <= 1700
            ? bookWidth / 2
            : window.outerWidth >= 1701
            ? bookWidth / 2.9
            : bookWidth
        }
        height={
          window.innerHeight >= 700 && window.innerHeight >= window.innerWidth
            ? bookHeight / 1.2
            : bookHeight
        }
        className="FlipBook"
      >
        {poems.map((poem, poemIndex) => {
          // console.log({ pageCounter, poem: poem.title });
          const arrOfPoemsLines = poem.text.split("\n");
          const batchSize =
            poem.description === "prefazione" ||
            poem.description === "postfazione"
              ? 4
              : 16;
          const amountBatches = Math.ceil(arrOfPoemsLines.length / batchSize);
          const batches = [];
          for (let i = 0; i < amountBatches; i++) {
            const batch = arrOfPoemsLines.slice(
              i * batchSize,
              i * batchSize + batchSize
            );
            batches.push(batch);
          }

          indexBook.current.push({
            poemTitle: poem.title,
            pageCounter,
          });
          pageCounter = pageCounter + amountBatches;

          return batches.map((page, pageIndex) => {
            return (
              <Page
                idStyle={`poem${1 + poemIndex}page${pageIndex + 1}`}
                key={pageIndex}
                pageIndex={pageIndex}
                pageNumber={`${1 + poemIndex}.${pageIndex + 1}`}
                pageDescription={
                  (poemIndex === 79 && pageIndex === 0) ||
                  (poemIndex === 80 && pageIndex === 0) ||
                  poem.description === "genreChanger"
                    ? ""
                    : poem.description
                }
                title={
                  pageIndex === 0
                    ? poem.title
                    : (poem.description === "indice" ||
                        poem.description === "prefazione" ||
                        poem.description === "postfazione") &&
                      pageIndex !== 0
                    ? ""
                    : "....."
                }
                titleMargin={poem.description === "indice" ? "6.5%" : "5%"}
                poem={poem}
                alert={poem.alert}
                addLike={() => {
                  if (currentUser.userName === "anonymousUser") {
                    navigate("/");
                    setNavActive([false, true, false, false]);
                    alert("to like the poems you must be registered");
                  }
                  if (
                    currentUser.userName !== "anonymousUser" &&
                    poem.likes.find(
                      (element) => element === currentUser.userName
                    )
                  ) {
                    alert("you can vote only once per poem");
                  } else handleAddLike(poem, poem.description.slice(3));
                }}
                text={page.map((line, index) => {
                  return (
                    <>
                      {poem.description === "indice" ? (
                        <p
                          className="bookIndexTitle"
                          onClick={() => {
                            if (pageIndex === 0 && poemIndex === 0) {
                              goToPoem(line, 0);
                            }
                            if (pageIndex === 1) {
                              goToPoem(line, -2);
                            }
                            if (
                              (pageIndex === 0 && poem.title === "Di Terre") ||
                              (pageIndex === 0 && poem.title === "Di Amori")
                            ) {
                              goToPoem(line, 2);
                            }
                          }}
                          key={index}
                          style={{ cursor: "grabbing" }}
                        >
                          - {line}
                        </p>
                      ) : (
                        <p className="poemsLine" key={index}>
                          {line}
                        </p>
                      )}
                      <br />
                    </>
                  );
                })}
              />
            );
          });
        })}
      </HTMLFlipBook>
    </div>
  );
}

export default Book;
