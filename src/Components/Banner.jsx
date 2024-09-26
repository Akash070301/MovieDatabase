import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import {BASE_URL} from './Utils/Constant'

export default function Banner(){
    const [trendingMovie,setTrendingMovie] = useState(null)
    useEffect(function(){
        axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=f57237955c9e34b41bfd7cc286917dcf')
        .then(function(res){
            let randFilm = res.data.results[Math.floor(Math.random()*20)]
            setTrendingMovie(randFilm)
        })
    },[])
    if(!trendingMovie){
        return(
            <div className='h-[35rem] w-screen shimmer'></div>
        )
    }
    return(
        <div className='relative'>
            <img className='h-[35rem] w-screen object-cover'src={BASE_URL+trendingMovie.backdrop_path}/>
            <p className='absolute left-[50%] bottom-4 translate-x-[-50%] text-4xl text-white'>{trendingMovie.title}</p>
        </div>
    )
}