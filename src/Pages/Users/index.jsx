import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../../assets/hooks";
import User from "../../components/User/User";

const Users = (props) => {
  const search = useLocation().search;
  const [usersDatas, setUsersDatas] = useState([]);
  const [nbrItems, setNbrItems] = useState(
    new URLSearchParams(search).get("show") || 3
  );

  const { usersData, usersDataLoading } = useFetch(
    "https://random-data-api.com/api/users/random_user?size=30"
  );

  useEffect(() => {
    setUsersDatas(usersData);
    console.log("fetch");
  }, [usersData]);

  function makeProps(user) {
    return {
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
    };
  }
  return (
    <div>
      <input
        type="range"
        value={nbrItems}
        onChange={(e) => setNbrItems(e.target.value)}
      />
      <h1>{nbrItems}</h1>
      {usersDataLoading ? (
        <div>loading...</div>
      ) : (
        usersDatas &&
        usersDatas.map(
          (user, index) =>
            index < nbrItems && (
              <User key={user.id} {...makeProps(user)} {...{ index }} />
            )
        )
      )}
    </div>
  );
};

export default Users;
