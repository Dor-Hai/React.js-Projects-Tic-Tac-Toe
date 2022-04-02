import { useEffect, useState } from 'react';
import './App.css';
import GameRect from './components/GameRect';

function App() {
  const [turn, setTurn] = useState(null);
  const [rect, setRect] = useState([
    {id: 1, selected: false, mark: null},
    {id: 2, selected: false, mark: null},
    {id: 3, selected: false, mark: null},
    {id: 4, selected: false, mark: null},
    {id: 5, selected: false, mark: null},
    {id: 6, selected: false, mark: null},
    {id: 7, selected: false, mark: null},
    {id: 8, selected: false, mark: null},
    {id: 9, selected: false, mark: null},
  ])

  const handleChoice = (id) => {
    setRect(prevRect => {
      return prevRect.map(each => {
        if(each.id === id){
          return {...each, selected: true}
        } else {
          return each;
        }
      })
    })
  }

  const handleReset = () => {
    setRect(prevRect => prevRect.map(each => {return {...each, selected: false}}));
  }

  useEffect(() => {
    console.log(rect);
  }, [rect])

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="game-grid">
        {rect.map(each => (
          <GameRect 
            key={each.id} 
            id={each.id} 
            handleChoice={handleChoice} 
            disabled={each.selected} 
          />
        ))}
      </div>
      <p className="turn">Player X's Turn</p>
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
}

export default App;
