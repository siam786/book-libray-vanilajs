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

//error hnadle
const errorDiv = document.getElementById("error");

//add book function
const searchBook = () => {
  const searchField = document.getElementById("search-field");
  spinner("block");
  const searchText = searchField.value;
// error handke search when empty
  if (searchText === "") {
    errorDiv.innerText = "Search Field Cannot be empty";
    spinner("none");
  }
  else{
  // reset search field
  searchField.value = "";
  //load api data
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => bookResult(data.docs));
    errorDiv.innerText=''
}
};

// book result function
const bookResult = (books) => {
  //search result
  const searchShow = (document.getElementById("serch-result").innerHTML = `
<h3 class="text-center py-3">Total Result Found <span class="text-danger">${books.length}</span></h3>
`);
  const booksWrapper = document.getElementById("searchresult");
  //clea search book result
  booksWrapper.textContent = "";
  books?.forEach((book) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card">
        <div class="card-body">
            <img class="img-fluid card-img-top" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"/>
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
    // wehn book cover image not found
    if (book.cover_i === book[-1]) {
      div.innerHTML = `
        <div class="card">
            <div class="card-body">
            <img class="img-fluid card-img-top" src="images/no-img.png"/>
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
    }
    booksWrapper.appendChild(div);
    //spiner die
    spinner("none");
  });
};
