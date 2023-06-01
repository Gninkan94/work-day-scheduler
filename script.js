// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var localSettings = {};
dayjs.locale(localSettings);
$(function () {
  //lets get the cureent hour 
  var currentHour = dayjs().format('H');

  //this function change the hour color of each time block
  function hourColor() {
    $('.time-block').each(function () {
      const blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }

  //lets save the users input

  function userInput() {
    $('.saveBtn').on('click', function () {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }

  //lets change the color

  function changeColor() {
    $('.time-block').each(function () {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (blockHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }


  //Save the user input from localStorage

  $('.time-block').each(function () {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  //the display of current date and time 

  function updateTime() {
    const dateElement = $('#date');
    const timeElement = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }
// call back the major functions
  hourColor();
  userInput();
  changeColor();

  setInterval(updateTime, 1000);

});




