
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
