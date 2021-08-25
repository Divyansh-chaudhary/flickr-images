import React, { useEffect, useRef, useState } from "react";
import { Search } from "@material-ui/icons";
import { v4 as uid } from "uuid";

const Header = ({ showSearchResults }) => {
  const [search, setSearch] = useState("");
  const [recentSearch, setRecentSearch] = useState([]);
  const [showRecentSearch, setShowRecentSearch] = useState(false);
  const ref = useRef();

  useEffect(() => {
    //   it handle when use click outside of a recent search box
    const handleClickOutside = (e) => {
      ref.current && ref.current.contains(e.target)
        ? setShowRecentSearch(true)
        : setShowRecentSearch(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // unbind event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  //   handle search click and submit button and save searches to localstorage
  const handleClick = (e) => {
    e.preventDefault();
    if (search === "") showSearchResults(search);
    else {
      let history = JSON.parse(localStorage.getItem("search-data"));
      if (history === null) {
        history = [search];
        localStorage.setItem("search-data", JSON.stringify(history));
        showSearchResults(search);
      } else {
        for (let item of history) {
          if (item === search) {
            setShowRecentSearch(false);
            showSearchResults(search);
            return null;
          }
        }
        history = [...history, search];
        localStorage.setItem("search-data", JSON.stringify(history));
        setShowRecentSearch(false);
        showSearchResults(search);
      }
    }
  };

  const recentSearchClick = (e) => setSearch(e.target.innerText);

  //   it runs when input gets focused
  const handleFocus = () => {
    setRecentSearch(JSON.parse(localStorage.getItem("search-data"))?.reverse());
    setShowRecentSearch(true);
  };

  //   it runs when input lose focus
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <header>
      <form ref={ref} className="search">
        <input
          placeholder="Search..."
          autoComplete="off"
          onChange={handleChange}
          onFocus={handleFocus}
          value={search}
          type="text"
          name="search"
          id="search"
        />
        <button onClick={handleClick} type="submit">
          <Search className="search-btn" />
        </button>
        <div
          className="recent-searches"
          style={{ display: `${showRecentSearch ? "block" : "none"}` }}
        >
          <ul>
            {recentSearch?.map((recent) => {
              //   filter the search while typing
              if (search !== "" && recent.includes(search)) {
                return (
                  <li key={uid()} onClick={recentSearchClick}>
                    {recent}
                  </li>
                );
              }
              //   shows the all recent searches
              if (search === "") {
                return (
                  <li key={uid()} onClick={recentSearchClick}>
                    {recent}
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </form>
    </header>
  );
};

export default Header;
