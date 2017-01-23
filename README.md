# calendar

A Javascript current year calendar with links on every day.


### Purpose

This calendar was created to ser as a widget on blogspot. You can see it at work [here](http://ocantonaliturgia.blogspot.pt/2017/01/domingo-v-do-tempo-comum-ano-a.html).


### Modifyong or removing the links

You can remove the links on each day by changing line 69 of the scripts.js file from:

    html += link_begin + cal_current_date.getFullYear() + '-' + (this.month + cal + 1).toString() + '-' + day.toString() + link_middle + day.toString() + link_end;
    
to:

    html += day;

You can also edit the links as you wish by editing the variables link_begin, link_middle, and link_end at the top of the scripts.js file.
