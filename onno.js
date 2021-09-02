// function for spinner showinng 
const toggleSpinner = display => {
    document.getElementById('spinner').style.display = display;
}
// function for result showinng 
const toggleSearchResult = display => {
    document.getElementById('search').style.display = display;

}

// for searching result 
const searchBook = () => {

    const searchField = document.getElementById('search-area');
    const searchFieldText = searchField.value;
    searchField.value = ''

    // calling function 
    toggleSpinner('block');
    toggleSearchResult('none')

    // for empty search 
    const emptySearch = document.getElementById('empty-search');
    emptySearch.textContent = ''

    if (searchFieldText === '') {
        toggleSpinner('none');
        const div = document.createElement('div');
        div.classList.add('mx-auto')
        div.innerHTML = `
        <h1 class='text-center text-warning'>Please write something to show result !!!</h1>
        `
        emptySearch.appendChild(div);



    }
    else {
        const url = ` https://openlibrary.org/search.json?q=${searchFieldText}`
        fetch(url)
            .then(res => res.json())
            // .then(data =>console.log(data))
            .then(data => displaySearchResult(data))
    }



}

// for display result 
const displaySearchResult = data => {
    const books = data.docs;
    console.log(books);

    console.log(books.length)

    // for search number 
    const searchResultNumber = document.getElementById('search-results');
    searchResultNumber.textContent = ''
    const searchDiv = document.createElement('div');

    searchResultNumber.appendChild(searchDiv);


    const displyResult = document.getElementById('display-result');
    displyResult.textContent = '';


    if (books.length === 0) {
        searchDiv.innerHTML = `
        <h1 class='text-center text-danger'>Search Result : Not Found</h1> 
        `
    }
    else {
        searchDiv.innerHTML = `
        <h1 class='text-center'>Search Result : ${data.numFound}</h1>
        `
    }

    //    for each 
    books.forEach(book => {
        //    console.log(book.publisher)
        //   url for book cover page 
        const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div id="card" class="card h-100">
                        <img height=300px' src="${url ? url : 'not available'}" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h2 class="card-title mb-4 text-dark fw-bold">${book.title}</h2>
                            <h4 class="text-primary">Auther: ${book.author_name ? book.author_name : 'Not Available.'}</h4>
                            <h5 class="text-muted">Publisher: ${book.publisher ? book.publisher : 'Not Availabe.'}</h5>
                      
                      
                          </div>
                          <div class='mx-2'>
                       
                             <small class="text-secondary">First Published : ${book.first_publish_year ? book.first_publish_year : 'Not Availabe.'}
                             </small>
                         </div>
                </div>

        `

        displyResult.appendChild(div)
    });
    //   calling function 
    toggleSearchResult('block');
    toggleSpinner('none');
}
