const dateinput = document.querySelector("#date-input")
const errorMessage = document.querySelector(".error-message")
const checkBtn = document.querySelector(".check-btn")
const resultMessage = document.querySelector(".result-message")

errorMessage.style.display="none"

checkBtn.addEventListener('click', checkPalindrome)


function checkPalindrome() {
    let dateInputValue = dateinput.value.split("-");
    let date = {
      day: Number(dateInputValue[2]),
      month: Number(dateInputValue[1]),
      year: Number(dateInputValue[0])
    };
  
    let ifPalindrome = checkPalindromeForAllDateFormate(date);
    if(dateInputValue==""){
        resultMessage.style.display = 'none';
        errorMessage.style.display="block"
    }
    else if (ifPalindrome) {
        errorMessage.style.display="none"
      resultMessage.style.display = 'block';
      resultMessage.innerHTML = `<h3>✨ Your Birthday is Palindrome. ✨</h3>`;
    } else {
      let [countNext, nextDate] = getNextPalindromeDate(date);
      resultMessage.style.display = 'block';
      errorMessage.style.display="none"
      resultMessage.innerHTML = `<p>Aww! Your birthday is not a palindrome. The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}.
           You missed it by ${countNext} day/s. 😔</p>`;
    }
  }



function reverseStr(str) {
    let listOfChar = str.split("")
    let reverseListOfChar = listOfChar.reverse()
    let reverseStr = reverseListOfChar.join("")
    return reverseStr
}

function isPalindrome(str) {
    let reverse = reverseStr(str)
    return reverse === str
}

function convertDateToStr(date) {
    let dateStr = { day: '', month: '', year: '' }

    if (date.day < 10) {
        dateStr.day = "0" + date.day
    } else {
        dateStr.day = date.day.toString()
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month
    } else {
        dateStr.month = date.month.toString()
    }

    dateStr.year = date.year.toString()

    return dateStr
}


function getAllDateFormate(date) {
    let dateStr = convertDateToStr(date)

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeForAllDateFormate(date) {
    let listOfAllDateFormate = getAllDateFormate(date)

    let palindromeCheck = false

    for (let i = 0; i < listOfAllDateFormate.length; i++) {
        if (isPalindrome(listOfAllDateFormate[i])) {
            palindromeCheck = true
        }
    }
    return palindromeCheck
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true
    }
    if (year % 100 === 0) {
        return false
    }
    if (year % 4 === 0) {
        return true
    }
    return false
}


function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;
  
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  
    if (month > 12) {
      month = 1;
      year++;
    }
  
    return {
      day: day,
      month: month,
      year: year,
    };
  }

  
  function getNextPalindromeDate(date) {
    let count = 0;
    let nextDate = getNextDate(date);
  
    while (1) {
      count++;
      let isPalindrome = checkPalindromeForAllDateFormate(nextDate);
      if (isPalindrome) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }
  
    return [count, nextDate];
  }
  
  