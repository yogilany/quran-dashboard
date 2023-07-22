export const generatePlan = (totalMonths) => {
  const quranVerses = 6236;
  const momorizationDays = 4 * 6 * 2;

  const monthsCount = totalMonths;
  const pairMonthsCount = Math.floor(monthsCount / 2);
  const versesPerDay = Math.ceil(
    quranVerses / (pairMonthsCount * momorizationDays)
  );
  const revisionVersesPerDay = Math.ceil((versesPerDay * 4 * 6 * 2) / 6);

  var daysLog = new Array();

  const dayOffset = (weekIndex, monthIndex, pairMonthIndex) =>
    weekIndex * 6 * versesPerDay +
    monthIndex * 24 * versesPerDay +
    pairMonthIndex * 48 * versesPerDay;

  console.log("Generating");
  var currentEnd = 0;

  for (var pair = 0; pair < pairMonthsCount && quranVerses - currentEnd > 3; pair++) {
    const pairMonthOffset = pair * 60;

    for (var month = 0; month < 2 && quranVerses - currentEnd > 3 ; month++) {
      for (var week = 0; week < 4 && quranVerses - currentEnd > 3; week++) {
        for (var day = 0; day < 6 && quranVerses - currentEnd > 3; day++) {
          if (
            day * versesPerDay + 1 + dayOffset(week, month, pair) <
            quranVerses
          ) {
            daysLog.push({
              day: day + 1 + week * 7 + month * 30 + pair * 60 + pair * 7,
              task: "حفظ",
              from: day * versesPerDay + 1 + dayOffset(week, month, pair),
              to:
                day * versesPerDay +
                  versesPerDay +
                  dayOffset(week, month, pair) <
                quranVerses
                  ? day * versesPerDay +
                    versesPerDay +
                    dayOffset(week, month, pair)
                  : quranVerses,
              done: false,
            });
            currentEnd = day * versesPerDay +
            versesPerDay +
            dayOffset(week, month, pair) <
          quranVerses
            ? day * versesPerDay +
              versesPerDay +
              dayOffset(week, month, pair)
            : quranVerses;
          }
        }
        // console.log("TEST: week",week,"day",day)
        daysLog.push({
          day: 7 + week * 7 + month * 30 + pairMonthOffset + pair * 7 - (6-day),
          task: "مراجعة إسبوعية",
          from: 1 + dayOffset(week, month, pair) < quranVerses ? 1 + dayOffset(week, month, pair) : quranVerses,
          to:
            6 * versesPerDay + dayOffset(week, month, pair) < quranVerses
              ? 6 * versesPerDay + dayOffset(week, month, pair)
              : quranVerses,
          done: false,
        });
      }

      daysLog.push({
        day: month * 30 + 4 * 7 + 1 + pairMonthOffset + pair * 7 - (4-week)*7 - (6-day),
        task: "مراجعة شهرية",
        from: 1 + month * 24 * versesPerDay + pair * 48 * versesPerDay,
        to:
          dayOffset(2, month, pair) < quranVerses
            ? dayOffset(2, month, pair)
            : quranVerses,
        done: false,
      });

      daysLog.push({
        day: month * 30 + 4 * 7 + 1 + pairMonthOffset + pair * 7 - (4-week)*7 - (6-day),
        task: "مراجعة شهرية",
        from: 1 + month * 24 * versesPerDay + pair * 48 * versesPerDay + ((dayOffset(2, month, pair)) - ( 1 + month * 24 * versesPerDay + pair * 48 * versesPerDay) ) + 1,
        to:
          dayOffset(4, month, pair) < quranVerses
            ? dayOffset(4, month, pair)
            : quranVerses,
        done: false,
      });

      // daysLog.push({
      //   day: month * 30 + 4 * 7 + 2 + pairMonthOffset + pair * 7 - (4-week)*7 - (6-day),
      //   task: "أجازة",
      //   done: false,
      // });
    }

    console.log("TEST: month",month,"week",week,"day",day)

    for (var revisionDay = 0; revisionDay < 6 ; revisionDay++) {
      daysLog.push({
        day: (pair + 1) * 60 + revisionDay + 1 + pair * 7 - (2-month)*30 - (4-week)*7 - (6-day),
        task: "مراجعة الشهرين السابقين",
        from:
          1 +
          revisionVersesPerDay * revisionDay +
          pair * revisionVersesPerDay * 6,
        to:
          revisionVersesPerDay * (revisionDay + 1) +
            pair * revisionVersesPerDay * 6 >
          quranVerses
            ? quranVerses
            : revisionVersesPerDay * (revisionDay + 1) +
              pair * revisionVersesPerDay * 6,
        done: false,
      });

      if(revisionVersesPerDay * (revisionDay + 1) +
      pair * revisionVersesPerDay * 6 >
    quranVerses){
      break;
    }
    }

    if(quranVerses - currentEnd > 3){
daysLog.push({
      day: (pair + 1) * 60 + revisionDay + 1 + pair * 7 - (2-month)*30 - (4-week)*7 - (6-day),
      task: "أجازة",
      done: false,
    }) 
  }
  

}

  console.log(daysLog);
  return(daysLog);


  

};

export const formatDateToArabic = (date)  => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
      calendar: 'gregory',
      numberingSystem: 'arab',
    };
  
    const formattedDate = new Intl.DateTimeFormat('ar-EG', options)?.format(date);
    return formattedDate;
  };

export function getDateAfterDays( daysToAdd) {
    const startDate = new Date(); // Current date

    const date = new Date(startDate);
    date.setDate(date.getDate() + daysToAdd);
    return formatDateToArabic(date);
  }

export function getSurahInfo(ayahNumber) {
    // An array containing the number of verses in each surah of the Quran
    const versesPerSurah = [
        7,    // Al-Fatiha
        286,  // Al-Baqarah
        200,  // Aal-E-Imran
        176,  // An-Nisa
        120,  // Al-Maidah
        165,  // Al-An'am
        206,  // Al-A'raf
        75,   // Al-Anfal
        129,  // Al-Tawbah
        109,  // Yunus
        123,  // Hud
        111,  // Yusuf
        43,   // Ar-Ra'd
        52,   // Ibrahim
        99,   // Al-Hijr
        128,  // An-Nahl
        111,  // Al-Isra
        110,  // Al-Kahf
        98,   // Maryam
        135,  // Ta-Ha
        112,  // Al-Anbiya
        78,   // Al-Hajj
        118,  // Al-Muminun
        64,   // An-Nur
        77,   // Al-Furqan
        227,  // Ash-Shu'ara
        93,   // An-Naml
        88,   // Al-Qasas
        69,   // Al-Ankabut
        60,   // Ar-Rum
        34,   // Luqman
        30,   // As-Sajda
        73,   // Al-Ahzab
        54,   // Saba
        45,   // Fatir
        83,   // Ya-Sin
        182,  // As-Saffat
        88,   // Sad
        75,   // Az-Zumar
        85,   // Ghafir
        54,   // Fussilat
        53,   // Ash-Shura
        89,   // Az-Zukhruf
        59,   // Ad-Dukhan
        37,   // Al-Jathiya
        35,   // Al-Ahqaf
        38,   // Muhammad
        29,   // Al-Fath
        18,   // Al-Hujurat
        45,   // Qaf
        60,   // Adh-Dhariyat
        49,   // At-Tur
        62,   // An-Najm
        55,   // Al-Qamar
        78,   // Ar-Rahman
        96,   // Al-Waqia
        29,   // Al-Hadid
        22,   // Al-Mujadila
        24,   // Al-Hashr
        13,   // Al-Mumtahina
        14,   // As-Saff
        11,   // Al-Jumua
        11,   // Al-Munafiqun
        18,   // At-Taghabun
        12,   // At-Talaq
        12,   // At-Tahrim
        30,   // Al-Mulk
        52,   // Al-Qalam
        52,   // Al-Haqqa
        44,   // Al-Ma'arij
        28,   // Nuh
        28,   // Al-Jinn
        20,   // Al-Muzzammil
        56,   // Al-Muddathir
        40,   // Al-Qiyama
        31,   // Al-Insan
        50,   // Al-Mursalat
        40,   // An-Naba
        46,   // An-Naziat
        42,   // Abasa
        29,   // At-Takwir
        19,   // Al-Infitar
        36,   // Al-Mutaffifin
        25,   // Al-Inshiqaq
        22,   // Al-Buruj
        17,   // At-Tariq
        19,   // Al-Ala
        26,   // Al-Ghashiya
        30,   // Al-Fajr
        20,   // Al-Balad
        15,   // Ash-Shams
        21,   // Al-Lail
        11,   // Ad-Duha
        8,    // Al-Inshirah
        8,    // At-Tin
        19,   // Al-Alaq
        5,    // Al-Qadr
        8,    // Al-Bayyina
        8,    // Az-Zalzala
        11,   // Al-Adiyat
        11,   // Al-Qaria
        8,    // At-Takathur
        3,    // Al-Asr
        9,    // Al-Humaza
        5,    // Al-Fil
        4,    // Al-Quraish
        7,    // Al-Ma'un
        3,    // Al-Kawthar
        6,    // Al-Kafirun
        3,    // An-Nasr
        5,    // Al-Lahab
        4,    // Al-Ikhlas
        5     // Al-Falaq
      ];
  
    // If the ayahNumber is not within the valid range, return null
    if (ayahNumber < 1 || ayahNumber > 6236) {
      return null;
    }
  
    let currentAyah = ayahNumber;
    let currentSurah = 1;
  
    // Find the corresponding surah for the given ayahNumber
    while (currentSurah <= versesPerSurah.length) {
      if (currentAyah <= versesPerSurah[currentSurah - 1]) {
        break;
      }
      currentAyah -= versesPerSurah[currentSurah - 1];
      currentSurah++;
    }
  
    // Return an object with the name of the surah and the number of ayah in that surah
    const surahNamesArabic = [
        "الفاتحة",
        "البقرة",
        "آل عمران",
        "النساء",
        "المائدة",
        "الأنعام",
        "الأعراف",
        "الأنفال",
        "التوبة",
        "يونس",
        "هود",
        "يوسف",
        "الرعد",
        "إبراهيم",
        "الحجر",
        "النحل",
        "الإسراء",
        "الكهف",
        "مريم",
        "طه",
        "الأنبياء",
        "الحج",
        "المؤمنون",
        "النور",
        "الفرقان",
        "الشعراء",
        "النمل",
        "القصص",
        "العنكبوت",
        "الروم",
        "لقمان",
        "السجدة",
        "الأحزاب",
        "سبأ",
        "فاطر",
        "يس",
        "الصافات",
        "ص",
        "الزمر",
        "غافر",
        "فصلت",
        "الشورى",
        "الزخرف",
        "الدخان",
        "الجاثية",
        "الأحقاف",
        "محمد",
        "الفتح",
        "الحجرات",
        "ق",
        "الذاريات",
        "الطور",
        "النجم",
        "القمر",
        "الرحمن",
        "الواقعة",
        "الحديد",
        "المجادلة",
        "الحشر",
        "الممتحنة",
        "الصف",
        "الجمعة",
        "المنافقون",
        "التغابن",
        "الطلاق",
        "التحريم",
        "الملك",
        "القلم",
        "الحاقة",
        "المعارج",
        "نوح",
        "الجن",
        "المزمل",
        "المدثر",
        "القيامة",
        "الإنسان",
        "المرسلات",
        "النبأ",
        "النازعات",
        "عبس",
        "التكوير",
        "الإنفطار",
        "المطففين",
        "الإنشقاق",
        "البروج",
        "الطارق",
        "الأعلى",
        "الغاشية",
        "الفجر",
        "البلد",
        "الشمس",
        "الليل",
        "الضحى",
        "الشرح",
        "التين",
        "العلق",
        "القدر",
        "البينة",
        "الزلزلة",
        "العاديات",
        "القارعة",
        "التكاثر",
        "العصر",
        "الهمزة",
        "الفيل",
        "قريش",
        "الماعون",
        "الكوثر",
        "الكافرون",
        "النصر",
        "المسد",
        "الإخلاص",
        "الفلق",
        "الناس"
      ];
  
    return {
      surahName: surahNamesArabic[currentSurah - 1],
      ayahCount: currentAyah
    };
  }