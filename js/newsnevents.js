// Filter News & Events Posts
function filter() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("filter");
  filter = input.value.toUpperCase();
  table = document.getElementById("newsnevents");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}



function convertResponseToJson(response) {
  return response.json()
}

const newsneventsTable = document.getElementById("newsnevents")

// Populate News & Events Table
function addNewsnEventsToSection(newsneventsArr, id, date) {
  for ( const newsnevent of newsneventsArr ) {
      console.log('test', newsnevent.id, newsnevent.date, newsnevent.author)
      const tr = document.createElement('tr') 
      tr.id = newsnevent.id;  
      const td = document.createElement('td') 
      const post = document.createElement('div')
      post.id = "post";
      const title = document.createElement('h3')
      title.classList.add('post-title')
      title.innerHTML = newsnevent.title;
      const author = document.createElement('p')
      author.classList.add('post-author')
      author.innerHTML = newsnevent.author;
      const date = document.createElement('p')
      date.classList.add('post-date')
      date.innerHTML = newsnevent.date;
      const content = document.createElement('div')
      content.classList.add('content')
      const text = document.createElement('p')
      text.innerHTML = newsnevent.content;
      content.appendChild(text)
      post.appendChild(title)
      post.appendChild(author)
      post.appendChild(date)
      post.appendChild(content)
      td.appendChild(post)
      tr.appendChild(td) 
      newsneventsTable.appendChild(tr)
  }  
  // Read More function
  var lineHeight = 20;
  var lines = 2;

  $('.content').readmore({
    speed: 500,
    collapsedHeight: lineHeight * lines,
    embedCSS: false
  });
}

// Retrieve newsnevents db
function renderAllNewsnEvents(id, date) {
  fetch('/newsnevents.json')
    .then(convertResponseToJson)
    .then(function(newsneventsArr) {
      addNewsnEventsToSection(newsneventsArr, id, date)
    });
}

renderAllNewsnEvents()