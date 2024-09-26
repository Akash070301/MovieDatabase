import { useState } from "react";
export default function Pagination({page,handlePrev,handleNext}){
    return(
        <div className="flex justify-center items-center gap-8 text-2xl h-[3rem] w-screen bg-slate-400">
            <div onClick={handlePrev} className="cursor-pointer select-none hover:text-blue-600"><i className="fa-solid fa-angle-left"></i></div>
            <div className="select-none font-Roboto">{page}</div>
            <div onClick={handleNext}className="cursor-pointer select-none hover:text-blue-600"><i className="fa-solid fa-angle-right"></i></div>
        </div>
    )
}