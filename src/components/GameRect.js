export default function GameRect({rect, handleChoice, changeTurns}) {
  const {id, selected, mark, highlight} = rect;

  const handleClick = () => {
    if(!selected){
      handleChoice(id);
      changeTurns();
    }
  }

  return (
    <div className={highlight ? 'game-rect highlight' : 'game-rect'} onClick={handleClick}>{mark}</div>
  )
}
