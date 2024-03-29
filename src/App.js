import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Card';
import Scoreboard from './components/Scoreboard';
import './style/styles.css'; 
import React from 'react';

export default function App() {

  const [deck, setDeck] = React.useState([])
  const [startGame, setStartGame] = React.useState(false)
  const [chosenCards, setChosenCards] = React.useState([])
  const [currentScore, setCurrentScore] = React.useState(0)
  const [bestScore, setBestScore] = React.useState(0)
  const [gameOver, setGameOver] = React.useState(false)
  const [winner, setWinner] = React.useState(false)

  function start() {
    setStartGame(true)
  }

  function playAgain() {
    setStartGame(true)
    setCurrentScore(0)
    setChosenCards([])
    //setBestScore(0)

    shuffle()
    setWinner(false)
  }

  React.useEffect(() => {
    setCurrentScore(0)
    setChosenCards([])
    shuffle()
    setGameOver(false)
    },[gameOver]
    )

  function chooseCard(e) {
    let id = e.currentTarget.getAttribute("id")
    let chosenCopy = chosenCards

    if (chosenCopy.includes(id)) {
        setGameOver(true)
    }
    else {
      chosenCopy.push(id)
      setCurrentScore(prevScore => prevScore + 1)
      if (currentScore === deck.length-1) {
          setWinner(true)
      }   
      if (currentScore === bestScore) {
        setBestScore(bestScore + 1)
      }
      else if (currentScore >= bestScore) {
        setBestScore(currentScore)
      }
    }
    setChosenCards(chosenCopy)
    shuffle()
  }

  function shuffle() {
     let shuffledDeck = [...deck];
      for (let i = shuffledDeck.length-1; i > 0; i--) {
        let rand = Math.floor(Math.random() * shuffledDeck.length)
        let temp = shuffledDeck[i]
        shuffledDeck[i] = shuffledDeck[rand]
        shuffledDeck[rand] = temp
      }
      setDeck(shuffledDeck)
  }


  React.useEffect(() => {
      const newDeck = []
      let hash = {}
      for (let i = 1; i < 140; i+=10) {
          let rando = Math.ceil(Math.random() * i ) + i + i; 
          if (hash[rando]) {
            rando = Math.ceil(Math.random()*i) + 200
          }
          else {
          hash[rando] = 1
          }
          const url = `https://pokeapi.co/api/v2/pokemon/${rando}`
          fetch(url)
          .then(res => res.json())
          .then(data => {
            newDeck.push(
            {
            id: data.id,
            name: data.name,
            image: data.sprites.other.dream_world.front_default
          })
        setDeck(newDeck)
        })}
      }
      ,[])

  return (
   <div className="app">
      <Header/> 
      <Scoreboard currentScore={currentScore} bestScore={bestScore}/> 
     { !winner ? <h5> Select your team without repeating any pokemon. Get to 14 points to win!  </h5> : <h3> YOU WIN ! </h3>} 
      <div className="main">
        {!startGame ? <button onClick={start}> Start <b> • </b> Game </button> : !winner ? 
        deck && (deck.map(card => (
          <Card chooseCard={(e)=>chooseCard(e)} id={card.id} key={card.id} image={card.image} name={card.name}/> )))
          : <button onClick={playAgain}> PLAY AGAIN </button> 
          }
          </div> 
          
      <Footer/> 
    </div> 
  );
}
