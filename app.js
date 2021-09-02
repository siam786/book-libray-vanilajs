//spiner add
const spinner = (displayspinner) => {
  document.getElementById("spinner").style.display = displayspinner;
};
// enter button shorcuk key
document.getElementById("search-field").onkeypress = function (e) {
  if (e.keyCode === 13) {
    document.getElementById("button-field").click();
  }
};
//error
const errorDiv = document.getElementById('error');

//add book function
const searchBook = () => {
  const searchField = document.getElementById("search-field");
  spinner("block");
  const searchText = searchField.value;
  /*   if(searchText === ''){
      alert('no')
    } */
 
  searchField.value =''
  //load spinner
  //load api data
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => bookResult(data.docs));
};

const bookResult = (books) => {
  //console.log(singleBook)
  const booksWrapper = document.getElementById("searchresult");
  //clea search book result
  booksWrapper.textContent = ''
  books?.forEach((book) => {
    //console.log(book);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card">
        <div class="card-body">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"/>
            <h4 class="card-title">Book Name: ${book.title}</h4>
            <h6 class="card-title">Author Name: ${book.author_name}</h6>
            <p class="card-text">First Publish year: 
                ${book.first_publish_year}
            </p> 
            <p class="card-text">Publisher: 
                ${book.publisher}
            </p>
        </div>
    </div>`;
    booksWrapper.appendChild(div)
    spinner('none')
  });
};
/* const imagesrc = bookimage =>{
    const url = `https://covers.openlibrary.org/b/id/${bookimage}.jpg`
    fetch(url)
    .then(res => res.json())
    .then(data => bookResult(data.docs))
} */
