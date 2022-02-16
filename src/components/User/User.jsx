const User = ({ first_name, last_name, avatar, index }) => {
  return (
    <div>
      <span>{++index}</span>
      <figure>
        <img src={avatar} alt="Profile pic" />
      </figure>
      <strong>{first_name}</strong>
      <div>{last_name}</div>
    </div>
  );
};
export default User;
