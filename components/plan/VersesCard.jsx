'use client'

import React from 'react'

const VersesCard = ({title,number}) => {
  return (
    <div className="block ml-4 my-4  py-2 px-2 md:py-4 md:px-8  bg-transparent  hover:bg-neutral-700 border-neutral-400 border-2 rounded-2xl  flex-col justify-center text-center w-fit">
  <h1 className="text-sm font-normal px-4 py-2  rounded-xl font-readex text-neutral-400 ">{title}  <span className="text-lg font-medium px-4 py-2  rounded-xl font-readex text-neutral-200">{number}</span> آيـــــــــــــــــات
</h1>
</div>
  )
}

export default VersesCard