'use client'

import { formatDateToArabic, getDateAfterDays, getSurahInfo } from "@/app/plan/plan.service";
import React, { useEffect, useState } from "react";

const PlanEntry = ({date_created, day,session,isRegistered }) => {


  const [isLoading,setIsLoading] = useState(false)
  const [isDone,setIsDone] = useState(day.done)
  const [entryData, setEntryData] = useState({
    "from": null,
    "to": null,
    "from-surah": null,
    "to-surah": null
  })

  const handleDone = async () => {
    // console.log("set load true")
    setIsLoading(true);

    await updateDone();
  };

  const updateDone = async () => {

    var url = "/api/plan/checkday";
    var params = {
      userId: session?.user?.id,
      dayToFind: day.day,
      doneValue: !day.done,
    };
    // console.log("test params", params)

    var queryString = Object.keys(params)
      .map((key) => key + "=" + encodeURIComponent(params[key]))
      .join("&");
    url = url + "?" + queryString;

    const res = await fetch(url);

    // const res = await fetch(`/api/plan/${session?.user.id}`);
    // const data = await res;
    //   setPlan(data[0]?.plan);
      // console.log("result",res.status)
      // fetchPlan();
      // console.log("set load false")

    setIsLoading(false);
if(res.status==200){
  setIsDone((isDone) => !isDone);
}
  };

  useEffect(() => {

    const fromData = getSurahInfo(day.from);
    const toData = getSurahInfo(day.to);
    // console.log("from data", fromData);
    // console.log("to data", toData);
    setEntryData({
        "from": fromData?.ayahCount,
        "to": toData?.ayahCount,
        "from-surah": fromData?.surahName,
        "to-surah": toData?.surahName
    })

  }, []);

  return (
    <div
      className={`font-readex h-32 text-xs md:text-sm text-right text-neutral-400  border-b w-full px-2  sm:px-2 md:px-8    border-neutral-700  ${
        day.task == "أجازة" ? " bg-neutral-800s" : " bg-neutral-800s"
      } `}
    >
      <h1 className="py-4 text-light text-xs text-yellow-500"> {getDateAfterDays(day.day,date_created) }</h1>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col w-full">
          <h1
            scope="row"
            className="font-medium ml-8  whitespace-nowrap  text-white"
          >
            <span
              className={`text-md font-medium px-4 py-2 rounded-xl ${
                day.task == "حفظ"
                  ? "bg-teal-900 text-teal-300"
                  : day.task == "أجازة"
                  ? "bg-neutral-900 text-neutral-300"
                  : "bg-yellow-900 text-yellow-300"
              }`}
            >
              {day.task == "حفظ"
                ? "حفظ"
                : day.task == "مراجعة إسبوعية"
                ? " مراجعة إسبوعية "
                : day.task == "مراجعة شهرية"
                ? "مراجعة شهرية "
                : day.task == "مراجعة الشهرين السابقين"
                ? "مراجعة الشهرين السابقين "
                : day.task == "أجازة"
                ? "أجازة"
                : ""}
            </span>
          </h1>

          {day.task != "أجازة" ? <h1 className="my-4">
            من سورة {entryData["from-surah"]}{" "}
            <span className="text-neutral-300"> الاية رقم {entryData.from} </span> -
            إلى سورة {entryData["to-surah"]}{" "}
            <span className="text-neutral-300"> الاية رقم {entryData.to} </span>
          </h1> : null}
        </div>

        {isRegistered ? <div className="flex flex-row-reverse w-full">
         <button
         onClick={handleDone}
            type="button"
            className={`${isDone ? "teal_btn" : "transparent_btn"}`}
          >
            {isLoading ? "جاري التحديث" : "تمـــــــــــــت"}
          </button>
        </div> : null}
      </div>
    </div>
  );
};

export default PlanEntry;
