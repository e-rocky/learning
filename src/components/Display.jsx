const Display = ({ myStore }) => {
  console.log(myStore);
  return (
    <p className="display" id="score">
      Le score est: {myStore.getState().player1} - {myStore.getState().player2}
    </p>
  );
};
export default Display;
