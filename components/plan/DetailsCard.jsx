'use client'

import React from 'react'

const DetailsCard = ({title,number}) => {
  return (
    <div className="ml-4 my-4 inline-block py-2 px-2 md:py-4 md:px-8  bg-neutral-800 hover:bg-neutral-700 border-neutral-500 border-2 rounded-2xl  flex-col justify-center text-center w-fit">
  <h1 className="text-sm font-normal px-4 py-2  rounded-xl font-readex text-neutral-400 ">{title}</h1>
  <h3 className="text-lg font-medium px-4 py-2  rounded-xl font-readex text-neutral-200">{number}</h3>
</div>
  )
}

export default DetailsCard