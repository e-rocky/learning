import { createStore } from "redux";
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

  const initialState = {
    player1: 0,
    player2: 0,
    advantage: null,
    winner: null,
    playing: true,
  };

  const playPause = () => ({
    type: "PLAYPAUSE",
  });
  const resetGame = () => ({
    type: "RESETGAME",
  });

  const playerScore = (player) => ({
    player: player,
    type: "PLAYERSCORE",
  });

  const reducer = (state, action) => {
    switch (action.type) {
      case "PLAYPAUSE":
        return { ...state, playing: !state.playing };
      case "RESETGAME":
        return { ...state, ...initialState };
      case "PLAYERSCORE":
        const scoreArray = [0, 15, 30, 40, 45];
        const index = scoreArray.indexOf(state[action.player]);
        let winner = state.winner;
        let advantage = state.advantage;
        let score = state[action.player];
        if (state.advantage === action.player) {
          winner = action.player;
        } else if (
          state.advantage != null &&
          state.advantage !== action.player
        ) {
          advantage = null;
        } else if (state.player1 === 40 && state.player2 === 40) {
          advantage = action.player;
        } else {
          score = scoreArray[index + 1];
        }

        if (score === 45) {
          winner = action.player;
        }

        //console.log(action.player);
        return {
          ...state,
          [action.player]: score,
          winner: winner,
          advantage: advantage,
        };
      default:
        return state;
    }
  };

  const myStore = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  function updateScoreText({
    playing,
    winner = null,
    player1 = 0,
    player2 = 0,
    advantage = null,
  }) {
    const score = document.getElementById("score");
    if (winner) {
      if (winner === "player1") {
        score.innerHTML = "Joueur 1 gagne";
      } else {
        score.innerHTML = "Joueur 2 gagne";
      }
    } else if (playing === false) {
      score.innerHTML = "C'est la pause";
    } else {
      let text = "Le score est: " + player1 + " - " + player2;
      if (advantage) {
        if (advantage === "player1") {
          text += " avantage joueur 1";
        } else {
          text += " avantage joueur 2";
        }
      }
      score.innerHTML = text;
    }
  }

  myStore.subscribe(() => {
    const state = myStore.getState();
    updateScoreText(state);
    console.log(state);
  });

  return (
    <div id="tenis">
      <GlobalStyle />
      <p className="display" id="score">
        Le score est: {myStore.getState().player1} -{" "}
        {myStore.getState().player2}
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
