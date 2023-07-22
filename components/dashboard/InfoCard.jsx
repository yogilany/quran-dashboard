'use client'

import React from 'react'

const InfoCard = () => {
  return (
    <div className="mx-4 my-4 flex py-4 px-8  bg-neutral-700 text-neutral-400 hover:bg-yellow-700  hover:text-yellow-400 border-neutral-500 hover:border-yellow-400 border-2 rounded-2xl  flex-col justify-center text-center w-full ">
    <h1 className="text-sm font-normal px-4 py-2  rounded-xl font-readex ">"عدد الايات التي تم حفظها"</h1>
    <h3 className="text-xl font-medium px-4 py-2  rounded-xl font-readex text-neutral-200">400</h3>
  </div>
  )
}

export default InfoCard