'use client'

import React from 'react'

const DurationButton = ({title,number,color, handleDuration,value}) => {

    if(color=="teal"){
  return (
    <button onClick={() => handleDuration(value)} className="ml-4 my-4 inline-block py-4 px-8  bg-teal-800 hover:bg-teal-700 border-teal-500 border-2 rounded-2xl  flex-col justify-center text-center w-fit">
    <h3 className="text-2xl font-medium px-4 py-2  rounded-xl font-readex text-neutral-200">{number}</h3>

  <h1 className="text-sm font-normal px-4 py-2  rounded-xl font-readex text-teal-400 ">{title}</h1>
</button>
  )
    }
    else{
        return (
            <button  onClick={() => handleDuration(value)}  className="ml-4 my-4 inline-block py-4 px-8  bg-neutral-700 hover:bg-neutral-600 border-neutral-500 border-2 rounded-2xl  flex-col justify-center text-center w-fit">
                  <h3 className="text-2xl font-medium px-4 py-2  rounded-xl font-readex text-neutral-200">{number}</h3>

          <h1 className="text-sm font-normal px-4 py-2  rounded-xl font-readex text-neutral-400 ">{title}</h1>
        </button>
          )
    }
}

export default DurationButton