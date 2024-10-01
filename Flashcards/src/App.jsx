import { useState } from 'react'
import './App.css'

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
  const [flipped, setFlipped] = useState(false);

  const flipCard = () => setFlipped(!flipped);

  const showRandomCard = () => {
    const randIndex = Math.floor(Math.random() * pairs.length);
    setCurIndex(randIndex);
    setFlipped(false); // Reset flip on new card
  }

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
      <div>
        <button className='button' onClick={showRandomCard}>Next</button> 
      </div>
    </div>
  );
}

export default App;