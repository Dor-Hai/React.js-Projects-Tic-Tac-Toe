import './GameRect.css';

export default function GameRect({id, handleChoice, disabled}) {

  const handleClick = () => {
    if(!disabled){
      handleChoice(id);
    }
  }

  return (
    <div className='game-rect' onClick={handleClick}></div>
  )
}
