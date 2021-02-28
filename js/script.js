/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   let itemsPerPage = 9;
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = (page * itemsPerPage);
   let studentList = document.getElementsByClassName('student-list')[0];
   studentList.innerHTML = "";
   let currentStudent;

   for(let i = startIndex; i < endIndex; i++) {
      currentStudent = list[i];
      if(currentStudent){
      studentList.insertAdjacentHTML('beforeend', 
   `<li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src=${currentStudent.picture.large} alt="Profile Picture">
        <h3>${currentStudent.name.title}. ${currentStudent.name.first} ${currentStudent.name.last}</h3>
        <span class="email">${currentStudent.email}</span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${currentStudent.registered.date}</span>
      </div>
    </li>`
      )
      }
   }
 }


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
   let itemsPerPage = 9;
   numOfPages = Math.ceil(list.length / itemsPerPage);
   let linkList = document.getElementsByClassName('link-list')[0];
   linkList.innerHTML = "";
   
   for(let i = 1; i <= numOfPages; i++) {
      linkList.insertAdjacentHTML('beforeend' , 
      `<li>
         <button type="button">${i}</button>
      </li>`
      )
      document.querySelectorAll("button")[1].className = 'active';
   }
 
   linkList.addEventListener('click', function(event) {
      if(event.target.tagName === 'button'); {
         document.querySelector(".active").className = '';
         event.target.className = 'active';
         showPage(list,event.target.textContent);
      }
   });
}

//add search bar

document.querySelector('header').insertAdjacentHTML('beforeend',
`<label for="search" class="student-search">
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`
)

//on-click search event-listener

document.querySelectorAll('button')[0].addEventListener('click', searchFunction);

//on-key-up search event-listener

document.querySelectorAll('input')[0].addEventListener('keyup', searchFunction);

//search-function

function searchFunction() {
   let input = document.getElementById("search").value.toLowerCase().toString();
   var data2 = [];
   data2Index = 0;
   searchString = '';
   if(input === ''){
      showPage(data,1);
      addPagination(data);
   } else {
   for(let i = 0; i < data.length; i++) {
      searchString = `${data[i].name.first.toString().toLowerCase()}${data[i].name.last.toString().toLowerCase()}`;
      if(searchString.includes(input)) {
         data2.push(data[i])
      }
   }
   if(data2[0]) {
      showPage(data2,1);
      addPagination(data2);
   } else {
      let studentList = document.getElementsByClassName('student-list')[0];
      studentList.innerHTML = "";
      studentList.insertAdjacentHTML('beforeend', `<p class="no-results">No Results Found<p>`);
   }
   }
}
// Call functions

showPage(data,1);
addPagination(data);