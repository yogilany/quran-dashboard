"use client";

import React, { useEffect, useState } from "react";
import DurationButton from "./DurationButton";

const GeneratePlan = ({ handleGeneration,setIsLoading }) => {
  const [totalMonths, setTotalMonths] = useState(0);
  const [months, setMonths] = useState(null);
  const [years, setYears] = useState(null);

  function calculateMonths(e) {
    if (e.target.name === "years" && e.target.value > -1) {
      setYears(parseInt(e.target.value));
      setTotalMonths(parseInt(months + years * 12));
    } else if (e.target.name === "months" && e.target.value > -1) {
      if (e.target.value > 12) {
        setMonths(12);
      }
      setMonths(parseInt(e.target.value));
      setTotalMonths(parseInt(months + years * 12));
    }

    // console.log(totalMonths)
  }

  const handleGenerate =  async () => {
   
    await handleGeneration(months, years);
    
  }

  const handleClickScroll = () => {
    const element = document.getElementById("section-1");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };



  function handleDuration(e) {
    switch (e) {
      case 6:
        setYears(6);
        setMonths(0);

        break;
      case 5:
        setYears(5);
        setMonths(0);
        break;
      case 4:
        setYears(4);
        setMonths(0);
        break;
      case 2:
        setYears(2);
        setMonths(0);
        break;

      default:
        break;
    }
  }

  return (
    <section className="pt-8 bg-center   ">
      <div className="pt-8 px-4 mx-auto max-w-screen-xl min-h-max text-center lg:pt-16 lg:px-12">
        <h1 className=" font-readex mb-12 mt-8 text-2xl leading-10 md:text-4xl lg:text-4xl font-extrabold  text-neutral-900  dark:text-white">
          ما المدة التقريبية التي ترغب في حفظ القرآن فيها؟
        </h1>

        <div>
          <DurationButton
            handleDuration={handleDuration}
            value={6}
            title={"كما الشيخ عبدالباسط عبدالصمد"}
            number={"ست سنــــــــــــــوات"}
            color={"neutral"}
          />
          <DurationButton
            handleDuration={handleDuration}
            value={5}
            title={"الأكثر شيوعاً"}
            number={"خمس سنوات"}
            color={"teal"}
          />
          {/* <DurationButton handleDuration={handleDuration} value={2} title={"الحد الأدنى الموصى به"} number={"سنتــــان"} color={"teal"} /> */}

          <DurationButton
            handleDuration={handleDuration}
            value={4}
            title={"كما الشيخ محمود خليل الحصري"}
            number={"أربع سنــــــــــــــوات"}
          />
        </div>

        <div className="mt-4  border-neutral-200 dark:border-neutral-700  ">
          <div className="text-center flex flex-col justify-center items-center mb-4">
            <h1 className="   text-lg font-normal px-4 py-4 font-readex text-neutral-400">
              أو حدد المدة التي ترغب بها
            </h1>
            <div className="w-48 border-b border-neutral-500" />
          </div>
          {/* <div className="border-b border-neutral-500 w-48 text-center items-center justify-center " /> */}
          <div className="flex flex-row w-full justify-center ">
            <div className="flex flex-col  text-center mr-20 mt-4 w-48 mx-4  ">
              <label
                htmlFor="years"
                className=" font-readex w-32 mb-2 text-sm font-medium text-neutral-900 dark:text-white"
              >
                عدد السنين
              </label>
              <input
                onChange={(e) => calculateMonths(e)}
                type="number"
                name="years"
                id="years"
                value={years}
                aria-describedby="helper-text-explanation"
                className=" font-readex bg-neutral-50 border text-center border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="٢"
              />
            </div>
            <div className="flex flex-col text-center ml-20 my-4 w-48 mx-4 ">
              <label
                htmlFor="months"
                className=" font-readex w-32 block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
              >
                عدد الأشهر
              </label>
              <input
                max={12}
                onChange={(e) => calculateMonths(e)}
                type="number"
                name="months"
                id="months"
                value={months}
                aria-describedby="helper-text-explanation"
                className="font-readex bg-neutral-50 border text-center border-neutral-300 text-neutral-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32  p-2.5  dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="٤"
              />
            </div>
          </div>
          <h1 className="   text-sm font-light px-4 py-4 font-readex text-neutral-400">
            الحد الأدنى الموصى به هو سنتان
          </h1>

           <button
            onClick={() => {    
              setIsLoading(true);
              handleGenerate();}}
            type="button"
            className="font-readex  text-white bg-gradient-to-br from-teal-700 to-teal-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-0 dark:focus:bg-neutral-600 focus:bg-neutral-600 font-normal rounded-2xl text-lg px-8 py-4 text-center  mb-2"
          >
            إنشاء الخطة
          </button> 
          
        </div>
      </div>
    </section>
  );
};

export default GeneratePlan;
