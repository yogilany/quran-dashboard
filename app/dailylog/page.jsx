'use client'

import PlanEntry from '@/components/plan/PlanEntry';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useContext, useState,useEffect } from 'react'

const DailyLog = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [plan, setPlan] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
  const [_session,setSession] = useState(session)

  const fetchPlan = async () => {
    setIsLoading(true)
  
    var url = "/api/plan";
    var params = {
      userID: session?.user?.id,
    };
    var queryString = Object.keys(params).map(key => key + '=' + encodeURIComponent(params[key])).join('&');
    url = url + '?' + queryString;

  const res = await fetch(url);
  const data = await res.json();
  setPlan(data[0]?.plan);
  setIsLoading(false)

  console.log("DATA",data[0])
  }

  useEffect(() => {
    if(!plan){
    console.log("FETCHING")
    fetchPlan();
  }
  },[session])


  return (
    <div className="flex flex-col w-full  ">
     <div className="mt-4  border-neutral-200 dark:border-neutral-700 ">
     <h1 className=" font-readex mb-4 mt-8 text-6xl md:text-8xl font-extrabold  text-neutral-900  dark:text-white">
          السجل اليومي
        </h1>
        <h1 className=" font-readex mb-4 mt-8 text-2xl md:text-4xl font-medium  text-teal-400">
        لخطة التحفيظ خلال <span className="text-white">700</span>{" "}
          يوم{" "}
        </h1>
        <a
        href="/dashboard"
          type="button"
          className="flex text-center w-fit cursor-pointer justify-center font-readex text-yellow-100 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-md px-8 py-4  my-8 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
        >
         داشبـــــــورد
        </a>
          <div className="relative overflow-x-auto  sm:rounded-lg">
            {isLoading ? <div role="status" className=" flex-1 justify-start   text-center   break-inside-avoid rounded-lg   bg-clip-padding px-12 py-4  backdrop-blur-lg backdrop-filter  w-full h-fit">
          <svg
            aria-hidden="true"
            className="inline w-24 h-24 mr-2 text-gray-200 animate-spin dark:text-neutral-600 fill-teal-500"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>  : plan?.map((day,index) => {
              return (
                <PlanEntry key={index} day={day} session={session} isRegistered={true} />
              );
            }) }

          </div>
        </div>
  </div>
  )
}

export default DailyLog