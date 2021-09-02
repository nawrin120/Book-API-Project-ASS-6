const toggleResult = (id, display) => {
    document.getElementById(id).style.display = display;
}
const searchBooksInfo = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    toggleResult('spinnner', 'block')
    toggleResult('result', 'none')
    const url = `
    https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => searchResultDisplay(data));
}
const searchResultDisplay = data => {
    const books = data.docs;

    const searchResult = document.getElementById('search-display-result');
    searchResult.textContent = '';

    // counting search number 
    const searchCountNumber = document.getElementById('result-count');
    searchCountNumber.textContent = '';
    const numberCountDiv = document.createElement('div');
    searchCountNumber.appendChild(numberCountDiv);

    if (books.length === 0) {
        numberCountDiv.innerHTML = `
        <h2 class=' text-warning text-center'>Warning!!! Please Enter Valid Input</h2> 
        `
    }
    else {
        numberCountDiv.innerHTML = `
        <h2 class='text-center'>Searching Result is : ${data.numFound}</h2>
        `
    }

    books.forEach(book => {
        //  display searching document
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img height="350px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top">
        <div class="card-body">
            <h3 class="card-title mb-4 fw-bold text-success">${book.title ? book.title : 'Not Found'}</h3>
            <h5 class="text-dark mb-4">Auther Name : ${book.author_name ? book.author_name : 'Not Found'}</h5>
            <h5 class="text-dark">Publisher : ${book.publisher ? book.publisher : 'Not Found'}</h5>
        </div>
        <div class='mx-2'>   
        <h6 class="text-secondary text-center">First Published : ${book.first_publish_year ? book.first_publish_year : 'Not Found'}
        </h6>
    </div>
    </div>
        `
        searchResult.appendChild(div)
    });
    toggleResult('spinnner', 'none')
    toggleResult('result', 'block')
}

