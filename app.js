const insideApp = {};

const lcboURL = 'http://lcboapi.com/products';
insideApp.lcboKey = 'MDo4NzIyYzRkYS03MDI1LTExZTgtYjRhOC00ZjdlMzc1NjY3ZmM6WWJhYUVhMnkzN0lxSUVER2ozSnYwd0RCMXZEQ3NQaGl2MEFT';

insideApp.getDrinks = () => {
    $.ajax({
        url: lcboURL,
        method: 'GET',
        dataType: 'jsonp',
        data: {
            apikey: insideApp.lcboKey
        }
    }).then(function(res) {
        console.log(res);
    })
}

const moviesURL = 'https://api.themoviedb.org/3/';
insideApp.moviesKey = '0f074982f0e6a999d59865dff2184e86';

const baseMovieImageURL = 'https://image.tmdb.org/t/p/';
let configData = null;
let movieToSearch = prompt();

insideApp.getMovies = () => {
    let url = "".concat(moviesURL, 'configuration?api_key=', insideApp.moviesKey); 
    fetch(url)
    .then((result)=>{
        return result.json();
    })
    .then((data)=>{
        configData = data.images;
        console.log('config:', data);
        console.log('config fetched');
        insideApp.searchMovies(movieToSearch);
    })
    .catch(function(err){
        alert(err);
    });
}

insideApp.searchMovies = (keyword) => {
    let url = ''.concat(moviesURL, 'search/movie?api_key=', insideApp.moviesKey, '&query=', keyword);
    fetch(url)
    .then(result=>result.json())
    .then((data)=>{
        //process the returned data
        console.log("movie returned:", data.results[0]);

        const movie = {
            movieTitle: data.results[0].original_title,
            moviePosterURL: baseMovieImageURL+'w185'+ data.results[0].poster_path,
            movieDesc: data.results[0].overview
        };
        // const moviePosterURL = data.results[0].poster_path;
        // const movieTitle = data.results[0].original_title;

        document.getElementById('movies').innerHTML = `
        <h3>${movie.movieTitle}</h3>
        <img src="${movie.moviePosterURL}"/>
        <p>${movie.movieDesc}</p>
        `;
        
    })
}


insideApp.init = () => {
    insideApp.getDrinks();
    insideApp.getMovies();
}


// document ready
$(function() {
    console.log("Ready");

    insideApp.init();

    // Konami code
    // const pressed = [];
    // const secretCode = 'stayin';
    // window.addEventListener('keyup', (e) => {
    //     pressed.push(e.key);
    //     pressed.splice(-secretCode.length - 1, pressed.length - secretCode);
    //     console.log(pressed);
    //     if (pressed.join('').includes(secretCode)) {
    //         console.log('DING DING!');
    //         cornify_add();
    //     }
    // });


});