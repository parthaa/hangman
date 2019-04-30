import React, {Component} from 'react';
import randomWord from 'random-words';
import Char from './components/Char';
import './App.css';

class App extends Component {
  maxGuesses = 10;
  constructor(props) {
    super(props);
    this.state = this.getNewState();
  }

  getNewState = () => {
    let word = randomWord();
    while (word.length < 5) {
      word = randomWord();
    }
    return {
      secretWord: word,
      filledWord: '',
      guesses: [],
      currentGuess: '',
      guessCounter:0
   }
  }

  inputHandler = (evt) => {
    if(evt.key.match(/^[A-Z]$/i)) {
      const props = {
        currentGuess: evt.key
      }

      props.guesses=[...this.state.guesses,props.currentGuess];

      if(!this.state.secretWord.includes(props.currentGuess)) {
        props.guessCounter = this.state.guessCounter + 1;
      }

      this.setState(props);
    }
  }

  getFilledWord = () => {
    let filledWord = [];
    for(let i = 0; i < this.state.secretWord.length; i++) {
      if(this.state.guesses.includes(this.state.secretWord[i])) {
        filledWord.push(this.state.secretWord[i]);
      }
      else {
        filledWord.push("");
      }
    }
    return filledWord;
  }

  getStatus = () => {
    const currentGuess = this.state.currentGuess;

    if (this.getFilledWord().join("") === this.state.secretWord) {
      return (<div> You 've guessed the word yo!! </div>);
    } else if ( currentGuess !== '' && !this.state.secretWord.includes(currentGuess)){
      const remainingGuesses = this.maxGuesses - this.state.guessCounter;
      if(remainingGuesses <= 0) {
         return(<div> Well you used up your chances. The word was <strong>{this.state.secretWord}</strong> Reload and try again!!</div> );
      } else {
        return(<div> Well that ain't here  But you have {remainingGuesses} chances</div> );
      }
    }
  }

  boxWord = () => {
    return this.getFilledWord().map((character, index) => {
      return (<Char character={character} key={index} />);
    });
  }

  startNewGame = () => {
    this.setState(this.getNewState());
  }

  componentWillMount() {
    document.onkeydown = this.inputHandler;
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }

  render() {
    let guesses = this.state.guesses;
    return (
      <div className="App">
          <p>
             I have chosen a word with {this.state.secretWord.length} letters. Guess the word.
          </p>
          <div>
              Your Guess <Char character={this.state.currentGuess}/>
          </div>
          { this.boxWord() }
          { this.getStatus() }

          <div> Your guesses so far: <Char character={guesses.join(", ")} /> </div> 
          <div><button onClick={this.startNewGame}> Start New Game </button> </div> 

      </div>
    );
  }

}


export default App;
