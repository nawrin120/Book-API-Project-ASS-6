const searchBooksInfo = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    // console.log(searchText)

    const url = `
    http://openlibrary.org/search.json?q=${searchText}`;
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => searchResultDisplay(data));
}
const searchResultDisplay = data => {
    const books = data.docs;
    // console.log(books);
    // console.log(books.length);

    const searchResult = document.getElementById('search-result');
    // searchResult.textContent = '';

    books.forEach(book => {
        console.log(book.tittle)

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
            <h2 class="card-title mb-4 fw-bold text-success">${book.title}</h2>
            <h4 class="text-dark">Auther Name: ${book.author_name}</h4>
            <h5 class="text-muted">Publisher: ${book.publisher}</h5>
        </div>
    </div>
        `
        searchResult.appendChild(div)
    });

}

