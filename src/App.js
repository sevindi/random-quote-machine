import React from 'react';
import './App.css';
import { FaQuoteLeft, FaQuoteRight, FaRetweet, FaTwitter } from 'react-icons/fa';

class RandomQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: '',
      author: '',
      color: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.handleClick();
  }

  handleClick() {
    const DIR = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    fetch(DIR)
      .then((res) => res.json())
      .then((data) => {
        const quoteArray = data.quotes;
        const randomIndex = Math.floor(Math.random() * data.quotes.length);
        const randomQuote = quoteArray[randomIndex];

        const getRandomColor = () => {
          const letters = '0123456789ABCDEF';
          let color = '#';
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
          return color;
        };
        const newColor = getRandomColor();

        this.setState({
          quote: randomQuote.quote,
          author: randomQuote.author,
          color: newColor,
        });
      });
  }

  render() {
    return (
      <div id="window" style={{ backgroundColor: this.state.color }}>
        <div id="quote-box">
          <div id="text">
            <p>
              <FaQuoteLeft />
              {' '}
              {this.state.quote}
              {' '}
              <FaQuoteRight />
            </p>
          </div>
          <div id="author">
            <p>
              {' '}
              —
              {this.state.author}
            </p>
          </div>

          <div id="buttons">
            <a target="_blank" href={`https://twitter.com/intent/tweet?text="${this.state.quote}" - ${this.state.author}`} id="tweet-quote">
              {' '}
              <FaTwitter />
            </a>
            <FaRetweet onClick={this.handleClick} id="new-quote" />
          </div>

        </div>
      </div>
    );
  }
}

export default RandomQuote;
