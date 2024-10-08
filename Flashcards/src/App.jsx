import { useState } from 'react'
import './App.css'
import InputAnswer from "./Components/inputAnswer.jsx";

const App = () => {
  
  const pairs = [
    {"English": "Goya /", "Urdu": "گویا", "Definition": "A momentary suspension of disbelief"},
    {"English": "taabir /", "Urdu": "تعبیر", "Definition": "interpretation of dreams	"},
    {"English": "lehja /", "Urdu": "لہجہ", "Definition": "way of speaking	"},
    {"English": "moujud /", "Urdu": "موجود", "Definition": "available	"},
    {"English": "mehrabni /", "Urdu": "مہر با نی", "Definition": "kindness"},
    {"English": "rehmat /", "Urdu": "ر حمت	", "Definition": "blessing"},
    {"English": "sukoon - araam /", "Urdu": "سکوں - آرام", "Definition": "peace"},
    {"English": "justajoo /", "Urdu": "جستجو", "Definition": "curiosity"},
    {"English": "muhafiz /", "Urdu": "محا فظ", "Definition": "protector"},
    {"English": "chashma /", "Urdu": "چشمہ", "Definition": "waterfall"},
  ];

  const [currIndex, setCurIndex] = useState(0);
  const [prevIndices, setPrevIndices] = useState([]);
  const [flipped, setFlipped] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const flipCard = () => setFlipped(!flipped);

  const showRandomCard = () => {
    const randIndex = Math.floor(Math.random() * pairs.length);
    if (prevIndices[prevIndices.length - 1] !== randIndex) {
      // Save current index before moving to next
      setPrevIndices([...prevIndices, currIndex]); 
    }
    setCurIndex(randIndex);
    setFlipped(false);
    setResetKey(prevKey => prevKey + 1);
  };

  const showPrevCard = () => {
    if (prevIndices.length > 0) {
      // Get the last index
      const prevIndex = prevIndices.pop();
      setCurIndex(prevIndex);
      setPrevIndices([...prevIndices]); 
      setFlipped(false);
      setResetKey(prevKey => prevKey + 1);
    }
  };

  // Shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  };

  // Shuffle prevIndices function
  const shufflePrevIndices = () => {
    const newPrevIndices = [...prevIndices]; // Clone the array to avoid directly mutating state
    shuffleArray(newPrevIndices);
    setPrevIndices(newPrevIndices);
  };

  return (
    <div className='Container'>
      <div className='Contents'>
        <h1>Urdu Learning Flashcards!</h1>
        <h2>Interested in writing or reading Urdu Literature? Test to learn basic words here!</h2>
        <h3>Number of cards: {pairs.length}</h3>
      </div>
      <div className={`Card ${flipped ? 'flipped' : ''}`} onClick={flipCard}>
        <div className="CardInner">
          <div className="CardFront">
            <h4>{pairs[currIndex].English}</h4>
            <br />
            <h4>{pairs[currIndex].Urdu}</h4>
          </div>
          <div className="CardBack">
            <h4>{pairs[currIndex].Definition}</h4>
          </div>
        </div>
      </div>

      <div className="inputContainer">
        <h3 className="guess-text">Guess the answer here:</h3>
        <InputAnswer
          key={resetKey}
          correctAnswer={pairs[currIndex].Definition} 
        />
      </div>

      <div>
        <button className='button orderButton' onClick={showPrevCard}>Prev</button> 
        <button className='button orderButton' onClick={showRandomCard}>Next</button> 
        <button className='button shuffleButton' onClick={shufflePrevIndices}>Shuffle Cards</button>
      </div>
    </div>
  );
}

export default App;