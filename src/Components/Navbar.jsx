import {Link} from 'react-router-dom'
import img from './Images/MovieIcon.png'
export default function Navbar(){
    return(
        <div className='flex items-center'>
        <img className='h-12' src={img}  />
        <Link  className="mx-4 text-blue-600 hover:text-blue-800 text-3xl font-bold" to="/">Movies</Link>
        <Link className="text-blue-600 hover:text-blue-800 text-3xl font-bold" to="WatchList
        " >WatchList</Link >
        </div>
    )
}