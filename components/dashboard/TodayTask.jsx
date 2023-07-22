"use client";

import { formatDateToArabic, getSurahInfo } from "@/app/plan/plan.service";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const TodayTask = ({ plan, fetchPlan }) => {
  const { data: session } = useSession();

  const [isDone, setIsDone] = useState(false);
  const [todayTask, setTodayTask] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [undoTodayTask,setUndoTodayTask] = useState({})

  const [entryData, setEntryData] = useState({
    from: null,
    to: null,
    "from-surah": null,
    "to-surah": null,
  });
  const handleDone = async () => {
    setIsLoading(true);
    await updateDone("done");
  };

  
  const handleUndo = async () => {
    setIsLoading(true);
    console.log("in undo")
    await updateDone("undo");
  };
  const updateDone = async (type) => {

    setUndoTodayTask(todayTask);
    console.log("type",type)


    var url = "/api/plan/checkday";
    var params = {
      userId: session?.user?.id,
      dayToFind: type == "done" ? todayTask.day : undoTodayTask.day,
      doneValue: type == "done" ? true : false,
    };

    var queryString = Object.keys(params)
      .map((key) => key + "=" + encodeURIComponent(params[key]))
      .join("&");
    url = url + "?" + queryString;

    const res = await fetch(url);
    fetchPlan();


    setIsLoading(false);
    setIsDone((isDone) => !isDone);
  };



  useEffect(() => {
    if (plan) {
      function findFirstIncompleteTask(plan) {
        for (const day of plan) {
          if (day.done === false) {
            setTodayTask(day);
            const fromData = getSurahInfo(day.from);
            const toData = getSurahInfo(day.to);

            console.log("from data", fromData);
            console.log("to data", toData);

            setEntryData({
              from: fromData?.ayahCount,
              to: toData?.ayahCount,
              "from-surah": fromData?.surahName,
              "to-surah": toData?.surahName,
            });

            break;
          }
        }
        // If no incomplete task is found, return null or handle the case as per your requirement.
        return null;
      }
      findFirstIncompleteTask(plan);
    }
  }, [plan]);
  return isDone ? (
    <div className="mb-4 flex py-4 px-8  bg-teal-800  border-teal-500 border-2 rounded-2xl  flex-col justify-center text-right ">
      <h1 className="font-readex text-teal-400 mb-4 font-medium text-xl">
        أحسنت!{" "}
      </h1>
      <h1 className="font-readex mb-2 text-white font-medium text-3xl">
        لقد أنهيت مهمة اليوم بنجاح.
      </h1>
      <h1 className="font-readex text-yellow-500 font-normal text-md">
        كافئ نفسك بعصير برتقال طازج.
      </h1>

      <button
        onClick={handleUndo}
        type="button"
        className=" font-readex my-4 text-neutral-100  focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-teal-800"
      >
        عودة
      </button>
    </div>
  ) : (
    <div className=" mb-4  flex py-4 px-8  bg-teal-800  border-teal-500 border-2 rounded-2xl  flex-col justify-center text-right ">
      <h1 className="font-readex text-teal-400 mb-4 font-medium text-xl">
        مهمة اليوم
      </h1>
      <h1 className="font-readex mb-2 text-white font-medium text-3xl">
        {todayTask.task}
      </h1>
      <h1 className="font-readex text-teal-100 font-light text-md">
        من سورة {entryData["from-surah"]} - الاية رقم {entryData.from} إلى سورة{" "}
        {entryData["to-surah"]} - الاية رقم {entryData.to}
      </h1>
      <button
        onClick={handleDone}
        type="button"
        className=" font-readex my-4 text-yellow-100 bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none dark:focus:ring-yellow-800"
      >
       {
        isLoading ? "جاري التسجيل..." : " أنهيت المهمة"
       }
      </button>

      <h1 className="font-readex text-white font-light text-md"></h1>
    </div>
  );
};

export default TodayTask;
