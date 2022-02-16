import { useEffect, useState } from "react";

export default function useFetch(url) {
  //if (!url) return;
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState(false);
  const [usersDataLoading, setUsersDataLoading] = useState(true);
  useEffect(() => {
    async function fetchDatas() {
      try {
        const results = await fetch(url);
        const json = await results.json();
        setUsersData(json);
      } catch (e) {
        setError(true);
      } finally {
        setUsersDataLoading(false);
      }
    }
    fetchDatas();
  }, [url]);
  return { usersData, usersDataLoading, error };
}
