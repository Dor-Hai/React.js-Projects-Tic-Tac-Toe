import { useEffect, useState } from 'react';
import './App.css';
import GameRect from './components/GameRect';

const winConditions = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [1,5,9],
  [3,5,7]
]

function App() {
  const [turn, setTurn] = useState(1);
  const [status, setStatus] = useState("Player 1's Turn")
  const [rect, setRect] = useState([
    {id: 1, selected: false, mark: null, highlight: false},
    {id: 2, selected: false, mark: null, highlight: false},
    {id: 3, selected: false, mark: null, highlight: false},
    {id: 4, selected: false, mark: null, highlight: false},
    {id: 5, selected: false, mark: null, highlight: false},
    {id: 6, selected: false, mark: null, highlight: false},
    {id: 7, selected: false, mark: null, highlight: false},
    {id: 8, selected: false, mark: null, highlight: false},
    {id: 9, selected: false, mark: null, highlight: false},
  ]);

  const changeTurns = () => {
    if(turn === 1){
      setStatus("Player 2's turn");
      setTurn(2);
    } else {
      setStatus("Player 1's turn");
      setTurn(1);
    }
  }

  const handleChoice = (id) => {
    setRect(prevRect => {
      return prevRect.map(each => {
        if(each.id === id){
          return {...each, selected: true, mark: turn === 1 ? 'X' : 'O'}
        } else {
          return each;
        }
      })
    })
  }

  const handleReset = () => {
    setRect(prevRect => prevRect.map(each => {return {...each, selected: false, mark: null, highlight: false}}));
    setStatus("Player 1's turn");
    setTurn(1);
  }

  const checkIfWin = () => {
    const playerOneRects = rect
      .filter(each => each.selected === true && each.mark === 'X')
      .map(each => each.id);
    const playerTwoRects = rect
      .filter(each => each.selected === true && each.mark === 'O')
      .map(each => each.id);

    for (let condition of winConditions) {
      if(playerOneRects.includes(condition[0]) && playerOneRects.includes(condition[1]) && playerOneRects.includes(condition[2])) {
        handleWin(1, condition);
        break;
      } else if (playerTwoRects.includes(condition[0]) && playerTwoRects.includes(condition[1]) && playerTwoRects.includes(condition[2])) {
        handleWin(2, condition);
        break;
      } else if(rect.every(each => each.selected === true && each.highlight === false)){
        handleTie();
      }
    };
  }

  const handleWin = (player, rects) => {
    setStatus(`Player ${player} Won!`);
    setRect(prevRect => {
      return prevRect.map(each => {
          if(each.id === rects[0] || each.id === rects[1] || each.id === rects[2]){
            return {...each, highlight: true, selected: true};
          } else {
            return {...each, selected: true};
          }
        })
    });
  }

  const handleTie = () => {
    setStatus(`It's a Tie!`);
    setRect(prevRect => {
      return prevRect.map(each => {return {...each, selected: true}});
    });
  }

  useEffect(() => {
    checkIfWin();
  }, [turn])

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="game-grid">
        {rect.map(each => (
          <GameRect
            key={each.id}
            rect={each}
            handleChoice={handleChoice}
            changeTurns={changeTurns}
          />
        ))}
      </div>
      <p className="turn">{status}</p>
      <button onClick={handleReset}>Reset Game</button>
    </div>
  );
}

export default App;