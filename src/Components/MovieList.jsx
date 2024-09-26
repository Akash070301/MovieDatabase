import { useState } from "react";
import axios, { Axios } from "axios";
import { useEffect } from "react";
import { BASE_URL } from "./Utils/Constant";
import MovieCard from "./MovieCard";
import Pagination from "./Pagination";

export default function MovieList({watchList,removeWatchList,addWatchList}) {
  const [movieList, setMoveList] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const handlePrev = function () {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = function () {
    setPage(page + 1);
  };

  useEffect(
    function () {
      setLoading(true);
      axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=f57237955c9e34b41bfd7cc286917dcf&page=${page}`)
        .then(function (res) {
          const movies = res.data.results;
          setMoveList(movies);
          setTimeout(() => {
            setLoading(false);
          }, 750);
        });
    },[page]);

  let arr = [...Array(20).keys()].map((i) => i + 1);
  if (!movieList || loading) {
    return (
      <>
        <h1 className="m-7 text-4xl text-center text-slate-500">
          TRENDING MOVIES
        </h1>
        <div className="flex flex-wrap justify-evenly ">
          {arr.map((index) => {
            return (
              <div className="m-8 rounded-[1rem] overflow-hidden h-[22rem] w-[14rem] shimmer" key={index}></div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="m-7 text-4xl text-center text-slate-500">
        TRENDING MOVIES
      </h1>
      <div className="flex flex-wrap justify-evenly">
        {movieList.map((movies) => {
          return (
            <MovieCard
              key={movies.id}
              fav={watchList.some((movieObj)=>movieObj.id===movies.id)}
              movie={movies}
              addWatchList = {addWatchList}
              removeWatchList = {removeWatchList}
              title={movies.title}
              poster={BASE_URL + movies.poster_path}
            />
          );
        })}
      </div>
      <Pagination page={page} handlePrev={handlePrev} handleNext={handleNext} />
    </>
  );
}
