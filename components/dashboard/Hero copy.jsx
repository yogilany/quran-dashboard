'use client'

import React, { useEffect, useState } from "react";
import TodayTask from "./TodayTask";
import InfoCard from "./InfoCard";
import CurrentPlan from "./CurrentPlan";
import { useSession } from "next-auth/react";
function getArabicHijriDate() {
  const now = new Date();
  const options = { calendar: "islamic", day: "numeric", month: "long", year: "numeric" };
  const hijriDate = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", options).format(now);
  console.log("date",hijriDate)
  return hijriDate;
}
const Hero = ({plan,fetchPlan}) => {

  const { data: session } = useSession();
  const [userID, setUserId] = useState(session?.user.id)
  const [insights,setInsights] = useState({Rev: null, Mem: null, RevVer: null, MemVer: null, DoneDays: null, RestDays: null})
  

  function countCompletedTasksWithKeyword(plan) {
    let MemoDoneDays = 0;
    let MemoDoneVerses = 0;

    let RevDoneDay = 0;
    let RevDoneVerses = 0;


  if(plan){
    for (const day of plan) {
      if (day.task === "حفظ" && day.done === true) {
        MemoDoneDays++;
        MemoDoneVerses = MemoDoneVerses + (day.to - day.from + 1)
      }
      else if(day.task !== "حفظ" && day.task !== "أجازة" && day.done === true){
        RevDoneDay++;
        RevDoneVerses = RevDoneVerses + (day.to - day.from + 1)

      }
    }
  }
  
    return {Mem: MemoDoneDays, Rev:RevDoneDay, MemVer:MemoDoneVerses , RevVer:RevDoneVerses };
  }


  useEffect(()=>{
    const newInsights = countCompletedTasksWithKeyword(plan);
    setInsights({
      Rev: newInsights.Rev,
      Mem: newInsights.Mem,
      MemVer: newInsights.MemVer,
      RevVer: newInsights.RevVer,
      DoneDays: (newInsights.Rev + newInsights.Mem),
      RestDays: plan?.length - (newInsights.Rev + newInsights.Mem),
      hijriDate: getArabicHijriDate()

    })


  },[plan])

  
  return (
    <section className="    md:px-16 lg:px-20 text-right items-end pb-20 ">
       <h1 className=" font-readex mt-8 text-md font-light  lg:text-xl text-white">
{insights.hijriDate}      </h1>
      <h1 className=" font-readex mb-8 mt-4 text-xl font-bold  md:text-4xl lg:text-5xl text-white">
      يوم سعيد يا <span className="font-bold">{session?.user?.name} </span>
      </h1>

      <dl className="font-readex grid  grid-cols-1 xl:grid-cols-2  md:grid-cols-2 gap-4  mx-auto text-gray-900  dark:text-white ">

<CurrentPlan lengthOfPlan={plan?.length} />   
<TodayTask plan={plan} fetchPlan={fetchPlan}/>

   </dl>

      <dl className="font-readex grid max-w-screen-xl grid-cols-2 gap-4  mx-auto text-gray-900 sm:grid-cols-2 xl:grid-cols-2 dark:text-white ">
        <div className=" text-center flex flex-col items-center justify-center bg-neutral-700 border-neutral-500 border-2 rounded-2xl py-8 px-4">
          <dd className="text-center text-gray-500 dark:text-gray-400 mb-4">
            عدد الايات التي تم حفظها
          </dd>
          <dt className=" text-3xl font-extrabold">{insights?.MemVer}</dt>
        </div>
        <div className="flex flex-col items-center justify-center bg-neutral-700 border-neutral-500 border-2 rounded-2xl py-8 px-4">
          <dd className="text-center text-gray-500 dark:text-gray-400 mb-4">
            عدد الايات التي تم مراجعتها
          </dd>
          <dt className=" text-3xl font-extrabold">{insights?.RevVer}</dt>
        </div>
        <div className="flex flex-col items-center justify-center bg-neutral-700 border-neutral-500 border-2 rounded-2xl py-8 px-4">
          <dd className="text-center text-gray-500 dark:text-gray-400 mb-4">
           عدد الأيام المتبقية 
          </dd>
          <dt className=" text-3xl font-extrabold">{insights?.RestDays}</dt>
        </div>
        <div className="flex flex-col items-center justify-center bg-neutral-700 border-neutral-500 border-2 rounded-2xl py-8 px-4">
          <dd className="text-center text-gray-500 dark:text-gray-400 mb-4">
            أنهيت من الخطة
          </dd>
          <dt className=" text-3xl font-extrabold">{(insights?.DoneDays)}</dt>
        </div>
      </dl>

      <a href="/dailylog"    type="button" className="flex w-full font-readex text-center items-center justify-center my-4 text-yellow-100 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5  mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800 h-16">تابع سجلك اليومي</a>


      {/*       
      <div className='grid grid-cols-2 gap-4 '>
        <InfoCard />
        <InfoCard />
        <InfoCard />

      </div> */}
    </section>
  );
};

export default Hero;
