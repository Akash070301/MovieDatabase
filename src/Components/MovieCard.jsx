import {useEffect} from "react"
import { useState } from "react"
export default function MovieCard({title,poster,fav,addWatchList,removeWatchList,movie}){



    return (
      <div>
        <div className="relative m-8 rounded-[1rem] overflow-hidden hover:scale-110 duration-300">
          <img className="h-[22rem] w-[14rem] object-cover" src={poster} />
          <div className="absolute top-3 right-3 h-8 w-8 bg-black/50 text-xl flex items-stretch justify-center rounded-lg select-none">
            {fav ? (
              <div onClick={() => removeWatchList(movie)}>❌</div>
            ) : (
              <div onClick={() => addWatchList(movie)}>❤️</div>
            )}
          </div>
          <p className="h-auto w-full bg-black/50 absolute left-[50%] bottom-0 py-2 translate-x-[-50%] text-white text-xl text-center select-all rounded-[1rem]">
            {title}
          </p>
        </div>
      </div>
    );
}