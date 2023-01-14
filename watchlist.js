
const renderWatchList = document.getElementById("render-list")
let renderMovieString = ""
let tempList = localStorage["tempWatchList"]
let watchListArr = tempList.split(',')

localStorage["tempWatchList"] = removeDuplicates(watchListArr)
tempList = localStorage["tempWatchList"]
watchListArr = tempList.split(',')

function keyLoop() {
    if (watchListArr[0] == false || watchListArr[0] == 'undefined') {
        watchListArr.shift()
    }
    for (let movie of watchListArr) {
        render(movie)
    }
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

async function render(imdbKey) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=f3829174&i=${imdbKey}`)
    const data = await res.json()
    renderMovieString += `
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
                    <button class="add-to-btn" onclick="removeFromList('${imdbKey}')">Remove</button>
                </div>
                <div class="movie-desc">
                    <p>${data.Plot}</p>
                </div>
            </div>
        </div>
    `
    renderWatchList.innerHTML = renderMovieString
}

function removeFromList(imdbID) {
    watchListArr.splice(watchListArr.indexOf(imdbID), 1)
    localStorage["tempWatchList"] = watchListArr
    location.reload()
}

keyLoop()