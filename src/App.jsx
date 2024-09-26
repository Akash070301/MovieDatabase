import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import MovieList from "./Components/MovieList";
import Pagination from "./Components/Pagination";
import WatchList from "./Components/WatchList";

function App() {
  const [watchList, setWatchList] = useState(JSON.parse(localStorage.getItem('watchList')) || [])
  const addWatchList = function (movie) {
    const newWatchList = [...watchList, movie];
    setWatchList(newWatchList);
  };
  const removeWatchList = function(movie){
    const filteredWatchLsit = watchList.filter(movieobj=> movieobj.id !== movie.id)
    setWatchList(filteredWatchLsit)
  }
  useEffect(()=>{
    localStorage.setItem('watchList',JSON.stringify(watchList))
  },[watchList])
  return (
    <BrowserRouter basename="/MovieDatabase">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <MovieList watchList={watchList} addWatchList={addWatchList} removeWatchList={removeWatchList}/>
            </>
          }
        />
        <Route
          path="/WatchList"
          element={
            <>
              <WatchList movies={watchList} removeWatchList={removeWatchList} setWatchList={setWatchList}/>
            </>
          }
        />
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
