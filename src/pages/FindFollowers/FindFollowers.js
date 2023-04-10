import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import "./FindFollowers.scss";

const FindFollowers = () => {
  const { user } = useAuthContext();
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}api/user/allusers/search`,
        {
          searchInput: input,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSearchResults(data);
    };

    if (!input) {
      return;
    }
    getUsers();
  }, [input]);

  return (
    <div className="wrapper">
      <section className="page">
        <div className="page__top">
          <h2 className="page__title">Find new connections</h2>
          <input
            className="page__input"
            type="text"
            placeholder="Start typing to find people..."
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </div>

        <section className="results">
          {!input && <p>Your results will show up here.</p>}
          {searchResults &&
            searchResults.map((result) => {
              return (
                <article key={result._id} className="result">
                  <div className="result__side">
                    <img
                      className="result__avatar"
                      src={result.avatar}
                      alt="User avatar"
                    />
                  </div>
                  <div className="result__side">
                    <p>{result.first_name}</p>
                    <p>{result.last_name}</p>
                  </div>
                  <button>Follow</button>
                </article>
              );
            })}
        </section>
      </section>
    </div>
  );
};

export default FindFollowers;
