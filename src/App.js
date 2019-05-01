import React, {Component} from 'react';
import randomWord from 'random-words';
import Char from './components/Char';
import Keyboard from './components/Keyboard';

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
      secretWord: word.toLowerCase(),
      filledWord: '',
      guesses: [],
      currentGuess: '',
      guessCounter:0,
      showKeyboard: true
   }
  }

  updateState = (guess) => {
    if(guess.match(/^[A-Z]$/i)) {
      const props = {
        currentGuess: guess.toLowerCase()
      }

      props.guesses=[...this.state.guesses,props.currentGuess];

      if(!this.state.secretWord.includes(props.currentGuess)) {
        props.guessCounter = this.state.guessCounter + 1;
      }

      this.setState(props);
    }
  }

  inputHandler = (evt) => {
    this.updateState(evt.key);
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
    return (<div/>)
  }

  boxWord = () => {
    return this.getFilledWord().map((character, index) => {
      return (<Char character={character} key={index} />);
    });
  }

  showKeyboard = () => {


  }
  startNewGame = () => {
    this.setState({...this.getNewState(), showKeyboard: this.state.showKeyboard});
  }

  componentWillMount() {
    document.onkeydown = (evt) => this.updateState(evt.key);
  }

  componentWillUnmount() {
    document.onkeydown = null;
  }

  render() {
    let guesses = this.state.guesses;
    let keyboard = null;
    if(this.state.showKeyboard) {
      keyboard = (<Keyboard clicked = {(letter) => this.updateState(letter)}/>);
    }
    return (
      <div className="center">
          <p>
             I have chosen a word with {this.state.secretWord.length} letters. Guess the word.
          </p>
          { this.boxWord() }
          { this.getStatus() }
          <div> Your guesses so far: <Char character={guesses.join(", ")} /> </div>
          <div><button onClick={this.startNewGame}> Start New Game </button>
          <button onClick={() => this.setState({showKeyboard: !this.state.showKeyboard})}>
            {this.state.showKeyboard ? 'Hide': 'Show'} Keyboard</button></div>
          {keyboard}

      </div>
    );
  }
}


export default App;