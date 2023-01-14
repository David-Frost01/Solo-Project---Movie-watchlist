
const searchInput = document.getElementById("search-input") 
const submitSearchBtn = document.getElementById("submit-search") 
const renderCardsEl = document.getElementById("render-cards") 
const prevPgBtn = document.getElementById("prev-page")
const nextPgBtn = document.getElementById("next-page")
const dspCurrentPg = document.getElementById("current-page")
const pgCtrlEl = document.getElementById("pg-ctrl")
let renderString = "" 
let searchedMovie = "" 
let pageNum = 1

submitSearchBtn.addEventListener('click', () => {
    searchedMovie = searchInput.value
    searchInput.value = ""
    renderString = ""
    pageNum = 1       
    findSearchedMovie(searchedMovie, pageNum)
})

prevPgBtn.addEventListener('click', () => {
    if (pageNum > 1) {
        pageNum --
        renderString = ""
        dspCurrentPg.textContent = pageNum
        findSearchedMovie(searchedMovie, pageNum)
    }
})

nextPgBtn.addEventListener('click', () => {
    if (pageNum < 50 ) {
        pageNum ++
        renderString = ""
        dspCurrentPg.textContent = pageNum
        findSearchedMovie(searchedMovie, pageNum)
    }
})

async function findSearchedMovie(search, pageNum) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=f3829174&s=${search}&page=${pageNum}`)
    const data = await res.json()
    for (let movie of data.Search) {
        pgCtrlEl.style.display = "flex" 
        render(movie.imdbID)
    }
}

async function render(imdbKey) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=f3829174&i=${imdbKey}`)
    const data = await res.json()
    renderString += `
        <div class="movie-card">
            <img class="movie-poster" src="${data.Poster}">
            <div class="movie-text">
                <div class="movie-title">
                    <h3>${data.Title}</h3>
                    <p>${data.imdbRating}</p>
                </div>
                <div class="movie-genre">
                    <p>${data.Runtime}</p>
                    <p>${data.Genre}</p>
                    <button class="add-to-btn" onclick ="addToList('${imdbKey}')">Add to</button>
                </div>
                <div class="movie-desc">
                    <p>${data.Plot}</p>
                </div>
            </div>
        </div>
    `
    renderCardsEl.innerHTML = renderString
}

function addToList(imdbKey) {
    localStorage["tempWatchList"] += `,${imdbKey}`
}
