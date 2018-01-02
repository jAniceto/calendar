link_begin = '<a class="linkout" target="_blank" href="http://liturgia.pt/liturgiadiaria/dia.php?data='
link_middle = '">'
link_end = '</a>'

cal_days_labels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
cal_months_labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
               'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
               'Outubro', 'Novembro', 'Dezembro'];
// these are the days of the week for each month, in order
cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// this is the current date
//cal_current_date = new Date(); original
cal_current_date = new Date("January 1, 2018 11:11:00");


function Calendar(month, year) {
  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
  this.year = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
  this.html = '';
}


Calendar.prototype.generateHTML = function () {

  // get first day of month
  var firstDay = new Date((new Date().getFullYear(), 0, 1));
  //var firstDay = new Date(this.year, this.month, 1);
  var startingDay = firstDay.getDay();

  // find number of days in month
  var monthLength = cal_days_in_month[this.month];

  // compensate for leap year
  if (this.month == 1) { // February only!
      if ((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0) {
          monthLength = 29;
      }
  }

  // do the header
  var html = ""
  for(var cal=0; cal<12; cal++){
   var curr = new Date(this.year, (this.month+cal), 1);
   var startingDay = curr.getDay();
    var monthName = cal_months_labels[this.month+cal];
    var monthLength = cal_days_in_month[this.month+cal];
    html += '<table class="calendar-table" id="' + monthName + '" >';
    html += '<tr><th colspan="7">';
    html += monthName + "&nbsp;" + this.year;
    html += '</th></tr>';
    html += '<tr class="calendar-header">';
    for (var i = 0; i <= 6; i++) {
        html += '<td class="calendar-header-day">';
        html += cal_days_labels[i];
        html += '</td>';
    }
    html += '</tr><tr>';

    // fill in the days
    var day = 1;
    // this loop is for is weeks (rows)
    for (var i = 0; i < 9; i++) {
        // this loop is for weekdays (cells)
        for (var j = 0; j <= 6; j++) {
            html += '<td class="calendar-day">';
            if (day <= monthLength && (i > 0 || j >= startingDay)) {
                html += link_begin + cal_current_date.getFullYear() + '-' + (this.month + cal + 1).toString() + '-' + day.toString() + link_middle + day.toString() + link_end;
                day++;
            }
            html += '</td>';
        }
        // stop making rows if we've run out of days
        if (day > monthLength) {
            break;
        } else {
            html += '</tr><tr>';
        }
    }
    html += '</tr></table>';

  }//end of calendar loop

  this.html = html;

}

Calendar.prototype.getHTML = function () {
  return this.html;
}

var cal = new Calendar();
cal.generateHTML();
document.getElementById("calendar").innerHTML = cal.getHTML()


// Added
var current_date = new Date();
var current_month = cal_months_labels[current_date.getMonth()]

for (var i = 0; i <= 11; i++) {
var cal_obj_month = document.getElementsByClassName('calendar-table')[i].id
  if (cal_obj_month == current_month) {
    document.getElementById(cal_obj_month).className += ' activemonth'
  }
}


// Next and previous month buttons
function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

document.getElementById('next').addEventListener("click", function(){
  for (var i = 0; i <= 11; i++) {
    var cal_obj = document.getElementsByClassName('calendar-table')[i]
    if (hasClass(cal_obj, 'activemonth')) {
      if (cal_obj.id === 'Dezembro') {break;}
      cal_obj.className = 'calendar-table'
      var cal_obj_next = document.getElementsByClassName('calendar-table')[i+1]
      cal_obj_next.className += ' activemonth'
      break;
    }
  }
});

document.getElementById('previous').addEventListener("click", function(){
  for (var i = 0; i <= 11; i++) {
    var cal_obj = document.getElementsByClassName('calendar-table')[i]
    if (hasClass(cal_obj, 'activemonth')) {
      if (cal_obj.id === 'Janeiro') {break;}
      cal_obj.className = 'calendar-table'
      var cal_obj_previous = document.getElementsByClassName('calendar-table')[i-1]
      cal_obj_previous.className += ' activemonth'
      break;
    }
  }
});

// Highlight current day
var cal_day = document.getElementsByClassName('calendar-day')
for (var i = 0; i <= cal_day.length-1; i++) {
  if (typeof cal_day[i].getElementsByClassName("linkout")[0] !== 'undefined') {
    if (cal_day[i].getElementsByClassName("linkout")[0].innerHTML == current_date.getDate()) {
      if (cal_day[i].parentNode.parentNode.parentNode.id === cal_months_labels[current_date.getMonth()]) {
        cal_day[i].className += ' currentday'
      }
    }
  }
}
