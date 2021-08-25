import React, { useEffect, useState } from "react";
import "./css/app.css";
import Header from "./component/Header";
import Photos from "./component/Photos";
import axios from "axios";
import qs from "qs";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  // parameters state object for flickr api
  const [flickrParams, setFlickrParams] = useState({
    api_key: "22f90e2bf8b26ffd2cc97cc799675a77",
    format: "json",
    per_page: 12,
    page: 1,
    nojsoncallback: 1,
    method: "flickr.photos.getRecent",
  });

  useEffect(() => {
    setLoading(true);
    handleFetch(
      flickrParams,
      flickrParams.method === "flickr.photos.getRecent" ? false : true
    );
  }, [flickrParams]);

  // fetch photos from flickr
  function handleFetch(params, clearPhotos = false) {
    const strParams = qs.stringify(params);
    axios
      .get(`https://api.flickr.com/services/rest/?${strParams}`)
      .then((res) => {
        if (res) {
          if (clearPhotos) {
            setPhotos(res.data.photos.photo);
          } else {
            setPhotos([...photos, ...res.data.photos.photo]);
          }
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  }

  //  change method from get Recent to search using search query
  const showSearchResults = (search) => {
    setLoading(true);
    setFlickrParams({
      ...flickrParams,
      method: `${
        search === "" ? "flickr.photos.getRecent" : "flickr.photos.search"
      }`,
      ...(search !== "" && { text: search }),
    });
  };

  return (
    <div>
      <Header
        flickrParams={flickrParams}
        showSearchResults={showSearchResults}
      />
      <Photos
        loading={loading}
        handleFetch={handleFetch}
        flickrParams={flickrParams}
        photos={photos}
      />
    </div>
  );
};

export default App;
