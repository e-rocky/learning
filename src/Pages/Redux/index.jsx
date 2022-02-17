import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";

export default function Redux() {
  const GlobalStyle = createGlobalStyle`
  html {
    font-size: 16px;
    font-family: "Ubuntu", sans-serif;
  }
  
  body {
    margin: 0;
  }
  
  * {
    box-sizing: border-box;
  }
  
  #root {
    padding: 2rem;
    text-align: center;
    flex-direction: column;
    display: flex;
    align-items: stretch;
    justify-content: center;
    min-height: 100vh;
    max-width: 500px;
    margin: 0 auto;
  }
  
  p {
    margin: 0;
  }
  
  .buttons {
    align-self: center;
    display: flex;
    flex-direction: column;
  }
  
  .buttons-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  
  .button {
    font-family: "Ubuntu", sans-serif;
    margin: 0.5rem;
    line-height: 1;
    border: none;
    padding: 0.8rem 1rem;
    font-size: 1rem;
    background: #232536;
    border-radius: 0.3rem;
    color: white;
    font-weight: 300;
    width: 170px;
    cursor: pointer;
  }
  .button:hover {
    background: #2c2f44;
  }
  .button:active {
    background: #1e212e;
  }
  
  .display {
    font-size: 2rem;
    font-weight: 700;
    padding: 1rem;
    background-color: #2759f5;
    color: white;
    border-radius: 0.3rem;
    line-height: 1.5;
    margin: 0;
    margin-bottom: 1rem;
  }
  
  .player-score {
    font-size: 1.4rem;
    font-weight: 400;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    background-color: #193ba1;
    color: white;
    border-radius: 0.3rem;
    line-height: 1.5;
    display: flex;
    justify-content: space-between;
  }
  
  .player-games {
    font-size: 1.4rem;
    font-weight: 400;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    background-color: #ae2b2b;
    color: white;
    border-radius: 0.3rem;
    line-height: 1.5;
    display: flex;
    justify-content: space-between;
  }
  
  `;

  const player1 = useSelector((store) => store.player1);
  const player2 = useSelector((store) => store.player2);

  return (
    <div id="tenis">
      <GlobalStyle />
      <p className="display" id="score">
        Le score est: {player1} - {player2}
      </p>
      <div className="buttons">
        <div className="buttons-row">
          <button
            className="button"
            id="player-1"
            onClick={() => myStore.dispatch(playerScore("player1"))}
          >
            Point Joueur 1
          </button>
          <button
            className="button"
            id="player-2"
            onClick={() => myStore.dispatch(playerScore("player2"))}
          >
            Point Joueur 2
          </button>
        </div>
        <div className="buttons-row">
          <button
            className="button"
            id="reset"
            onClick={() => myStore.dispatch(resetGame())}
          >
            Remettre à zéro
          </button>
          <button
            className="button"
            id="pause"
            onClick={() => myStore.dispatch(playPause())}
          >
            Pause / Reprendre
          </button>
        </div>
      </div>
    </div>
  );
}
