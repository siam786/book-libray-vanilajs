//add book function
const searchBook = () =>{
const searchField = document.getElementById('search-field')
const searchText = searchField.value 
//load api data
const url = `http://openlibrary.org/search.json?q=${searchText}`
fetch(url)
.then(response => response.json())
.then(data => console.log(data.docs))
}

searchBook()
