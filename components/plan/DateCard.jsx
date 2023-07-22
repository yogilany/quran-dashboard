'use client'

import React from 'react'

function formatDateToArabic(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    calendar: 'gregory',
    numberingSystem: 'arab',
  };

  const formattedDate = new Intl.DateTimeFormat('ar-EG', options).format(date);
  return formattedDate;
}

function getDateAfterDays( daysToAdd) {
  const startDate = new Date(); // Current date

  const date = new Date(startDate);
  date.setDate(date.getDate() + daysToAdd);
  return formatDateToArabic(date);
}



const DateCard = ({title,number}) => {
  return (
    <div className="ml-4 my-4 inline-block py-2 px-4 md:py-4 md:px-8  bg-teal-800 hover:bg-teal-700 border-teal-500 border-2 rounded-2xl  flex-col justify-center text-center w-fit">
  <h1 className="text-sm font-normal px-4 py-2  rounded-xl font-readex text-teal-400 ">{title}</h1>
  <h3 className="text-lg font-medium px-4 py-2  rounded-xl font-readex text-neutral-200">{getDateAfterDays(number)}</h3>
</div>
  )
}

export default DateCard