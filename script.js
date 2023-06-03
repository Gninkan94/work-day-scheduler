// Going to w rap all code that interacts with the DOM in a call to jQuery to ensure that
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
      var blockHour = parseInt(this.id);
      $(this).toggleClass('past', blockHour < currentHour);
      $(this).toggleClass('present', blockHour === currentHour);
      $(this).toggleClass('future', blockHour > currentHour);
    });
  }

  //lets save the users input

  function userInput() {
    $('.saveBtn').on('click', function () {
      var key = $(this).parent().attr('id');
      var value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);

      $('#saved').addClass('show');
      
      setTimeout(function(){
        $('#saved').removeClass('show');

      }, 5000)

// I added this function to display my credit at the bottom of the page I LOVE IT.
      $('#foot').addClass('show');
      
      setTimeout(function(){
        $('#foot').removeClass('show');

      }, 8000)
      
    });
  }

  //lets change the color 

  function changeColor() {
    $('.time-block').each(function () {
      var blockHour = parseInt(this.id);
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
    var key = $(this).attr('id');
    var value = localStorage.getItem(key);
    $(this).children('.description').val(value);
    
  });

  //this function display the  current date and time 

  function updateTime() {
    var dateElement = $('#date');
    var timeElement = $('#time');
    var currentDate = dayjs().format('dddd, MMMM D, YYYY');
    var currentTime = dayjs().format('hh:mm:ss A');
    dateElement.text(currentDate);
    timeElement.text(currentTime);
  }
// call back the major functions
  hourColor();
  userInput();
  changeColor();
//this will show the time live with deduction by two seconds
  setInterval(updateTime, 2000);

});




