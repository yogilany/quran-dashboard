"use client";

import React from "react";
import { useEffect, useState } from "react";
import DetailsCard from "./DetailsCard";
import DateCard from "./DateCard";
import PlanEntry from "./PlanEntry";
import RegisterPlanModal from "./RegisterPlanModal";
import VersesCard from "./VersesCard";
import { useSession } from "next-auth/react";
import SignInModal from "./SignInModal";
const quranVerses = 6236;

const Result = ({ plan }) => {
  const { data: session } = useSession();
  const [totalDaysInPlan, setTotalDaysInPlan] = useState(0);
  const [_totalYears, setTotalYears] = useState(0);
  const [_totalMonths, setTotalMonths] = useState(0);
  const [totalMemoDays, setTotalMemoDays] = useState(0);
  const [totalRevDays, setTotalRevDays] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [PlanFound,setIsPlanFound] =  useState(false);

  const openModal = () => {
    setIsLoading(true);
    session ? setIsModalOpen(true) : setIsSignInModalOpen(true);
    setIsLoading(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSignInModalOpen(false);
  };


  const isPlanFound = async () => {
    var url = "/api/plan/isfound";
    var params = {
      userID: session?.user?.id,
    };
    var queryString = Object.keys(params)
      .map((key) => key + "=" + encodeURIComponent(params[key]))
      .join("&");
    url = url + "?" + queryString;

    const res = await fetch(url);

    // const res = await fetch(`/api/plan/${session?.user.id}`);
    const data = await res.json();
    // console.log("ne dat", data);
    setIsPlanFound(data);
  };

  useEffect(() => {
    const totalMemorizationDays = plan.filter(
      (day) => day.task == "حفظ"
    ).length;
    const totalRevisionDays = plan.filter(
      (day) => day.task != "حفظ" && day.task != "أجازة"
    ).length;
    const totalDays = plan.length;
    setTotalDaysInPlan(totalDays);

    setTotalMemoDays(totalMemorizationDays);
    setTotalRevDays(totalRevisionDays);

    const totalMonths = parseInt(totalDays / 30);
    const totalYears = parseInt(totalMonths / 12);
    const remindMonths = parseInt(totalMonths % 12);
    setTotalYears(totalYears);
    setTotalMonths(remindMonths);

    const element = document.getElementById("section-1");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  });

  useEffect(() => {
    if (session) {
      isPlanFound();
    }
  }, [session]);



  return (
    <section className="py-8 bg-center ">
      <div
        id="section-1"
        className="py-8 px-0 md:px-4 mx-auto max-w-screen-xl min-h-max text-right lg:py-16 lg:px-12"
      >
        <h1 className=" font-readex mb-4 mt-8 text-6xl md:text-8xl font-extrabold     text-white">
          خطة التحفيظ
        </h1>
        <h1 className=" font-readex mb-4 mt-8 text-2xl md:text-4xl font-medium  text-teal-400">
          خلال <span className="text-white">{totalDaysInPlan}</span>{" "}
          يـــــــــــــــــــــوم{" "}
        </h1>
        <DateCard title={"ستنتهي من ختمة القرآن في"} number={totalDaysInPlan} />
        <DetailsCard title={"عدد أيام الحفظ"} number={totalMemoDays} />

        <DetailsCard title={"عدد أيام المراجعة"} number={totalRevDays} />
        <VersesCard
          title={"وِرد الحفظ اليومي"}
          number={parseInt(quranVerses / totalMemoDays)}
        />

        <button
          onClick={openModal}
          type="button"
          className="block font-readex text-yellow-100  focus:ring-4  font-medium rounded-lg text-md px-8 py-4  my-8  bg-yellow-600  hover:bg-yellow-700 focus:outline-none  focus:ring-yellow-800"
        >
         {
          isloading ? "جاري التحميل..." : " تسجيل الخطة"
         }
        </button>

        <div className="mt-4   border-neutral-700 ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          
            {plan.map((day,index) => {
              return (
                <PlanEntry key={index} day={day} session={session} isRegistered={false} />
              );
            })}

          </div>
        </div>
      </div>
      <RegisterPlanModal
        isOpen={isModalOpen}
        onClose={closeModal}
        plan={plan}
        isPlanFound={PlanFound}
      ></RegisterPlanModal>
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={closeModal}
        plan={plan}
      />
    </section>
  );
};

export default Result;
