import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

import React, { useState, useEffect } from "react";
import "./App.scss";

let quoteUrl = "https://type.fit/api/quotes";

function App() {
  const [, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [randomColor, setRandomColor] = useState("");

  async function fetchQuotes(url) {
    // this is the async fetch request
    const response = await fetch(url);
    const parsedJSON = await response.json();
    setQuotesArray(parsedJSON);
    // this triggers first random quote, etc.
    let randomInteger = Math.floor(Math.random() * parsedJSON.length);
    setQuote(parsedJSON[randomInteger].text);
    setAuthor(parsedJSON[randomInteger].author);
    setRandomColor(createdColor);
  }

  useEffect(() => {
    fetchQuotes(quoteUrl);
    console.log("effect ran");
  }, []);

  const createdColor = () => {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    return `rgb(${x},${y},${z})`;
  };

  const generateRandomQuote = () => {
    let randomInteger = Math.floor(Math.random() * quotesArray.length);
    setRandomNumber(randomInteger);
    setQuote(quotesArray[randomInteger].text);
    setAuthor(quotesArray[randomInteger].author);
    setRandomColor(createdColor);
  };

  if (quote === "") {
    return <div style={{ backgroundColor: "white" }}></div>;
  }
  // prettier-ignore
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: randomColor }}>
        <div id="quote-box" style={{ color: randomColor }}>
          <div id="text">
            <FontAwesomeIcon icon={faQuoteLeft} /> {quote}
          </div>
          <div id="author">{author}</div>
          <div id="buttons-div" className="btn-grp">
            <a
              className="button"
              id="tweet-quote"
              title="Tweet this quote!"
              href={`https://twitter.com/intent/tweet?text="${quote}"  ${author}`}
              target="_new"
              style={{ backgroundColor: randomColor }}
            >
              <FontAwesomeIcon
                icon={faTwitter}
                style={{
                  display: "flex",
                  height: "auto",
                  marginBottom: "10px"
                }}
              />
            </a>
            <Button
              type="button"
              class="btn btn-primary"
              id="new-quote"
              onClick={() => generateRandomQuote()}
              style={{ backgroundColor: randomColor }}
            >
              New Quote
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
