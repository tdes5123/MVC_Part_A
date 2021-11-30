function onInit() {
    console.log('onInit');
    document.getElementById("mvAddButton").addEventListener("click", toAddFormHandler);
    document.getElementById("mvCancelButton").addEventListener("click", cancelFormHandler);
    document.getElementById("mvSubmitButton").addEventListener("click", addNewMovieHandler);

    assembleTable();
}

// Create table
function assembleTable() {
    var movieList = getAllItems();

    movieList.forEach(function (movie, idx) {
        addElementToTable(movie, idx);
    });
}

// Add to table
function addElementToTable(movie, idx) {
    var trAdd = document.createElement("tr"),
        element = document.getElementById("mvTable"),
        tdList = {
            tdTitle: document.createElement("td"),
            tdRating: document.createElement("td"),
            tdPersRating: document.createElement("td"),
            tdBlueRay: document.createElement("td")
        };

    tdList.tdTitle.appendChild(document.createTextNode(movie.title));
    // tdList.tdTitle.classList.add('table-data');
    tdList.tdRating.appendChild(document.createTextNode(movie.rating));
    // tdList.tdRating.classList.add('table-data');
    tdList.tdPersRating.appendChild(document.createTextNode(movie.personal_rating));
    // tdList.tdPersRating.classList.add('table-data');
    tdList.tdBlueRay.appendChild(document.createTextNode(movie.is_blueRay ? 'Yes' : 'No'));
    // tdList.tdBlueRay.classList.add('table-data');

    trAdd.appendChild(tdList.tdTitle);
    trAdd.appendChild(tdList.tdRating);
    trAdd.appendChild(tdList.tdPersRating);
    trAdd.appendChild(tdList.tdBlueRay);
    trAdd.classList.add('table-data')

    trAdd.setAttribute('id', 'movie' + idx);
    element.appendChild(trAdd);
}

// Event Handler Functions
function toAddFormHandler() {
    var formElm = document.getElementById('mvForm'),
        formButton = document.getElementById('mvAddButton');

    formElm.hidden = false;
    formButton.hidden = true;
}

function cancelFormHandler() {
    var formElm = document.getElementById('mvForm'),
        formButton = document.getElementById('mvAddButton');

    formElm.hidden = true;
    formButton.hidden = false;
}

function addNewMovieHandler() {
    try {
        var formElms = {
            title_elm: document.getElementById("mvTitle"),
            rating_elm: document.getElementById("mvRating"),
            year_produced_elm: document.getElementById("mvYear"),
            personal_rating_elm: document.getElementById("mvPRating"),
            genre_elm: document.getElementById("mvGenre"),
            is_blueRay_elm: document.getElementById("mvBlueRay")
        },
            newMovie = {
                title: formElms.title_elm.value,
                rating: formElms.rating_elm.value,
                year_produced: formElms.year_produced_elm.value,
                personal_rating: formElms.personal_rating_elm.value,
                genre: formElms.genre_elm.value,
                is_blueRay: (formElms.is_blueRay_elm.checked ? true : false)
            };

        if (!formVerify(formElms, newMovie))
            throw ("Error in form input");

        console.log("newMovie", newMovie);

        movieList.push(newMovie);
        
        addElementToTable(newMovie, movieList.length);
        document.getElementById('mvForm').hidden = true;
        document.getElementById('mvAddButton').hidden = false;

        formElms.title_elm.value = '';
        formElms.rating_elm.value = 'G';
        formElms.year_produced_elm.value = ''; 
        formElms.personal_rating_elm.value = '';
        formElms.genre_elm.checked = true;
        
    } catch (err) {
        console.log(err);
    }
}

// Form Validation
function formVerify(form, movie) {
    var titleErr = document.getElementById("titleErr"),
        yearErr = document.getElementById("yearErr"),
        pRatingErr = document.getElementById("pRatingErr"),
        genreErr = document.getElementById("genreErr"),
        formVerified = true;

    console.log('movie', movie);

    titleErr.hidden = true;
    yearErr.hidden = true;
    pRatingErr.hidden = true;
    genreErr.hidden = true;

    // Title
    if (movie.title.length <= 0) {
        formVerified = false;
        titleErr.hidden = false;
    } else {
        movieList.forEach(function (item) {
            if (movie.title === item.title) {
                formVerified = false;
                titleErr.hidden = false;
            }
        });
    }

    // Year Produced
    if (movie.year_produced.length <= 0) {
        formVerified = false;
        yearErr.hidden = false;
    }

    // Personal Rating 
    if (movie.personal_rating.length < 0 || movie.personal_rating.length > 5) {
        formVerified = false;
        pRatingErr.hidden = false;
    }

    // Genre
    if (movie.genre <= 0) {
        formVerified = false;
        genreErr.hidden = false;
    }

    return formVerified;
}