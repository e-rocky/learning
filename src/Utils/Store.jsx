import { createStore } from "redux";

const initialState = {
  player1: 0,
  player2: 0,
  advantage: null,
  winner: null,
  playing: true,
};

export const playPause = () => ({
  type: "PLAYPAUSE",
});
export const resetGame = () => ({
  type: "RESETGAME",
});

export const playerScore = (player) => ({
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
      } else if (state.advantage != null && state.advantage !== action.player) {
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

export const myStore = createStore(
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
