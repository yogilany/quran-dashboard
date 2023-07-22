'use client'

import { getDateAfterDays } from '@/app/plan/plan.service';
import React, { useState } from 'react'

const CurrentPlan = ({lengthOfPlan}) => {
    const [isDone, setIsDone] = useState(false)
    function handleDone(){
        setIsDone(true);

    }
  return (
     isDone ? <div className=" my-4 flex py-4 px-8  bg-yellow-800  border-yellow-500 border-2 rounded-2xl  flex-col justify-center text-right ">
    <h1 className='font-readex text-yellow-400 mb-4 font-medium text-xl'>
أحسنت!    </h1>
    <h1 className='font-readex mb-2 text-white font-medium text-3xl'>
        لقد أنهيت مهمة اليوم بنجاح.
    </h1>
    <h1 className='font-readex text-yellow-500 font-normal text-md'>
      
       
        كافئ نفسك بعصير برتقال طازج.
    

    </h1>

</div> : <div className="  mb-0 md:mb-4 lg:mb-4 flex py-4 px-8  bg-yellow-800  border-yellow-500 border-2 rounded-2xl  flex-col justify-center text-rigth ">
    <div className='flex flex-row justify-between'>
    <h1 className='font-readex text-yellow-400 mb-4 font-medium text-xl'>
        الخطة الحالية
    </h1>
 
    <a href="/plan" className="font-medium text-xs font-readex  text-yellow-600 hover:text-yellow-400  ">        تغيير الخطة
</a>

    </div>
   
    <h1 className='font-readex mb-2 text-white font-medium text-3xl'>
        ختـــــــــــــــــــــم القــــــــــــــران
    </h1>
    <h1 className='font-readex text-yellow-100 font-light text-xl'>
      
       
       في {lengthOfPlan} يـــــــــــــــــــــــــــــــــــــــــوم

    </h1>
    <div className='border-b border-yellow-500 my-4 w-12 ' />
    <h1 className='font-readex text-yellow-500 font-light text-md'>
      
       
    ستنتهي من ختمة القرآن في {lengthOfPlan ? getDateAfterDays(lengthOfPlan) : null}
    </h1>

   
</div>
  )
}

export default CurrentPlan