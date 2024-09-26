import { useEffect, useState } from "react"
import { BASE_URL } from "./Utils/Constant"
import { GENRE_ID_MAPPING } from "./Utils/Constant"
import { ALL_GENRES } from "./Utils/Constant"
export default function WatchList({movies,removeWatchList,setWatchList}){
    const[genres,setGenre] = useState([ALL_GENRES])
    const[selectedGenre,setSelectedGenre] = useState(ALL_GENRES)
    const[search,setSearch] = useState('')

    const sortAscending = function(key){
        const sortedMovies = [...movies].sort((a,b)=>{
            return a[key]-b[key]    
        })
        setWatchList(sortedMovies)
    }
    const sortDescending = function(key){
        const sortedMovies= [...movies].sort((a,b)=>{
            return b[key]-a[key]    
        })
        setWatchList(sortedMovies)
    }


    useEffect(()=>{
        const genreList = movies.map((movieObj)=>{
            return GENRE_ID_MAPPING[movieObj.genre_ids[0]]  
        })
        const uniqueGenreList = new Set(genreList);
        setGenre([ALL_GENRES,...uniqueGenreList])
    },[movies])


    return (
      <div className="flex flex-col justify-center items-center ">
        <div className="w-[97%] mt-4 flex flex-wrap gap-4 justify-evenly">
          {genres.map((genre, index) => {
            return (
              <div
                key={index}
                onClick={() => setSelectedGenre(genre)}
                className={`h-[3rem] w-[10rem] flex justify-center items-center  rounded-lg text-xl text-white cursor-pointer font-bold select-none 
                                ${
                                  genre === selectedGenre
                                    ? "bg-blue-600"
                                    : "bg-slate-300"
                                }
                                `}
              >
                {genre}
              </div>
            );
          })}
        </div>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search Movie"
          className="h-[4rem] w-[24rem] my-4 p-4 text-xl font-bold bg-slate-200 outline-none"
        />
        <table className="rounded-lg border m-4 w-[97%] overflow-hidden">
          <thead className="bg-slate-300 h-12 rounded-lg">
            <tr className="border-b-2 text-left text-xl">
              <th className="p-8">Name</th>
              <th>
                <i
                  onClick={() => sortAscending("popularity")}
                  className="fa-solid fa-angle-up hover:text-blue-600"
                ></i>{" "}
                Popularity{" "}
                <i
                  onClick={() => sortDescending("popularity")}
                  className="fa-solid fa-angle-down hover:text-blue-600"
                ></i>
              </th>
              <th>
                <i
                  onClick={() => sortAscending("vote_average")}
                  className="fa-solid fa-angle-up hover:text-blue-600"
                ></i>{" "}
                Rating{" "}
                <i
                  onClick={() => sortDescending("vote_average")}
                  className="fa-solid fa-angle-down hover:text-blue-600"
                ></i>
              </th>
              <th>Genre</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {movies
              .filter((movieObj) => {
                if (selectedGenre === ALL_GENRES) {
                  return true;
                }
                return (
                  selectedGenre === GENRE_ID_MAPPING[movieObj.genre_ids[0]]
                );
              })
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());
              })
              .map((movie) => {
                return (
                  <tr
                    key={movie.id}
                    className="border-2 hover:bg-gray-200 text-left text-xl"
                  >
                    <td className="flex items-center gap-8">
                      <img
                        className="m-4 h-[10rem] w-[22rem] object-cover rounded-[1rem]"
                        src={BASE_URL + movie.backdrop_path}
                      />
                      <p className="text-xl font-bold">{movie.title}</p>
                    </td>
                    <td className="pl-10">{movie.popularity}</td>
                    <td className="pl-10">{movie.vote_average}</td>
                    <td>{GENRE_ID_MAPPING[movie.genre_ids[0]]}</td>
                    <td>
                      <div
                        onClick={() => removeWatchList(movie)}
                        className="h-[2.75rem] w-[5rem] bg-blue-600 flex justify-center items-center rounded-lg text-xl text-white font-bold cursor-pointer hover:bg-blue-400"
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
}